import React, { useState } from 'react';
import Router from 'next/router'
import { auth } from '../utils/firebase'
import styles from '../styles/SignIn.module.scss'

export default function SignIn({ handle }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleChange = (e) => {
        if (e.target.name === 'email') {
            setEmail(e.target.value)
        } else {
            setPassword(e.target.value)
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        auth.createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user)
                return Router.push('/cookbook')
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <div className={styles.signIn}>
            <h3>Inscription</h3>
            <form className={styles.logForm} onSubmit={handleSubmit}>
                <input type='text' placeholder='Email' name='email' value={email} onChange={handleChange} />
                <input type='password' placeholder='Password' value={password} onChange={handleChange} />
                <input className={styles.connectBtn} type='submit' value='Inscription' />
            </form>
            <div style={{textAlign: "center"}} className={styles.logBtn}>
                <hr className={styles.hr} />
                <span>Déja inscrit?</span>
                <button onClick={() => handle()}>Se connecter</button>
            </div>
        </div>
    )
}