import React from "react";
import styles from "./MovieItem.module.css";
import { useNavigate } from "react-router-dom";

const MovieItem = ({ movie }) => {
    const navigate = useNavigate();
    const imageErrorHandler = (event) => {
        event.target.src =
            "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png";
    };

    const movieItemClickHandler = () => {
        navigate(`/movie/${movie.id}`);
    };

    return (
        <article className={styles.movieItem} onClick={movieItemClickHandler}>
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
