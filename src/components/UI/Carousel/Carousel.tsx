import { useSelector } from "react-redux";
import styles from "./Carousel.module.css";
import { RootState } from "../../../store/store";
import { MovieItemType } from "../../../store/movieList/movieListClass";
import React, { SyntheticEvent, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Carousel = () => {
    const sliderCounter = useRef(0);
    const navigate = useNavigate();
    // const [test1, setTest1] = useState([] as MovieItemType[]);
    const [carouselMovies, setCarouselMovies] = useState([] as MovieItemType[]);
    const carousalRef = useRef<HTMLDivElement>(null);
    const refs = useRef([1, 2, 3, 4, 5].map(() => React.createRef()));
    const movieList = useSelector((state: RootState) => state.movieList.movies);
    useEffect(() => {
        // console.log("car1", refs.current);
        // const element = document.getElementById("slide-3");
        // console.log(element);
    }, [refs.current[3]]);
    // useEffect(() => {
    //     const timerId = setTimeout(() => {
    //         console.log("car4", carousalRef.current);
    //         const item3 = carousalRef.current?.childNodes.item(2);
    //         console.log("car5", item3);

    //         // item3!.scrollIntoView();
    //     }, 1000);
    //     return clearTimeout(timerId);
    // }, []);

    // useEffect(() => {
    //     // console.log("effect")
    //     const intervalId = setInterval(() => {
    //         console.log("in interval");
    //         nextSlideHandler();
    //     }, 1000);
    //     return clearInterval(intervalId);
    // }, []);

    const filterImageLinks = async () => {
        let validMovies = [] as MovieItemType[];
        if (movieList.length > 0) {
            try {
                for (let i = 0; i < movieList.length; i++) {
                    // console.log("***", movieList[i].id);
                    try {
                        const response = await fetch(movieList[i].posterUrl, {
                            method: "HEAD",
                        });

                        if (response.status === 200) {
                            validMovies.push(movieList[i]);
                        }
                        if (validMovies.length === 5) {
                            break;
                        }
                    } catch (error) {
                        console.log(
                            "error checking image for movie ",
                            movieList[i].id
                        );
                    }
                }
            } catch (error) {
                console.log("wtf", error);
            } finally {
                setCarouselMovies(validMovies);
            }
        }
    };
    // console.log(carouselMovies);
    useEffect(() => {
        filterImageLinks();
    }, [movieList]);
    console.log(refs);
    // let movie = movieList[1];

    const slideClickHandler = (
        event: SyntheticEvent<HTMLDivElement, Event>
    ) => {
        const movieId = event.currentTarget.attributes[1].value;
        // console.log();
        navigate(`/movie/${movieId}`);
    };

    const nextSlideHandler = () => {
        sliderCounter.current += 1;
        if (sliderCounter.current === 5) {
            sliderCounter.current = 0;
        }
        const item = carousalRef.current?.childNodes.item(
            sliderCounter.current
        ) as HTMLDivElement;
        item!.scrollIntoView({
            behavior: "smooth",
            block: "end",
            inline: "nearest",
        });
    };

    const prevSlideHandler = () => {
        sliderCounter.current -= 1;
        if (sliderCounter.current === -1) {
            sliderCounter.current = 4;
        }
        const item = carousalRef.current?.childNodes.item(
            sliderCounter.current
        ) as HTMLDivElement;
        item!.scrollIntoView({
            behavior: "smooth",
            block: "end",
            inline: "nearest",
        });
    };
    return (
        <div className={styles.slider}>
            <div className={styles.slides} ref={carousalRef}>
                {carouselMovies.map((movie, index) => (
                    <div
                        id={`slide-${index}`}
                        data-movie-id={movie.id}
                        key={movie.id}
                        className={styles.slide}
                        onClick={slideClickHandler}
                        // ref={refs.current[index]}
                    >
                        <div
                            style={{
                                backgroundImage: `url("${movie.posterUrl}")`,
                                transform: "scale(1.2)",
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                backgroundColor: "rgba(255, 255, 255, 0.4)",
                                filter: "blur(10px) brightness(0.62)",
                                width: "100%",
                                height: "100%",
                            }}
                        ></div>
                        <div className={styles.content}>
                            <img src={movie.posterUrl} alt={movie.title} />
                            <div className={styles.details}>
                                <h3>{movie.title}</h3>
                                <div className={styles.info}>
                                    <p>{movie.year}</p>
                                    <span>|</span>
                                    <p>{movie.runtime}</p>
                                    <span>|</span>
                                    <p>{movie.genres[0]}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className={styles.navigator}>
                <a href="#slide-0"></a>
                <a href="#slide-1"></a>
                <a href="#slide-2"></a>
                <a href="#slide-3"></a>
                <a href="#slide-4"></a>
            </div>
            <div>
                <button onClick={nextSlideHandler}>next</button>
                <button onClick={prevSlideHandler}>prev</button>
            </div>
        </div>
    );
};

export default Carousel;
