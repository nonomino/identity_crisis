import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

/* "contacts" object defines the schema for the Contact table in the SQLite database. */
export const contacts = sqliteTable('contacts', {
  id: integer('id').primaryKey({ autoIncrement: true }), // auto-incrementing primary key
  phoneNumber: text('phoneNumber'), // phone number in E.164 format
  email: text('email'), // email address
  linkedId: integer('linkedId'), // ID of the linked contact, if any
  linkPrecedence: text('linkPrecedence'), // either "primary" or "secondary"
  createdAt: text('createdAt'),
  updatedAt: text('updatedAt'),
  deletedAt: text('deletedAt')
})

