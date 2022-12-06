// External modules
import React from 'react'
import Head from 'next/head'

// Props type
type Props = {
  title?: string
}

export default function CustomHead({ title }: Props) {

  // Constants
  const siteTitle = React.useMemo(() => `Fabricio | Frontend & Mobile Developer | ${title ? ' - ' + title : ''}`, [title])

  return (
    <Head>

      <title>{siteTitle}</title>

      <meta name="viewport" content="initial-scale=1, width=device-width" />

      <meta name='description' content='A dashboard' />

      <link rel='icon' href='/favicon.ico' />

    </Head>
  )
}

