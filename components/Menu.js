import Link from 'next/link'
import styles from '../styles/Menu.module.scss'
import Router from 'next/router'
import { auth } from '../utils/firebase'

export default function Menu({ children }) {
    const handleClick = (e) => {
        e.preventDefault()
        auth.signOut()
            .then(res => Router.push('/'))
    }

    return (
        <div className={styles.menu}>
            <div className={styles.leftMenu}>
                <h3>Your<br />Cookbook</h3>
                <div className={styles.menuContent}>
                    <div>
                        <Link href='/cookbook/new' className="">New recipe</Link>
                    </div>
                    <div>
                        <Link href='/cookbook'>All recipes</Link>
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