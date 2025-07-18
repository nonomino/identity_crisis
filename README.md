## Bitespeed meets Hono 🔥

This is an implementation of [Bitespeed's backend task](https://bitespeed.notion.site/Bitespeed-Backend-Task-Identity-Reconciliation-1fb21bb2a930802eb896d4409460375c) but in [Hono](https://hono.dev), because I wanted to try out Hono for so long and now I have a good reason!

### Stack (Proposed, subject to change)

- [Hono](https://hono.dev) // framework
- [Drizzle ORM](https://orm.drizzle.team/) // for the sql
- [Zod](https://zod.dev/) // schema validation
- [better-sqlite3](https://github.com/WiseLibs/better-sqlite3)


### What do we know

- Doc Brown wants parts for his DeLorean, goes to FluxKart, but is sneaky about it.
- Doc's using multiple emails/phones to stay a mystery.
- Attribute all his emails/phones to him (make him primary always)

#### Understanding

1. Primary: has `null` for linkId, is the canonical contact and linkPrecedence == "primary"
2. Secondary: is the connected contact ("secondary"),
3. Can use Union-find.

### What we gotta do (Objective)

Build POST `/identify` that takes email/phone combos and returns a unified view: primary contact ID, all known emails/phones, and list of secondary contact IDs

### How we gonna do it

TODO