import { useState } from 'react'
import styles from '../styles/Home.module.scss'
import LogIn from '../components/LogIn'
import SignIn from '../components/SignIn'

export default function Home() {
  const [displaySign, setDisplaySign] = useState('none');

  const toggle = () => {
    if (displaySign === 'none') {
      setDisplaySign('block')
    } else {
      setDisplaySign('none')
    }
  }

  return (
    <div className={styles.app}>
      <h1>
        Bienvenue sur
        <br />
        votre Cookbook
      </h1>
      <div className={styles.logIn}>
        <LogIn handle={toggle} />
        <div style={{ display: displaySign }} className={styles.signIn}>
          <SignIn handle={toggle} />
        </div>
      </div>
    </div>
  )
}
