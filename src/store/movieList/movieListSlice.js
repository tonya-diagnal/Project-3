import { createSlice } from "@reduxjs/toolkit";

const movieListSlice = createSlice({
  name: "movieList",
  initialState: {
    movies: [],
    genres: [],
  },
  reducers: {
    storeMovies(state, action) {
      state.movies = action.payload.movies;
    },
  },
});

export const movieListActions = movieListSlice.actions;

export default movieListSlice;
