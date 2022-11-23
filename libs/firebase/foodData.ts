import { FoodInfo } from '@models/Food_Module';
import { UserAccount, UserInfo } from '@models/User_Model';
import { getFirestore, doc, setDoc, getDoc, getDocs, collection } from 'firebase/firestore'

const db = getFirestore();

const GetAllFood = async (): Promise<FoodInfo[]> => {
    try {
        const data = await getDocs(collection(db, "food"));
        return data.docs.map(v => v.data()) as FoodInfo[]
    } catch (e) {
        throw e;
    }
}

export { GetAllFood }