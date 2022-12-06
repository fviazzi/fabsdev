// External modules
import * as z from 'zod'

const ContactSchema = z.object({
  email: z.string().min(1, { message: 'EMAIL_REQUIRED' }).email({ message:'EMAIL_INVALID' }),
  message: z.string().min(1, { message: 'MESSAGE_REQUIRED' }).min(10, { message: 'MESSAGE_INVALID'})
})

export default ContactSchema