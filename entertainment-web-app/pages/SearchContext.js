import { createContext, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase/firebaseApp";
import useAuth from "../hooks/useAuth";

const SearchContext = createContext();

export function SearchProvider({ children }) {
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [bookmark, setBookmark] = useState([]);

  function handleInputChange(newState) {
    setSearch(newState);
  }

  const refreshData = () => {
    if (user) {
      const q = query(
        collection(db, "bookmarks"),
        where("user", "==", user.uid)
      );
      onSnapshot(q, (querySnapshot) => {
        let ar = [];
        querySnapshot.docs.forEach((doc) => {
          ar.push({ id: doc.id, ...doc.data() });
        });
        setBookmark(ar);
      });
    }
  };

  return (
    <SearchContext.Provider
      value={{
        search,
        handleInputChange,
        bookmark,
        refreshData,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export default SearchContext;
