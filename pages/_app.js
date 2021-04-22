import { IsLoggedInProvider } from '../utils/userContext';
import '../styles/globals.scss'
import User from '../utils/firebase'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  
  return (
    <User>
      <IsLoggedInProvider>
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@200;400&display=swap" rel="stylesheet" />
          <title>The Cookbook</title>
          <meta
            name="description"
            content="Bienvenue sur le Cookbook! Un endroit pour écrire et se remémorer tous les délices culinaires."
          />
          <meta property="og:title" content="The Cookbook" />
          <meta property="og:description" content="Bienvenue sur le Cookbook! Un endroit pour écrire et se remémorer tous les délices culinaires." />
          <meta property="og:site_name" content="Cookbook" />
          <meta name="twitter:site" content="@Cookbook" />
          <meta name="twitter:title" content="The Cookbook" />
          <meta name="twitter:description" content="Bienvenue sur le Cookbook! Un endroit pour écrire et se remémorer tous les délices culinaires." />
          <meta name="twitter:creator" content="@Philippe" />
        </Head>
        <Component {...pageProps} />
      </IsLoggedInProvider>
    </User>
  )
}

export default MyApp
