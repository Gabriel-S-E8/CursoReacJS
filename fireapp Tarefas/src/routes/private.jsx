import { useState, useEffect } from 'react';
import { auth } from '../firebaseconnection';
import { onAuthStateChanged } from 'firebase/auth';
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ children }) {
    const [loading, setLoading] = useState(true);
    const [signedIn, setSignedIn] = useState(false);

    useEffect(() => {
        const checkLogin = async () => {
            const unsub = onAuthStateChanged(auth, (user) => {
                // se tem user logado
                if (user) {
                    const userData = {
                        uid: user.uid,
                        email: user.email,
                    };

                    localStorage.setItem('@userData', JSON.stringify(userData));
                    setLoading(false);
                    setSignedIn(true);
                } else {
                    // não possui user logado
                    setLoading(false);
                    setSignedIn(false);
                }
            });
        };
        checkLogin();
    }, []);

    if (loading) {
        return (
            <div></div>
        )
    }

    if (!signedIn) {
        return <Navigate to="/" />
    }

    return children;
}
