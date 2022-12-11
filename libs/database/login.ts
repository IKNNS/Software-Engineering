import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, fetchSignInMethodsForEmail, Auth } from "firebase/auth"

import { UserAccount } from "@models/User_Model"
import Account from "./user"

const checkAccount = async (email: string) => {
    const value = await fetchSignInMethodsForEmail(getAuth(), email).catch(e => { throw e });
    return value;
}

const login = async (email: string, password: string) => {
    const value = await signInWithEmailAndPassword(getAuth(), email, password).catch(e => { throw e });
    return value.user;
}

const loginGoogle = async () => {
    const provider = new GoogleAuthProvider()
    const result = await signInWithPopup(getAuth(), provider);
    const { uid, displayName, email } = result.user
    const data = await Account.get(uid).catch(e => { throw e });
    if (!data) {
        const [firstname, lastname] = displayName?.split(" ") ?? ["", ""];
        await Account.create({ uid, email: email ?? "", firstname, lastname }).catch((e) => { throw e });
    }
    return result.user;
}

const register = async (data: UserAccount, password: string) => {
    const result = await createUserWithEmailAndPassword(getAuth(), data.email, password).catch(e => { throw e })
    const { uid } = result.user
    await Account.create({ uid, email: data.email ?? "", firstname: data.firstname, lastname: data.lastname }).catch((e) => { throw e });
    return result.user
}

export { login, loginGoogle, register, checkAccount }