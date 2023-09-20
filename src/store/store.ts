import { configureStore } from "@reduxjs/toolkit";
// import movieListSlice from "./movieList/movieListSlice";
import movieListSlice2 from "./movieList/movieListSlice2";
import { useDispatch } from "react-redux";

const store = configureStore({
    // reducer: { movieList: movieListSlice.reducer },
    reducer: { movieList: movieListSlice2.reducer },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type MovieDispatchType = typeof store.dispatch;
export const useMovieDispatch = () => useDispatch<MovieDispatchType>();
