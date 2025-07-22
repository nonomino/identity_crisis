import type { ContactRecord, IdentityResponse } from './types'

// Returns the oldest contact by ID or createdAt
export function getOldestContact(records: ContactRecord[]): ContactRecord {
  return records.reduce((oldest, current) => {
    const dtCurrent = new Date(current.createdAt).getTime()
    const dtOldest = new Date(oldest.createdAt).getTime()

    // Compare timestamps
    if (dtCurrent < dtOldest) return current
    if (dtCurrent === dtOldest) {
      // Tiebreaker on ID
      return current.id < oldest.id ? current : oldest
    }
    return oldest
  }, records[0])
}

// Produces the final API response object from a group of contact records
export function normalizeToPrimary(contacts: ContactRecord[]): IdentityResponse {
  const primary = getOldestContact(contacts)

  const emails = new Set<string>()
  const phones = new Set<string>()
  const secondaryContactIds: number[] = []

  for (const c of contacts) {
    if (c.email) emails.add(c.email)
    if (c.phoneNumber) phones.add(c.phoneNumber)
    if (c.id !== primary.id) secondaryContactIds.push(c.id)
  }

  return {
    contact: {
      primaryContactId: primary.id,
      emails: [...emails],
      phoneNumbers: [...phones],
      secondaryContactIds
    }
  }
}

