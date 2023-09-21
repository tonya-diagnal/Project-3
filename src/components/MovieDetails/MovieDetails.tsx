import { useState, SyntheticEvent } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import MovieRecommendation from "../MovieRecommendation/MovieRecommendation";
import { useNavigate } from "react-router-dom";
import classes from "./MovieDetails.module.css";
import { getPalette } from "../../utils/colorthief/colorthief";
import { FaPlay } from "react-icons/fa";
import { RootState } from "../../store/store";

const MovieDetails = () => {
    type imageColourType = `rgb(${number},${number},${number})`;
    const [imageColour, setImageColour] =
        useState<imageColourType>("rgb(0,0,0)");
    const navigate = useNavigate();
    let { movieId } = useParams();
    // console.log(typeof movieId, movieId);
    movieId = movieId ?? "0";
    const movieIdValue = typeof +movieId === "number" ? +movieId : 0;
    const movie = useSelector((state: RootState) =>
        state.movieList.movies.find((movie) => movie.id === movieIdValue)
    );

    movie &&
        getPalette(movie.posterUrl).then((value) => {
            // console.log(
            //     `radial-gradient(circle, rgb(${value.toString()}) 0%,rgb(0,0,0) 100%)`
            // );
            // console.log(`rgb(${value[0]},${value[1]},${value[2]})`);
            setImageColour(
                `rgb(${value[0]},${value[1]},${value[2]})` as imageColourType
            );
        });

    const imageErrorHandler = (
        event: SyntheticEvent<HTMLImageElement, Event>
    ) => {
        event.currentTarget.src =
            "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png";
    };

    const trailerClickHandler = () => {
        navigate("/trailer");
    };

    // console.log(movie?.genres);
    return (
        <>
            {movie && (
                <div className={classes.container}>
                    <div
                        className={classes.movieContainer}
                        style={{
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
                                        {+movie.runtime -
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
