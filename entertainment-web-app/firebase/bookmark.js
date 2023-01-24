import { db } from "./firebaseApp";
import { addDoc, doc, deleteDoc, collection } from "firebase/firestore";

const MOVIE_API_KEY = "fa940f6d4f0f73fb45419d96bae71b25";

const addBookmark = async (userId, mediaId, mediaType) => {
  const dbRef = collection(db, "bookmarks");
  let media;
  const res = await fetch(
    `https://api.themoviedb.org/3/${mediaType}/${mediaId}?api_key=${MOVIE_API_KEY}&language=en-US`
  );
  media = await res.json();
  media["user"] = userId;
  media["mediaId"] = media.id;
  delete media.id;
  try {
    await addDoc(dbRef, media);
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
