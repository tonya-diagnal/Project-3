import React from "react";
import styles from "./MovieRailItem.module.css";
import { useNavigate } from "react-router-dom";

const MovieRailItem = ({ movie }) => {
    const navigate = useNavigate();
    const movieItemClickHandler = () => {
        navigate(`/movie/${movie.id}`);
    };
    const imageErrorHandler = (event) => {
        event.target.src =
            "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png";
    };
    console.log("rail");
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

export default MovieRailItem;
