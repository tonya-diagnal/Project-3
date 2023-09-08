import React from "react";

import { useSelector } from "react-redux";
import MovieRailItem from "../MovieRailItem/MovieRailItem";
import styles from "./MovieRecomendation.module.css";

const MovieRecommendation = ({ genres, title }) => {
    const movieList = useSelector((state) => state.movieList.movies);
    const moviesToRecommend = [];
    console.log(movieList);
    let i = 0;
    let flag = true;
    const set = new Set();
    set.add(title);

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
                    if (i === 5) {
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
    return (
        <div className={styles.recommended}>
            <h2>Watch similar movies</h2>
            <div className={styles.rail}>
                {moviesToRecommend.map((movie) => (
                    <MovieRailItem movie={movie} key={movie.id} />
                ))}
            </div>
            {/* {rmovies.map((movie) => {
                <MovieRailItem movie={movie} key={movie.id} />;
            })} */}
        </div>
    );
};

export default MovieRecommendation;
