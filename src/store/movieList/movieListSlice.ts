import { createSlice } from "@reduxjs/toolkit";
import { GenreType, MovieItemType } from "./movieListClass";

const initialState = {
    movies: [] as MovieItemType[],
    genres: [] as GenreType[],
};

const movieListSlice = createSlice({
    name: "movieList",
    initialState,
    reducers: {
        storeMovies(state, action) {
            state.movies = action.payload.movies;
        },
    },
});

export const movieListActions = movieListSlice.actions;

export default movieListSlice;
