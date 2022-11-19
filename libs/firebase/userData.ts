import { UserAccount } from '@models/User_Model';
import { getFirestore, collection, query, where, getDocs, doc, addDoc } from 'firebase/firestore'

const db = getFirestore();
const userAccount = collection(db, "userAccount");

const GetUserAccount = async (uid: string) => {
    try {
        const q = query(userAccount, where("uid", "==", uid));
        const data = await getDocs(q);
        return data;
    } catch (e) {
        throw e;
    }
}

const CreateUserAccount = async (data: UserAccount) => {
    try {
        await addDoc(userAccount, data)
    } catch (e) {
        throw e;
    }
}

export { GetUserAccount, CreateUserAccount }