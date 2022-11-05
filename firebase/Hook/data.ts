import { getFirestore, collection, query, where, getDocs, doc,addDoc } from 'firebase/firestore'

const db = getFirestore();

const GetUserAccount = async (uid: string) => {
    try {
        const userAccount = collection(db, "userAccount");
        const q = query(userAccount, where("uid", "==", uid));
        const data = await getDocs(q);
        return data;
    } catch (e) {
        throw e;
    }
}

const CreateUserAccount = async (email: string, firstName: string, lastName: string, uid: string) => {
    try {
        const userAccount = collection(db, "userAccount");
        await addDoc(userAccount, { email, firstName, lastName, uid })
    } catch (e) {
        throw e;
    }
}

export { GetUserAccount,CreateUserAccount }