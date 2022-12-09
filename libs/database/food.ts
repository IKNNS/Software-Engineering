import { Food, FoodHistory } from '@models/Food_Module';
import { UserAccount, UserInfo } from '@models/User_Model';
import { getFirestore, doc, setDoc, getDoc, getDocs, collection, updateDoc, addDoc } from 'firebase/firestore'

const db = getFirestore();

let FoodList: Food[] = [];
let HistoryList: FoodHistory[] = [];

let historyUpdate = false;

const getAll = async (): Promise<Food[]> => {
    if (FoodList.length > 0) return FoodList;
    console.log("loading food")
    const data = await getDocs(collection(db, "food")).catch((e) => { throw e })
    FoodList = data.docs.map(v => v.data()) as Food[];
    return FoodList
}

const getHistory = async (uid: string) => {
    if (HistoryList.length > 0 && !historyUpdate) return HistoryList;
    console.log("loading history")
    const data = await getDocs(collection(db, "userAccount", uid, "history")).catch((e) => { throw e })

    HistoryList = data.docs.map(v => {
        const history = v.data() as FoodHistory;
        return { ...history, _id: v.id };
    });

    historyUpdate = false;
    return HistoryList
}

const addHistory = async (uid: string, food: FoodHistory) => {
    historyUpdate = true;
    let data = food;
    if (data._id) delete data._id;
    await addDoc(collection(getFirestore(), "userAccount", uid, "history"), food).catch((e) => { throw e })
}

export { getAll, addHistory, getHistory }