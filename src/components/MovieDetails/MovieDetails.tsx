import { useState, SyntheticEvent, useRef } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import MovieRecommendation from "../MovieRecommendation/MovieRecommendation";
import { useNavigate } from "react-router-dom";
import classes from "./MovieDetails.module.css";
import { getPalette } from "../../utils/colorthief/colorthief";
import { FaPlay } from "react-icons/fa";
import { RootState } from "../../store/store";

const MovieDetails = () => {
    const topDivRef = useRef<HTMLDivElement>(null);
    // const scrollToTop = () => {
    //     topDivRef?.current?.scrollIntoView({ behavior: "smooth" });
    // };

    type imageColourType = `rgb(${number},${number},${number})`;
    const [imageColour, setImageColour] =
        useState<imageColourType>("rgb(0,0,0)");
    const navigate = useNavigate();
    let { movieId } = useParams();

    movieId = movieId ?? "0";
    const movieIdValue = typeof +movieId === "number" ? +movieId : 0;
    const movie = useSelector((state: RootState) =>
        state.movieList.movies.find((movie) => movie.id === movieIdValue)
    );

    // window.scrollTo({ top: 0, left: 0, behavior: "smooth" });

    movie &&
        getPalette(movie.posterUrl).then((value) => {
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

    return (
        <>
            {movie && (
                <>
                    <div ref={topDivRef}></div>
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
                                    <div
                                        style={{
                                            // fontSize: "2rem",
                                            // fontWeight: "1000",
                                            width: "7px",
                                            height: "7px",
                                            borderRadius: "50%",
                                            backgroundColor: "yellow",
                                        }}
                                    >
                                        {/* <b>{`${"\u00B7"}`}</b> */}
                                    </div>
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
                                    <div className={classes.genreContainer}>
                                        <h3>Genres</h3>
                                        <div className={classes.genres}>
                                            {movie.genres.map(
                                                (value, index) => {
                                                    {
                                                        if (
                                                            index ===
                                                            movie.genres
                                                                .length -
                                                                1
                                                        )
                                                            return (
                                                                <div
                                                                    className={
                                                                        classes.genre
                                                                    }
                                                                >
                                                                    {value}
                                                                </div>
                                                            );
                                                    }
                                                    return (
                                                        <div
                                                            className={
                                                                classes.genre
                                                            }
                                                        >
                                                            {value}

                                                            <div
                                                                style={{
                                                                    // fontSize: "2rem",
                                                                    // fontWeight: "1000",
                                                                    width: "6px",
                                                                    height: "6px",
                                                                    borderRadius:
                                                                        "50%",
                                                                    backgroundColor:
                                                                        "yellow",
                                                                }}
                                                            ></div>
                                                        </div>
                                                    );
                                                }
                                            )}
                                        </div>
                                        {/* <p>{movie.genres.join(" \u00B7 ")}</p> */}
                                        {/* {["yo ",<b>hai </b>]} */}
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
                                    <div
                                        className={classes.trailer}
                                        onClick={trailerClickHandler}
                                    >
                                        <span>Trailer</span>
                                        <FaPlay />
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
                        {/* <div onClick={scrollToTop}> */}
                        <MovieRecommendation
                            genres={movie.genres}
                            currentMovieTitle={movie.title}
                            heading="Watch similar movies"
                            shouldFilter={false}
                        />
                        {/* </div> */}
                    </div>
                </>
            )}
        </>
    );
};

export default MovieDetails;
