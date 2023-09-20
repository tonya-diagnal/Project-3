import { PropsWithChildren, useReducer } from "react";
import MovieContext from "./movie-context";

enum MovieReducerActions {
    "changeSearchTerm",
}
type MovieReducerStateType = {
    searchTerm: string;
};
type MovieReducerActionType = {
    type: MovieReducerActions;
    searchTerm: string;
};

type MovieContextType = {
    searchTerm: string;
    setSearchTerm: (searchValue: string) => void;
};

const defaultMovieState: MovieReducerStateType = { searchTerm: "" };

const movieReducer = (
    _state: MovieReducerStateType,
    action: MovieReducerActionType
): MovieReducerStateType => {
    switch (action.type) {
        case MovieReducerActions.changeSearchTerm:
            return { searchTerm: action.searchTerm };
        default:
            throw new Error("Wrong action type");
    }
};

const MovieProvider = (props: PropsWithChildren) => {
    const [movieState, dispatchMovieAction] = useReducer(
        movieReducer,
        defaultMovieState
    );

    const searchTermChangeHandler = (searchValue: string) => {
        dispatchMovieAction({
            type: MovieReducerActions.changeSearchTerm,
            searchTerm: searchValue,
        });
    };

    const movieContext: MovieContextType = {
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
