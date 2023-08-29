import { uiActions } from "../ui/uiSlice";
import { movieListActions } from "./movieListSlice";

export const fetchMovieList = (controller) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://test.create.diagnal.com/data/db.json",
        { signal: controller.signal }
      );

      if (!response.ok) {
        throw new Error("Could not fetch movie list!");
      }

      const data = await response.json();

      return data;
    };

    try {
      const movieList = await fetchData();
      dispatch(
        movieListActions.storeMovies({
          movies: movieList.movies || [],
          genres: movieList.genres || [],
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Fetching movie data failed!",
        })
      );
    }
  };
};
