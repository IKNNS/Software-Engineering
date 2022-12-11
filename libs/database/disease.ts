import { IAvoid } from "@models/Avoid_Model";
import { getFirestore, doc, setDoc, getDoc, getDocs, collection, updateDoc, addDoc, deleteDoc } from "firebase/firestore"

const db = getFirestore();

let Disease: IAvoid[] = [];

const getAllDisease = async (): Promise<IAvoid[]> => {
    if (Disease.length > 0) return Disease;
    console.log("loading Disease")
    const data = await getDocs(collection(db, "disease")).catch((e) => { throw e })
    const temp = data.docs.map(v => v.data()) as IAvoid[];
    Disease = temp.sort((a, b) => a.name.localeCompare(b.name))
    console.log(Disease);
    return Disease
}

export { getAllDisease }