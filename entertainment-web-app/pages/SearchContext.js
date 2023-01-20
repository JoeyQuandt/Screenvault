import { createContext, useState, useEffect } from "react";

const SearchContext = createContext();

export function SearchProvider({ children }) {
  const [search, setSearch] = useState("");
  const [bookmark, setBookmark] = useState([]);

  function handleInputChange(newState) {
    setSearch(newState);
  }

  function addToBookMarkList(id, type) {
    setBookmark((prevBookmark) =>
      bookmark.some((x) => x.id === id && x.type === type)
        ? [...prevBookmark]
        : [...prevBookmark, { id, type }]
    );
  }

  console.log(bookmark);

  function removeBookmark(id) {
    const index = bookmark.findIndex((x) => x.id === id);
    setBookmark((prevBookmark) =>
      prevBookmark.filter((data) => data != prevBookmark[index])
    );
  }

  return (
    <SearchContext.Provider
      value={{
        search,
        handleInputChange,
        bookmark,
        addToBookMarkList,
        removeBookmark,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export default SearchContext;
