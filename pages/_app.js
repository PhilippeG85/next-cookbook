import { IsLoggedInProvider } from '../utils/userContext';
import '../styles/globals.scss'
import User from '../utils/firebase'
import { useEffect } from 'react';
import connectToDatabase from '../utils/mongo';

function MyApp({ Component, pageProps }) {

  return (
    <User>
      <IsLoggedInProvider>
        <Component {...pageProps} />
      </IsLoggedInProvider>
    </User>
  )
}

export default MyApp
