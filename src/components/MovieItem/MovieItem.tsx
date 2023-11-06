import styles from "./MovieItem.module.css";
import { useNavigate } from "react-router-dom";
import { SyntheticEvent } from "react";
import { MovieItemType } from "../../store/movieList/movieListClass";

const MovieItem = ({ movie }: { movie: MovieItemType }) => {
    const navigate = useNavigate();
    const imageErrorHandler = (
        event: SyntheticEvent<HTMLImageElement, Event>
    ) => {
        event.currentTarget.src =
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
                {/* <div className={styles.info}>
                    <p>{movie.year}</p>
                    <span>|</span>
                    <p>{movie.runtime}</p>
                    <span>|</span>
                    <p>{movie.genres[0]}</p>
                </div> */}
            </div>
        </article>
    );
};

export default MovieItem;
