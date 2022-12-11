import { UserAccount, UserFood, UserInfo } from '@models/User_Model';
import { getFirestore, doc, setDoc, getDoc, updateDoc } from 'firebase/firestore'

let _uid = "";
let UserData: UserAccount | undefined = undefined

let update = false;

const get = async (uid: string) => {
    if (uid == _uid && UserData && UserData.info && !update) return UserData;
    const data = await getDoc(doc(getFirestore(), "userAccount", uid)).catch((e) => {
        throw e;
    })
    console.log("load");
    UserData = data.data() as UserAccount;

    _uid = uid;
    update = false;
    return UserData;
}

const create = async (data: UserAccount) => {
    await setDoc(doc(getFirestore(), "userAccount", data.uid), data).catch((e) => { throw e })
}

const updateInfo = async (uid: string, data: UserInfo) => {
    await updateDoc(doc(getFirestore(), "userAccount", uid), {
        "info": data
    }).catch((e) => { throw e })

    update = true;
}

const updateFood = async (uid: string, data: UserFood) => {
    await updateDoc(doc(getFirestore(), "userAccount", uid), {
        "food": data
    }).catch((e) => { throw e })
    
    update = true;
}

const updateAll = async (uid: string, food: UserFood, info: UserInfo, like: string[]) => {
    await updateDoc(doc(getFirestore(), "userAccount", uid), {
        "food": food,
        "info": info,
        "like": like,
    }).catch((e) => { throw e })

    update = true;
}

const updateLike = async (uid: string, data: string[]) => {
    await updateDoc(doc(getFirestore(), "userAccount", uid), {
        "like": data
    }).catch((e) => { throw e })
    
    update = true;
}

const Account = { get, create, updateFood, updateInfo, updateAll, updateLike };
export default Account