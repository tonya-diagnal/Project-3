import { useContext } from "react";
import MovieItem from "../MovieItem/MovieItem";
import styles from "./MovieList.module.css";
import { useSelector } from "react-redux";
import MovieContext from "../../store/context/movie-context";
import { RootState } from "../../store/store";

const MovieList = () => {
    const movieList = useSelector((state: RootState) => state.movieList.movies);
    const movieCtx = useContext(MovieContext);

    const filteredMovieList = movieList.filter((movie) =>
        movie.title.toLowerCase().includes(movieCtx.searchTerm.toLowerCase())
    );

    return (
        <div className={styles.movieListContainer}>
            <div className={styles.movieList}>
                {filteredMovieList.length > 0 ? (
                    filteredMovieList.map((movie) => (
                        <MovieItem movie={movie} key={movie.id} />
                    ))
                ) : (
                    <div className={styles.notFound}>No movies found</div>
                )}
            </div>
        </div>
    );
};

export default MovieList;
