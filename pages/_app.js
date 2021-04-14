import { IsLoggedInProvider } from '../utils/userContext';
import '../styles/globals.scss'
import User from '../utils/firebase'

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
