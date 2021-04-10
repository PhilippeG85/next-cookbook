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
                const user = user.email
                return Router.push('/cookbook')
            })
            .catch(err => {
                console.log(err)
            })
    }
    return (
        <div className={styles.logIn}>
            <h3>Se Connecter</h3>
            <form onSubmit={handleSubmit} className={styles.logForm}>
                <input type='text' placeholder='Email' name='email' value={email} onChange={handleChange} />
                <input type='password' placeholder='Password' value={password} onChange={handleChange} />
                <input type='submit' value='Connexion' />
            </form>
            <button onClick={() => handle()}>S&apos;inscrire</button>
        </div>
    )
}