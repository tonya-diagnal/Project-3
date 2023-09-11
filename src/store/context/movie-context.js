import { createContext } from "react";

const MovieContext = createContext({
    searchTerm: "",
    setSearchTerm: () => {},
});

export default MovieContext;
