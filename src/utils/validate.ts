import { z } from 'zod'

// Validates input for the /identify endpoint
export const identityRequestSchema = z.object({
  email: z.string().email().nullable().optional(),
  phoneNumber: z.string().nullable().optional()
}).refine(data => data.email || data.phoneNumber, {
  message: 'At least one of email or phoneNumber is required'
})

