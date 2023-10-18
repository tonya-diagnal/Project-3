import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./Carousel2.css";
import styles from "./Carousal2.module.css";

import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { MovieItemType } from "../../../store/movieList/movieListClass";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function App() {
    const movieList = useSelector((state: RootState) => state.movieList.movies);
    // const carousalRef = useRef(null);
    const navigate = useNavigate();
    const [carouselMovies, setCarouselMovies] = useState([] as MovieItemType[]);

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

    // const slideClickHandler = (event) => {
    //     const movieId = event.target;
    //     console.log("hai");
    //     console.log(event);
    //     navigate(`/movie/${movieId}`);
    // };

    return (
        <div
        // style={{ height: "20rem" }}
        // onClick={() => {
        //     navigate(`/movie/${carousalRef.current}`);
        // }}
        >
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                }}
                // loop={true}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
                // onSlideChange={(swiper) => {
                //     console.log(swiper);
                //     carousalRef.current = carouselMovies[swiper.activeIndex].id;
                // }}
                // onSwiper={(swiper) => {
                //     carousalRef.current = 0;
                // }}
            >
                {carouselMovies.map((movie, _index) => (
                    <SwiperSlide
                        key={movie.id}
                        data-movie-id={movie.id}
                        // onClick={slideClickHandler}
                    >
                        <div
                            // id={`slide-${index}`}
                            data-movie-id={movie.id}
                            key={movie.id}
                            className={styles.slide}
                            // onClick={(event) => {
                            //     navigate(
                            //         `/movie/${event.currentTarget.dataset.movieId}`
                            //     );
                            //     // console.log(
                            //     //     event.currentTarget.dataset.movieId
                            //     // );
                            // }}
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
                                        <p>
                                            {Math.trunc(+movie.runtime / 60)} hr{" "}
                                            {+movie.runtime -
                                                60 *
                                                    Math.trunc(
                                                        +movie.runtime / 60
                                                    )}{" "}
                                            min
                                        </p>
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
                                        <p>{movie.genres[0]}</p>
                                    </div>
                                    <div className={styles.plot}>
                                        {movie.plot}
                                    </div>
                                    <button
                                        onClick={(_event) => {
                                            navigate(
                                                // `/movie/${event.currentTarget.dataset.movieId}`
                                                `/movie/${movie.id}`
                                            );
                                            // console.log(
                                            //     event.currentTarget.dataset.movieId
                                            // );
                                        }}
                                        className={styles.button}
                                    >
                                        Visit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
