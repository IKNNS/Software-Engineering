import { IDisease } from "@models/Disease_Model";
import { getFirestore, doc, setDoc, getDoc, getDocs, collection, updateDoc, addDoc, deleteDoc } from "firebase/firestore"

const db = getFirestore();

let Disease: IDisease[] = [];

const getAllDisease = async (): Promise<IDisease[]> => {
    if (Disease.length > 0) return Disease;
    console.log("loading Disease")
    const data = await getDocs(collection(db, "disease")).catch((e) => { throw e })
    const temp = data.docs.map(v => v.data()) as IDisease[];
    Disease = temp.sort((a, b) => a.name.localeCompare(b.name))
    return Disease
}

export { getAllDisease }