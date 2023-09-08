import React from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import styles from "./MovieDetails.module.css";
import MovieRecommendation from "../MovieRecommendation/MovieRecommendation";
import { useNavigate } from "react-router-dom";

const MovieDetails = () => {
    const navigate = useNavigate();
    let { movieId } = useParams();
    const movie = useSelector((state) =>
        state.movieList.movies.find((movie) => movie.id === +movieId)
    );
    let movieGenres = [];
    // movie &&  movieGenres = movie.genres;

    const imageErrorHandler = (event) => {
        event.target.src =
            "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png";
    };
    // const movies = useSelector((state) => state.movieList.movies);
    // console.log(movies);
    // console.log(movie);
    const trailerClickHandler = () => {
        navigate("/trailer");
    };

    return (
        <>
            {movie && (
                <div className={styles.container}>
                    <div className={styles.movieContainer}>
                        <div className={styles.titleImage}>
                            <img
                                src={movie.posterUrl}
                                alt={movie.title}
                                onError={imageErrorHandler}
                            />
                        </div>

                        <div className={styles.movieDetails}>
                            <h1>{movie.title}</h1>
                            <div
                                className={styles.trailer}
                                onClick={trailerClickHandler}
                            >
                                Watch Trailer
                            </div>
                            <div className={styles.data}>
                                <div>
                                    <h3> Year </h3>
                                    <p>{movie.year}</p>
                                </div>
                                <div>
                                    <h3>Runtime</h3>
                                    <p>{movie.runtime} minutes</p>
                                </div>
                                <div>
                                    <h3>Genres</h3>
                                    <p>{movie.genres.join(", ")}</p>
                                </div>
                            </div>
                            <div className={styles.people}>
                                <div>
                                    <h3>Director</h3>
                                    <p>{movie.director}</p>
                                </div>

                                <div>
                                    <h3>Actors</h3>
                                    <p>{movie.actors}</p>
                                </div>
                            </div>
                            <div className={styles.plot}>
                                <h3>Plot</h3>
                                <p> {movie.plot}</p>
                            </div>
                        </div>
                    </div>
                    {/* <MovieRecommendation genres={movieGenres} /> */}

                    <MovieRecommendation
                        genres={movie.genres}
                        title={movie.title}
                    />
                </div>
            )}
        </>
    );
};

export default MovieDetails;
