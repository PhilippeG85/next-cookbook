import { useState } from 'react'
import { auth } from '../utils/firebase'
import Router from 'next/router'
import styles from '../styles/LogIn.module.scss'

export default function LogIn({ handle }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleChange = (e) => {
        if (e.target.name === 'email') {
            setEmail(e.target.value)
        } else {
            setPassword(e.target.value)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        auth.signInWithEmailAndPassword(email, password)
            .then(res => {
                return Router.push('/cookbook')
            })
            .catch(err => {
                console.log(err)
            })
    }
    return (
        <div className={styles.logIn}>
            <h3>Se connecter</h3>
            <form onSubmit={handleSubmit} className={styles.logForm}>
                <input type='text' placeholder='Email' name='email' value={email} onChange={handleChange} />
                <input type='password' placeholder='Mot de passe' value={password} onChange={handleChange} />
                <input className={styles.connectBtn} type='submit' value='Connexion' />
            </form>
            <div className={styles.subBtn}>
                <hr className={styles.hr} />
                <span>Pas encore inscrit?</span>
                <button onClick={() => handle()}>S&apos;inscrire</button>
            </div>
        </div>
    )
}