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

  const Genres = [
    {
      name: "Action",
      id: 28,
    },
    {
      name: "Adventure",
      id: 12,
    },
    {
      name: "Animaton",
      id: 16,
    },
    {
      name: "Comedy",
      id: 35,
    },
    {
      name: "Crime",
      id: 80,
    },
    {
      name: "Documentary",
      id: 99,
    },
    {
      name: "Drama",
      id: 18,
    },
    {
      name: "Family",
      id: 10751,
    },
    {
      name: "Fantasy",
      id: 14,
    },
    {
      name: "History",
      id: 36,
    },
    {
      name: "Horror",
      id: 27,
    },
    {
      name: "Music",
      id: 10402,
    },
    {
      name: "Mystery",
      id: 9648,
    },
    {
      name: "Romance",
      id: 10749,
    },
    {
      name: "Science Fiction",
      id: 878,
    },
    {
      name: "TV Movie",
      id: 10770,
    },
    {
      name: "Thriller",
      id: 53,
    },
    {
      name: "War",
      id: 10752,
    },
    {
      name: "Western",
      id: 37,
    },
  ];

  return (
    <SearchContext.Provider
      value={{
        search,
        handleInputChange,
        bookmark,
        refreshData,
        Genres,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export default SearchContext;
