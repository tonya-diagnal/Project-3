import React, { useEffect } from "react";
import db from "../../assets/db.json";
import MovieItem from "../MovieItem/MovieItem";
import styles from "./MovieList.module.css";
import { useSelector } from "react-redux";

const MovieList = () => {
  const movieList = useSelector((state) => state.movieList.movies);

  useEffect(() => {
    console.log(movieList);
  }, [movieList]);

  return (
    <div className={styles.movieList}>
      {movieList.map((movie) => (
        <MovieItem movie={movie} key={movie.id} />
      ))}
    </div>
  );
};

export default MovieList;
