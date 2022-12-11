import { Food, FoodHistory } from '@models/Food_Model';
import { UserAccount, UserInfo } from '@models/User_Model';
import { getFirestore, doc, setDoc, getDoc, getDocs, collection, updateDoc, addDoc, deleteDoc } from 'firebase/firestore'

const db = getFirestore();

let FoodList: Food[] = [];
let HistoryList: FoodHistory[] = [];

let Types: string[] = [];
let Ingredient: string[] = [];

let historyUpdate = false;

const getAll = async (): Promise<Food[]> => {
    if (FoodList.length > 0) return FoodList;
    console.log("loading food")
    const data = await getDocs(collection(db, "food")).catch((e) => { throw e })
    FoodList = data.docs.map(v => v.data()) as Food[];

    const temp1: string[] = []
    const temp2: string[] = []
    FoodList.forEach(V => {
        temp1.push(...V.foodType);
        temp2.push(...V.foodIngredient);
    })
    Types = [...new Set(temp1.sort())]
    Ingredient = [...new Set(temp2.sort())]
    return FoodList
}

const getTypes = async () => {
    if (Types.length > 0) return Types;
    await getAll()
    return Types;
}

const getIngredient = async () => {
    if (Ingredient.length > 0) return Ingredient;
    await getAll()
    return Ingredient;
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

const updateHisotry = async (uid: string, food: FoodHistory) => {
    historyUpdate = true;
    let data = food;
    const hid = data._id;
    if (data._id) delete data._id;
    await setDoc(doc(getFirestore(), "userAccount", uid, "history", hid!!), food).catch((e) => { throw e })
}

const deleteHisotry = async (uid: string, food: FoodHistory) => {
    historyUpdate = true;
    let data = food;
    const hid = data._id;
    if (data._id) delete data._id;
    await deleteDoc(doc(getFirestore(), "userAccount", uid, "history", hid!!)).catch((e) => { throw e })
}

export { getAll, addHistory, getHistory, updateHisotry, deleteHisotry, getTypes, getIngredient }