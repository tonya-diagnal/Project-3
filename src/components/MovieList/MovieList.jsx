import React, { useContext, useEffect } from "react";
import MovieItem from "../MovieItem/MovieItem";
import styles from "./MovieList.module.css";
import { useSelector } from "react-redux";
import MovieContext from "../../store/context/movie-context";

const MovieList = () => {
    const movieList = useSelector((state) => state.movieList.movies);
    const movieCtx = useContext(MovieContext);
    console.log(movieCtx.searchTerm);
    useEffect(() => {
        console.log(movieList);
    }, [movieList]);

    const filteredMovieList = movieList.filter((movie) =>
        movie.title.toLowerCase().includes(movieCtx.searchTerm.toLowerCase())
    );
    return (
        <div className={styles.movieListContainer}>
            <div className={styles.movieList}>
                {filteredMovieList.map((movie) => (
                    <MovieItem movie={movie} key={movie.id} />
                ))}
            </div>
        </div>
    );
};

export default MovieList;
