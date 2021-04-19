import React, { useEffect, useState } from 'react';
import { auth } from './firebase';

const UserContext = React.createContext({ user: '' });

function IsLoggedInProvider(props) {
    const [user, setUser] = useState('');

    useEffect(() => {
        auth.onAuthStateChanged((userAuth) => {
            setUser(userAuth);
        })
    });

    return (
        <UserContext.Provider value={user}>
            {props.children}
        </UserContext.Provider>
    )
}

export { UserContext, IsLoggedInProvider }