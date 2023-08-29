import React from "react";
import styles from "./MovieItem.module.css";

const MovieItem = ({ movie }) => {
  const imageErrorHandler = (event) => {
    event.target.src =
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png";
  };

  return (
    <article className={styles.movieItem}>
      <img
        src={movie.posterUrl}
        alt={movie.title}
        onError={imageErrorHandler}
      ></img>
      <div className={styles.details}>
        <h3>{movie.title}</h3>
        <p>{movie.year}</p>
        <div className={styles.genres}>{movie.genres.join(", ")}</div>
      </div>
    </article>
  );
};

export default MovieItem;
