import { createClient } from '@libsql/client'
import { drizzle } from 'drizzle-orm/libsql'
import 'dotenv/config'

const client = createClient({
  url: process.env.DB_URL!,
  authToken: process.env.DB_TOKEN!
})

export const db = drizzle(client)

