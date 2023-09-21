import { createSlice } from "@reduxjs/toolkit";
import { GenreType, MovieItemType } from "./movieListClass";
import { MovieListClass } from "./movieListClass";
import { FetchMovieType } from "./movieActions";

const initialState = {
    movies: [] as MovieItemType[],
    genres: [] as GenreType[],
};

const movieListObj = new MovieListClass(
    [
        {
            id: 1,
            title: "",
            year: "",
            runtime: "",
            genres: [],
            director: "",
            actors: "",
            plot: "",
            posterUrl: "",
        },
    ],
    // [{}] as MovieItemType[]
    ["Sport"]
);

const movieListSlice2 = createSlice({
    name: "movieList",
    initialState,
    reducers: {
        storeMovies(state, action: { payload: FetchMovieType; type: string }) {
            // state.movies = action.payload.movies;
            console.log(action.payload);
            movieListObj.replaceMovieList(
                action.payload.movies,
                action.payload.genres
            );
            state.movies = movieListObj.movies;
            state.genres = movieListObj.genres;
            // console.log(state.movies);
            // console.log(state.genres);
        },
    },
});

export const movieListActions2 = movieListSlice2.actions;

export default movieListSlice2;
