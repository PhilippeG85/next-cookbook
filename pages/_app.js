import { IsLoggedInProvider } from '../utils/userContext';
import '../styles/globals.scss'
import User from '../utils/firebase'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  
  return (
    <User>
      <IsLoggedInProvider>
        <Head>
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
