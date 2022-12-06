// External modules
import sendgrid from '@sendgrid/mail'

// Internal modules
import ContactSchema from 'src/schemas/contactSchema'

// Configurations
const { SENDGRID_API_KEY } = process.env
sendgrid.setApiKey(SENDGRID_API_KEY || '')

export default async function handler(req:any, res:any) {

  const bodyParse = ContactSchema.safeParse(req.body)

  // Handle parse
  if (!bodyParse.success) {

    const errors = await bodyParse.error.format()

    return res.status(400).json(errors)

  }

  try {

    // Send email
    const { body: { email, message } } = req

    const response = await sendgrid.send({
      to: "reach@fabsdev.com",
      from: "reach@fabsdev.com",
      subject: `Fabsdev contact from ${email}`,
      html: `<div>${message}</div>`,
    })

    console.log('success!!', response)

  } catch (error:any) {

    console.log('errored', error)

    return res.status(error?.statusCode || 500).json({ error: error?.message })

  }

  return res.status(200).json()

}
