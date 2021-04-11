import User from '../utils/firebase'
import '../styles/globals.scss'

function MyApp({ Component, pageProps }) {
  return (
    <User>
      <Component {...pageProps} />
    </User>
  )
}

export default MyApp
