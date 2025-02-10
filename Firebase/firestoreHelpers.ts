import { addDoc, collection, deleteDoc, doc } from "firebase/firestore"; 
import { database } from "./firebaseSetup";
export interface goalData{
    text: string;
}

export async function writeToDB(data:goalData, collectionName: string) {
    try{
        const docRef = await addDoc(collection(database,collectionName),data);
    }
    catch(e){
        console.error("Error",e);
    }
}


export async function deleteFromDB(id: string, collectionName: string) {
    try {
    await deleteDoc(doc(database, collectionName, id));
    } catch (e) {
    console.error("Error deleting document: ", e);
    }
}