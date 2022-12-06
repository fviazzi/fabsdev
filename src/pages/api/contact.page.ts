// External modules
import axios from 'axios'

// Internal modules
import ContactSchema from 'src/schemas/contactSchema'

export default async function handler(req:any, res:any) {

  const bodyParse = ContactSchema.safeParse(req.body)

  // Handle parse
  if (!bodyParse.success) {

    const errors = await bodyParse.error.format()

    return res.status(400).json(errors)

  }

  try {

    const { body: { email, message } } = req
    const response = await axios.post('https://fabsdev.cc/php/form_submission.php', { email, message })


  } catch (error:any) {

    return res.status(error?.statusCode || 500).json({ error: error?.message })

  }

  return res.status(200).json()

}
