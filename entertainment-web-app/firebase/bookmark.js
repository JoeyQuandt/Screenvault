import { db } from "./firebaseApp";
import { addDoc, doc, deleteDoc, collection, setDoc } from "firebase/firestore";

const addBookmark = async (userId, mediaId, mediaType) => {
  const dbRef = collection(db, "bookmarks");
  const data = {
    user: userId,
    mediaId: mediaId,
    mediaType: mediaType,
  };
  try {
    await addDoc(dbRef, data);
  } catch (err) {}
};

const removeBookmark = async (docId) => {
  try {
    const bookmarkRef = doc(db, "bookmarks", docId);
    await deleteDoc(bookmarkRef);
  } catch (err) {
    console.log(err);
  }
};

export { addBookmark, removeBookmark };
