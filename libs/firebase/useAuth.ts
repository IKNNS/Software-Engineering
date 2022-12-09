import { Auth, getAuth, onAuthStateChanged, User } from 'firebase/auth'
import { useEffect, useMemo, useState } from 'react';

const useAuth = (): [User | null, boolean, Error | null] => {

    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {

        setError(null)
        setLoading(true);

        const listener = onAuthStateChanged(getAuth(), async (user) => {
            setUser(user)
            setLoading(false)
        }, async (err: Error) => {
            setError(err)
            setLoading(false)
        });

        return (() => {
            listener();
        });

    }, [])

    return useMemo(() => [user, loading, error], [user, loading, error]);

}

export { useAuth };