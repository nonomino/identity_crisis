import 'dotenv/config'
import type { Config } from 'drizzle-kit'

const config: Config = {
  schema: './src/db/schema.ts',
  out: './drizzle',
  dialect: 'turso',
  dbCredentials: {
    url: process.env.DB_URL!,
    authToken: process.env.DB_TOKEN!
  }
}

export default config

