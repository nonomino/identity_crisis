import Database from 'better-sqlite3'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import { contacts } from './schema'

/* The client file establishes a connection to the SQLite database using better-sqlite3. */
const sqlite = new Database('./conact.db')
export const db = drizzle(sqlite, { schema: { contacts } })
