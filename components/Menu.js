import Link from 'next/link'
import styles from '../styles/Menu.module.scss'
import Router from 'next/router'
import { auth } from '../utils/firebase'
import { UserContext } from '../utils/userContext'
import { useContext } from 'react'

export default function Menu({ children }) {
    const userName = useContext(UserContext)
    const handleClick = (e) => {
        e.preventDefault()
        auth.signOut()
            .then(res => Router.push('/'))
    }

    return (
        <div className={styles.menu}>
            <div className={styles.leftMenu}>
                <h3>Votre livre de recette</h3>
                <h5>{userName && userName.email}</h5>
                <div className={styles.menuContent}>
                    <div>
                        <Link href='/cookbook/new' className="">Ajouter une recette</Link>
                    </div>
                    <div>
                        <Link href='/cookbook'>Toutes vos recettes</Link>
                    </div>
                    <div>
                        <button href='/' className="" onClick={handleClick}>Sign out</button>
                    </div>
                </div>
            </div>
            <div style={{ width: "75%", marginTop: "2rem" }}>
                {children}
            </div>
        </div>
    )
}