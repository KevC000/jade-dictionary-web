import { User } from "@firebase/auth";
import { initializeApp } from "firebase/app";
import { Firestore, getFirestore, doc, setDoc, addDoc, collection, getDoc, query, getDocs, where } from "firebase/firestore";
import { FirebaseStorage, StorageReference, deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { updateUserProfile } from "./authentication";
import { FirestoreUserData } from "../definitions";

export const addNewUserToDB = async (db: Firestore, user: User) => {
    try {
        await setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
        });
        console.log("Document written with ID: ", user.uid);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

export const updateUserToDB = async (db: Firestore, userData: FirestoreUserData) => {
  try {
    await setDoc(doc(db, "users", userData.uid), userData);
  } catch (e) {
    console.error("Error updating user in DB:", e);
  }
};

export const deleteOldProfilePicture = async (storage: FirebaseStorage, db:Firestore, userUid: string) => {

  const userInDB = await getDoc(doc(db, "users", userUid));
  const userData = userInDB.data();
  const fileName = userData?.photoFileName;
  const storageRef = ref(storage, 'profile_pictures/' + fileName);
  

  deleteObject(storageRef).then(() => {
    // File deleted successfully
  }).catch((error) => {
    // Uh-oh, an error occurred!
  });
 
 }

export const uploadNewProfilePicture = async (storage: FirebaseStorage, file: File): Promise<string> => { 
  const storageRef = ref(storage, 'profile_pictures/' + file.name);
  const snapshot = await uploadBytes(storageRef, file);
  console.log('Uploaded a blob or file!');
  const url = await getDownloadURL(snapshot.ref);
  console.log('Profile picture URL:', url);
  return url;
}

export const checkEmailExists = async (db: Firestore, email: string): Promise<boolean> => {
  const usersRef = collection(db, "users");
  const q = query(usersRef, where("email", "==", email));
  const querySnapshot = await getDocs(q);
  return !querySnapshot.empty; 
};
