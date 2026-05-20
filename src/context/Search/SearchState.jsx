import React, { useState } from "react";
import SearchContext from "./SearchContext";

const SearchState = (props) => {
  const [search, setSearch] = useState("");
  return (
    <SearchContext.Provider value={{ search, setSearch }}>
      {props.children}
    </SearchContext.Provider>
  );
};

export default SearchState;
