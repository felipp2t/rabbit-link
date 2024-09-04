import { z } from "zod"

export const confirmOTPValidation = z.object({
    otp: z.string().length(6)
})

export type confirmOTPSchema = z.infer<typeof confirmOTPValidation>