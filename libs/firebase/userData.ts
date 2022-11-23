import { async } from '@firebase/util';
import { UserAccount, UserFood, UserInfo } from '@models/User_Model';
import { getFirestore, doc, setDoc, getDoc, updateDoc } from 'firebase/firestore'

const db = getFirestore();

const GetUserAccount = async (uid: string) => {
    try {
        const data = await getDoc(doc(db, "userAccount", uid));
        return data;
    } catch (e) {
        throw e;
    }
}

const CreateUserAccount = async (data: UserAccount) => {
    try {
        await setDoc(doc(db, "userAccount", data.uid), data)
    } catch (e) {
        throw e;
    }
}

const UpdateUserInfo = async (uid: string, data: UserInfo) => {
    try {
        await updateDoc(doc(db, "userAccount", uid), {
            "info": data
        })
    } catch (e) {
        throw e;
    }
}

const UpdateUserFood = async (uid: string, data: UserFood) => {
    try {
        await setDoc(doc(db, "userFood", uid), data)
    } catch (e) {
        throw e;
    }
}

export { GetUserAccount, UpdateUserInfo, UpdateUserFood, CreateUserAccount }