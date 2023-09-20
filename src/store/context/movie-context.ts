import { createContext } from "react";

type MovieContextType = {
    searchTerm: string;
    setSearchTerm: (_1: string) => void;
};

const MovieContext = createContext<MovieContextType>({
    searchTerm: "",
    setSearchTerm: (_1: string) => {},
});

export default MovieContext;
