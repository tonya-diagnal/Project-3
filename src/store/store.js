import { configureStore } from "@reduxjs/toolkit";
import movieListSlice from "./movieList/movieListSlice";

const store = configureStore({
  reducer: { movieList: movieListSlice.reducer },
});

export default store;
