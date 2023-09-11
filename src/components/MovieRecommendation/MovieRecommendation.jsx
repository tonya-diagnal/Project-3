import React, { useRef, useState } from "react";
import { AiOutlineLeftCircle, AiOutlineRightCircle } from "react-icons/ai";

import { useSelector } from "react-redux";
import MovieRailItem from "../MovieRailItem/MovieRailItem";
import styles from "./MovieRecomendation.module.css";
import MovieItem from "../MovieItem/MovieItem";

const MovieRecommendation = ({ genres, title }) => {
    const [showLeftArrow, setShowLeftArrow] = useState(true);
    const [showRightArrow, setShowRightArrow] = useState(true);
    const [isHover, setIsHover] = useState(false);
    const ref = useRef();
    const movieList = useSelector((state) => state.movieList.movies);
    const moviesToRecommend = [];
    console.log(movieList);
    let i = 0;
    let flag = true;
    const set = new Set();
    set.add(title);

    const railScrollHandler = (dir) => {
        if (ref.current.scrollLeft === 0) {
            console.log("scroll start");
            setShowLeftArrow(false);
        } else {
            setShowLeftArrow(true);
        }
        if (
            Math.abs(ref.current.scrollLeft) >=
            ref.current.scrollWidth - ref.current.clientWidth - 3
        ) {
            console.log("scroll end");
            setShowRightArrow(false);
        } else {
            setShowRightArrow(true);
        }
        if (dir === "l") {
            ref.current.scrollLeft -= 300;
            setShowRightArrow(true);
        } else {
            setShowLeftArrow(true);
            ref.current.scrollLeft += 300;
        }
    };
    // console.log(genres);
    movieList &&
        genres &&
        movieList.forEach((movie) => {
            // console.log(movie.genres);
            for (let testGenre of movie.genres) {
                if (flag === false) break;
                // console.log(testGenre);
                if (genres.includes(testGenre)) {
                    if (set.has(movie.title)) break;
                    set.add(movie.title);
                    moviesToRecommend.push(movie);
                    i++;
                    if (i === 12) {
                        flag = false;
                        break;
                    }
                }
            }
        });
    console.log(moviesToRecommend);
    // const arr = [0, 1, 2];
    const rmovies = [movieList[0], movieList[1]];
    console.log(rmovies);
    //    {moviesToRecommend.forEach((movie) => {
    //                 <MovieRailItem movie={movie} />;
    //                 console.log(movie);
    //             })} */}
    const mouseOverHandler = () => {
        setIsHover(true);
    };
    const mouseLeaveHandler = () => {
        setIsHover(false);
    };
    return (
        <div className={styles.recommended}>
            <h2>Watch similar movies</h2>

            <div
                className={styles.railContainer}
                // style={{ backgroundColor: "wheat" }}
                onMouseOver={mouseOverHandler}
                onMouseLeave={mouseLeaveHandler}
            >
                {showLeftArrow && (
                    <button
                        className={styles.leftButton}
                        onClick={() => railScrollHandler("l")}
                    >
                        <AiOutlineLeftCircle size={35} />
                    </button>
                )}
                <div className={isHover ? styles.innerRailContainer : null}>
                    <div className={styles.rail} ref={ref}>
                        {moviesToRecommend.map((movie) => (
                            // <MovieRailItem movie={movie} key={movie.id} />
                            <MovieItem movie={movie} key={movie.id} />
                        ))}
                    </div>
                </div>
                {showRightArrow && isHover && (
                    <button
                        className={isHover ? styles.rightButton : null}
                        onClick={() => railScrollHandler("r")}
                    >
                        <AiOutlineRightCircle size={35} />
                    </button>
                )}
            </div>

            {/* {rmovies.map((movie) => {
                <MovieRailItem movie={movie} key={movie.id} />;
            })} */}
        </div>
    );
};

export default MovieRecommendation;
