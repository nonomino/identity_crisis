import { Hono } from 'hono'
import { eq, or, inArray } from 'drizzle-orm'
import { db } from '../db/client'
import { contacts } from '../db/schema'
import { identifySchema } from '../utils/validate'

export const router = new Hono()

router.post('/', async (c) => {
  const body = await c.req.json()
  const parsed = identifySchema.safeParse(body)
  if (!parsed.success) return c.json({ error: parsed.error.flatten() }, 400)

  const { email, phoneNumber } = parsed.data
  if (!email && !phoneNumber)
    return c.json({ error: 'At least one of email or phoneNumber required' }, 400)
    // TODO: Write the actual logic
    return c.json({ contact: response }, 200)
})
