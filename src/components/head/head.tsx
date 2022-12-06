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

      {/* <!-- Meta tags --> */}
      <meta charSet='utf-8' />
      <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      <meta http-equiv='X-UA-Compatible' content='IE=edge' />
      <meta name='description' content="Hey! I'm a frontend developer & mobile designer with +8 years of experience. Check out my website to read about my skillset and my experience." />
      <meta name='keywords' content='frontend, developer, ui designer' />
      <meta name='author' content='Fabricio Viazzi' />

      {/* <!-- Search Engine --> */}
      <meta name='image' content='https://fabsdev.com/img/meta/profile.jpg' />

      {/* <!-- Schema.org for Google --> */}
      <meta itemProp='name' content='Fabricio | Frontend Developer - UI Designer' />
      <meta itemProp='description' content="Hey! I'm a frontend & mobile developer with +8 years of experience. Check out my website to read about my skillset and my experience." />
      <meta itemProp='image' content='https://fabsdev.com/img/meta/profile.jpg' />

      {/* <!-- Twitter --> */}
      <meta name='twitter:card' content='summary' />
      <meta name='twitter:title' content='Fabricio | Frontend Developer - UI Designer' />
      <meta name='twitter:description' content="Hey! I'm a frontend & mobile developer with +8 years of experience. Check out my website to read about my skillset and my experience." />
      <meta name='twitter:site' content='@FabricioViazzi' />
      <meta name='twitter:creator' content='@FabricioViazzi' />
      <meta name='twitter:image:src' content='https://fabsdev.com/img/meta/tw.jpg' />

      {/* <!-- Favicon --> */}
      <link rel='apple-touch-icon' sizes='57x57' href='img/apple-icon-57x57.png' />
      <link rel='apple-touch-icon' sizes='60x60' href='img/apple-icon-60x60.png' />
      <link rel='apple-touch-icon' sizes='72x72' href='img/apple-icon-72x72.png' />
      <link rel='apple-touch-icon' sizes='76x76' href='img/apple-icon-76x76.png' />
      <link rel='apple-touch-icon' sizes='114x114' href='img/apple-icon-114x114.png' />
      <link rel='apple-touch-icon' sizes='120x120' href='img/apple-icon-120x120.png' />
      <link rel='apple-touch-icon' sizes='144x144' href='img/apple-icon-144x144.png' />
      <link rel='apple-touch-icon' sizes='152x152' href='img/apple-icon-152x152.png' />
      <link rel='apple-touch-icon' sizes='180x180' href='img/apple-icon-180x180.png' />
      <link rel='icon' type='image/png' sizes='192x192'  href='img/android-icon-192x192.png' />
      <link rel='icon' type='image/png' sizes='32x32' href='img/favicon-32x32.png' />
      <link rel='icon' type='image/png' sizes='96x96' href='img/favicon-96x96.png' />
      <link rel='icon' type='image/png' sizes='16x16' href='img/favicon-16x16.png' />
      <link rel='manifest' href='manifest.json' />
      <meta name='msapplication-TileColor' content='#ffffff' />
      <meta name='msapplication-TileImage' content='/ms-icon-144x144.png' />
      <meta name='theme-color' content='#ffffff' />

      <link rel='icon' href='/favicon.ico' />

    </Head>
  )
}

