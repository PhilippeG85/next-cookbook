import Link from 'next/link'
import styles from '../styles/Menu.module.scss'
import Router from 'next/router'
import { auth } from '../utils/firebase'
import { UserContext } from '../utils/userContext'
import { useContext } from 'react'
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Menu({ children }) {
    const userName = useContext(UserContext)
    const handleClick = (e) => {
        e.preventDefault()
        auth.signOut()
            .then(res => Router.push('/'))
    }

    const handleDropDown = () => {
        const dropdown = document.querySelector('.Menu_navBarDropDown__kxfuk')
        const transform = dropdown.style.transform
        if (transform === 'scale(1)') {
            dropdown.style.transform = "scale(0)"
        } else {
            dropdown.style.transform = "scale(1)"
        }
    }

    return (
        <>
            <div className={styles.menuMobile}>
                <div className={styles.navBarMobile}>
                    <FontAwesomeIcon onClick={handleDropDown} icon={faBars} style={{height: "18px"}} />
                    <h5>{userName && userName.email}</h5>
                    <div className={styles.navBarDropDown}>
                        <hr className={styles.hr} />
                        <div className={styles.dropDownElements}>
                            <Link href='/cookbook/new'>Ajouter une recette</Link>
                        </div>
                        <hr className={styles.hrBorder} />
                        <div className={styles.dropDownElements}>
                            <Link href='/cookbook'>Toutes vos recettes</Link>
                        </div>
                        <hr className={styles.hrBorder} />
                        <div className={styles.dropDownElements}>
                            <a href='/' className={styles.signOut} onClick={handleClick}>Sign out</a>
                        </div>
                        <hr className={styles.hr} />
                    </div>
                </div>
                <div style={{ marginTop: "1rem" }}>
                    {children}
                </div>
            </div>
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
                            <a href='/' className={styles.signOut} onClick={handleClick}>Sign out</a>
                        </div>
                    </div>
                </div>
                <div style={{ width: "75%", marginTop: "2rem" }}>
                    {children}
                </div>
            </div>
        </>
    )
}