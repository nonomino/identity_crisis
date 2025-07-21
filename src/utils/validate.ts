import { z } from 'zod'

export const identifySchema = z.object({
  email: z.string().email().optional().nullable(),
  phoneNumber: z.string().optional().nullable()
})

