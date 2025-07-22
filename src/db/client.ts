import { createClient } from '@libsql/client/web'
import { drizzle } from 'drizzle-orm/libsql'

export function makeDb(env: {
  DB_URL: string
  DB_TOKEN: string
}) {
  const client = createClient({
    url: env.DB_URL,
    authToken: env.DB_TOKEN
  })
  return drizzle(client)
}

