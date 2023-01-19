import { createContext, useState } from "react";

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

  return (
    <SearchContext.Provider
      value={{
        search,
        handleInputChange,
        bookmark,
        addToBookMarkList,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export default SearchContext;
