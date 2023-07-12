
import { initializeApp } from "firebase/app";
import { 
    getFirestore,
    collection,
    doc,
    getDocs,
    getDoc,
    query,
    where } from "firebase/firestore/lite"

const firebaseConfig = {
  apiKey: "AIzaSyAf9T1W_NyGSrLMxnAuolFHOZktNsYEmB0",
  authDomain: "vanlife-48a4a.firebaseapp.com",
  projectId: "vanlife-48a4a",
  storageBucket: "vanlife-48a4a.appspot.com",
  messagingSenderId: "16389281102",
  appId: "1:16389281102:web:7ef4ff75d04caa2640fa1f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

const vansCollectionRef = collection(db, "vans")

export async function getVans() {
    const snapshot = await getDocs(vansCollectionRef)
    const vans = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    return vans
}

export async function getVan(id) {
    const docRef = doc(db, "vans", id)
    const snapshot = await getDoc(docRef)
    return {
        ...snapshot.data(),
        id: snapshot.id
    }
}

export async function getHostVans() {
    const q = query(vansCollectionRef, where("hostId", "==", "123"))
    const snapshot = await getDocs(q)
    const vans = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    return vans
}

export async function loginUser(creds) {
    const res = await fetch("/api/login",
        { method: "post", body: JSON.stringify(creds) }
    )
    const data = await res.json()

    if (!res.ok) {
        throw {
            message: data.message,
            statusText: res.statusText,
            status: res.status
        }
    }

    return data
}