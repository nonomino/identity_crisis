import { contacts } from '../../db/schema'

// represents a contact row from the DB
export type ContactRecord = typeof contacts.$inferSelect

// Response format for the `/identify` route
export interface IdentityResponse {
  contact: {
    primaryContactId: number
    emails: string[]
    phoneNumbers: string[]
    secondaryContactIds: number[]
  }
}

