import firebase from 'firebase/app';
import 'firebase/auth'
import Router from 'next/router';
import { useEffect } from 'react';

const firebaseConfig = {
    apiKey: "AIzaSyB0TQlWrXJGEobpYSKHDGBssqex-4alWA8",
    authDomain: "next-cookbook.firebaseapp.com",
    projectId: "next-cookbook",
    storageBucket: "next-cookbook.appspot.com",
    messagingSenderId: "948437194880",
    appId: "1:948437194880:web:388a8e568a36a557b26e65",
    measurementId: "G-3WH50B31T1"
}

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const auth = firebase.auth();

export { auth };

export default function User({ children }) {
    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (!user) {
                Router.push('/')
            } 
            if (user && window.location.pathname === '/') {
                Router.push('/cookbook')
            }
        })
    }, [])
    return (
        <>
            {children}
        </>
    )
}
