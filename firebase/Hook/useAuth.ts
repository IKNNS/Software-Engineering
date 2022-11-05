import { Auth, onAuthStateChanged, User } from 'firebase/auth'
import { useEffect, useMemo, useState } from 'react';

interface Props {
    auth: Auth
}

const useAuth = (auth: Auth) => {

    const [user, setUser] = useState<User | null>();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error>();

    useEffect(() => {

        setLoading(true);

        const listener = onAuthStateChanged(auth, async (user) => {
            setUser(user);
            setLoading(false)
        }, async (err: Error) => {
            setError(err)
            setLoading(false)
        });

        return (() => {
            listener();
        });

    }, [auth])

    return useMemo(() => [user, loading, error, auth], [user, loading, error, auth]);

}

export default useAuth;