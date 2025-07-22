import { Hono } from 'hono'
import 'dotenv/config'
import { identityRequestSchema } from './utils/validate'
import {
  findAllRelatedContacts,
  normalizeToPrimary
} from './lib/identify'
import { makeDb } from './db/client'

const app = new Hono<{ Bindings: {
  DB_URL: string
  DB_TOKEN: string
} }>()

app.post('/identify', async (c) => {
  const body = await c.req.json()
  const result = identityRequestSchema.safeParse(body)
  if (!result.success) return c.json({ error: result.error.flatten() }, 400)

  const { email, phoneNumber } = result.data
  const db = makeDb({ DB_URL: c.env.DB_URL, DB_TOKEN: c.env.DB_TOKEN })

  const related = await findAllRelatedContacts(db, email, phoneNumber)
  if (related.length === 0) {
    const now = new Date().toISOString()
    const [created] = await db.insert('contacts').values({
      email,
      phoneNumber,
      linkPrecedence: 'primary',
      linkedId: null,
      createdAt: now,
      updatedAt: now
    }).returning()
    return c.json({
      contact: {
        primaryContactId: created.id,
        emails: email ? [email] : [],
        phoneNumbers: phoneNumber ? [phoneNumber] : [],
        secondaryContactIds: []
      }
    }, 201)
  }

  const response = normalizeToPrimary(related)
  return c.json(response)
})

// Export a Worker handler
export default {
  async fetch(req: Request, env: any, ctx: unknown) {
    return app.fetch(req, env, ctx)
  }
}
