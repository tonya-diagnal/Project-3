import { MovieDispatchType } from "../store";
import { uiActions } from "../ui/uiSlice";
import { GenreType, MovieItemType } from "./movieListClass";
// import { movieListActions } from "./movieListSlice";
import { movieListActions2 } from "./movieListSlice2";

export interface FetchMovieType {
    movies: MovieItemType[];
    genres: GenreType[];
}

export const fetchMovieList = (controller: AbortController) => {
    // const movieDispatch = useMovieDispatch();
    return async (dispatch: MovieDispatchType) => {
        const fetchData = async () => {
            const response = await fetch(
                "https://test.create.diagnal.com/data/db.json",
                { signal: controller.signal }
            );

            if (!response.ok) {
                throw new Error("Could not fetch movie list!");
            }

            const data = (await response.json()) as FetchMovieType;
            console.log(data);

            return data;
        };

        try {
            const movieList = await fetchData();
            dispatch(
                movieListActions2.storeMovies({
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
