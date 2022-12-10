import { UserAccount, UserFood, UserInfo } from '@models/User_Model';
import { getFirestore, doc, setDoc, getDoc, updateDoc } from 'firebase/firestore'

let _uid = "";
let UserData: UserAccount | undefined = undefined

const get = async (uid: string, force?: boolean) => {
    if (uid == _uid && UserData && UserData.info && !force) return UserData;
    const data = await getDoc(doc(getFirestore(), "userAccount", uid)).catch((e) => {
        throw e;
    })
    console.log("load");
    UserData = data.data() as UserAccount;
    _uid = uid;
    return UserData;
}

const create = async (data: UserAccount) => {
    await setDoc(doc(getFirestore(), "userAccount", data.uid), data).catch((e) => { throw e })
}

const updateInfo = async (uid: string, data: UserInfo) => {
    await updateDoc(doc(getFirestore(), "userAccount", uid), {
        "info": data
    }).catch((e) => { throw e })
}

const updateFood = async (uid: string, data: UserFood) => {
    await updateDoc(doc(getFirestore(), "userAccount", uid), {
        "food": data
    }).catch((e) => { throw e })
}

const updateAll = async (uid: string, food: UserFood, info: UserInfo, like: string[]) => {
    await updateDoc(doc(getFirestore(), "userAccount", uid), {
        "food": food,
        "info": info,
        "like": like,
    }).catch((e) => { throw e })
}

const updateLike = async (uid: string, data: UserFood) => {
    await updateDoc(doc(getFirestore(), "userAccount", uid), {
        "food": data
    }).catch((e) => { throw e })
}

const Account = { get, create, updateFood, updateInfo, updateAll };
export default Account