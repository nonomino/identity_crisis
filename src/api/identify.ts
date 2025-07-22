import { Hono } from 'hono'
import { identityRequestSchema } from '../utils/validate'
import { db } from '../db/client'
import { contacts } from '../db/schema'
import {
  findAllRelatedContacts,
  normalizeToPrimary
} from '../lib/identify'

export const identifyRoute = new Hono()

identifyRoute.post('/', async (c) => {
  const body = await c.req.json()
  const parsed = identityRequestSchema.safeParse(body)

  if (!parsed.success) {
    return c.json({ error: parsed.error.flatten() }, 400)
  }

  const { email, phoneNumber } = parsed.data
  const related = await findAllRelatedContacts(email, phoneNumber)

  if (related.length === 0) {
    // Create a new primary contact if no related contacts found
    const now = new Date().toISOString()
    const [created] = await db
      .insert(contacts)
      .values({
        email,
        phoneNumber,
        linkPrecedence: 'primary',
        linkedId: null,
        createdAt: now,
        updatedAt: now
      })
      .returning()

    const resp = {
      contact: {
        primaryContactId: created.id,
        emails: email ? [email] : [],
        phoneNumbers: phoneNumber ? [phoneNumber] : [],
        secondaryContactIds: []
      }
    }
    return c.json(resp, 201)
  }

  const response = normalizeToPrimary(related)
  return c.json(response)
})
