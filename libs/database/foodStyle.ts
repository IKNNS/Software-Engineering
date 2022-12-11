import { IAvoid } from "@models/Avoid_Model";
import { getFirestore, doc, setDoc, getDoc, getDocs, collection, updateDoc, addDoc, deleteDoc } from "firebase/firestore"

const db = getFirestore();

let FoodStyle: IAvoid[] = [];

const getAllStyle = async (): Promise<IAvoid[]> => {
    if (FoodStyle.length > 0) return FoodStyle;
    console.log("loading Disease")
    const data = await getDocs(collection(db, "foodType")).catch((e) => { throw e })
    const temp = data.docs.map(v => v.data()) as IAvoid[];
    FoodStyle = temp.sort((a, b) => a.name.localeCompare(b.name))
    return FoodStyle
}

export { getAllStyle }