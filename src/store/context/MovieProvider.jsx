import React, { useReducer } from "react";
import MovieContext from "./movie-context";

const defaultMovieState = { searchTerm: "" };
const movieReducer = (state, action) => {
    if (action.type === "changeSearchTerm") {
        return { searchTerm: action.searchTerm };
    }
};

const MovieProvider = (props) => {
    const [movieState, dispatchMovieAction] = useReducer(
        movieReducer,
        defaultMovieState
    );

    const searchTermChangeHandler = (searchValue) => {
        dispatchMovieAction({
            type: "changeSearchTerm",
            searchTerm: searchValue,
        });
    };

    const movieContext = {
        searchTerm: movieState.searchTerm,
        setSearchTerm: searchTermChangeHandler,
    };
    return (
        <MovieContext.Provider value={movieContext}>
            {props.children}
        </MovieContext.Provider>
    );
};

export default MovieProvider;
