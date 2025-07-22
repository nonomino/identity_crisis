import { contacts } from '../../db/schema'
import { eq, or, inArray } from 'drizzle-orm'

// Fetches all contacts that are directly or indirectly related
export async function findAllRelatedContacts(
  db: any,  // optional: type it properly
  email?: string | null,
  phone?: string | null
) {
  const directMatches = await db.select().from(contacts).where(
    or(
      email ? eq(contacts.email, email) : undefined,
      phone ? eq(contacts.phoneNumber, phone) : undefined
    ).filter(Boolean) as any
  )

  const ids = new Set<number>()
  for (const contact of directMatches) {
    ids.add(contact.id)
    if (contact.linkedId) ids.add(contact.linkedId)
  }

  return ids.size > 0
    ? await db.select().from(contacts).where(
        or(
          inArray(contacts.id, [...ids]),
          inArray(contacts.linkedId, [...ids])
        )
      )
    : []
}
