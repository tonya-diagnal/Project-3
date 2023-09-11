import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import MovieRecommendation from "../MovieRecommendation/MovieRecommendation";
import { useNavigate } from "react-router-dom";
import classes from "./MovieDetails-new.module.css";
import { getPalette } from "../../utils/colorthief/colorthief";
import { FaPlay } from "react-icons/fa";

const MovieDetails = () => {
    const [imageColour, setImageColour] = useState("rgb(0,0,0)");
    const navigate = useNavigate();
    let { movieId } = useParams();
    const movie = useSelector((state) =>
        state.movieList.movies.find((movie) => movie.id === +movieId)
    );
    movie &&
        getPalette(movie.posterUrl).then((value) => {
            console.log(
                `radial-gradient(circle, rgb(${value.toString()}) 0%,rgb(0,0,0) 100%)`
            );
            setImageColour(`rgb(${value.toString()})`);
        });

    const imageErrorHandler = (event) => {
        event.target.src =
            "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png";
    };

    const trailerClickHandler = () => {
        navigate("/trailer");
    };

    return (
        <>
            {movie && (
                <div className={classes.container}>
                    <div
                        className={classes.movieContainer}
                        style={{
                            background: "rgb(0,0,0)",
                            background: `linear-gradient(to right,  rgba(0,0,0,1) 0%,rgba(0,0,0,1) 15%,${imageColour} 70%, rgba(0,0,0,1) 100%`,
                            transition: "all 2s",
                        }}
                    >
                        <div className={classes.movieDetails}>
                            <h1>{movie.title}</h1>

                            <div className={classes.yearRuntime}>
                                <div>
                                    <p>{movie.year}</p>
                                </div>
                                <p>
                                    <strong>|</strong>
                                </p>
                                <div>
                                    <p>
                                        {Math.trunc(+movie.runtime / 60)} hr{" "}
                                        {movie.runtime -
                                            60 *
                                                Math.trunc(
                                                    +movie.runtime / 60
                                                )}{" "}
                                        min
                                    </p>
                                </div>
                            </div>
                            <div className={classes.info}>
                                <div
                                    className={classes.trailer}
                                    onClick={trailerClickHandler}
                                >
                                    <span>Trailer</span>
                                    <FaPlay />
                                </div>
                                <div className={classes.genres}>
                                    <p>{movie.genres.join(" | ")}</p>
                                </div>
                                <div className={classes.director}>
                                    <h3>Director</h3>
                                    <p>{movie.director}</p>
                                </div>
                                <div className={classes.starring}>
                                    <h3>Starring</h3>
                                    <p>{movie.actors}</p>
                                </div>
                                <div className={classes.plot}>
                                    <h3 className={classes.plot}>Plot</h3>
                                    <p> {movie.plot}</p>
                                </div>
                            </div>
                        </div>
                        <div className={classes.titleImage}>
                            <img
                                src={movie.posterUrl}
                                alt={movie.title}
                                onError={imageErrorHandler}
                            />
                        </div>
                    </div>
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
