import { useRef, useState } from "react";
import { AiOutlineLeftCircle, AiOutlineRightCircle } from "react-icons/ai";
import { useSelector } from "react-redux";
import styles from "./MovieRecomendation.module.css";
import MovieItem from "../MovieItem/MovieItem";
import { GenreType, MovieItemType } from "../../store/movieList/movieListClass";
import { RootState } from "../../store/store";

enum scrollDirectionType {
    "left",
    "right",
}

const MovieRecommendation = ({
    genres,
    title,
}: {
    genres: GenreType[];
    title: string;
}) => {
    const [showLeftArrow, setShowLeftArrow] = useState(true);
    const [showRightArrow, setShowRightArrow] = useState(true);
    const [isHover, setIsHover] = useState(false);

    const divRef = useRef<HTMLDivElement>(null);

    const movieList = useSelector((state: RootState) => state.movieList.movies);
    const moviesToRecommend = [] as MovieItemType[];

    let i = 0;
    let flag = true;
    const set = new Set<string>();
    set.add(title);
    // useEffect(() => {
    //     if (!divRef.current) throw Error("divRef is not assigned");
    // });

    const railScrollHandler = (direction: scrollDirectionType) => {
        if (divRef.current) {
            if (divRef.current.scrollLeft <= 10) {
                console.log("scroll start");
                setShowLeftArrow(false);
            } else {
                setShowLeftArrow(true);
            }
            if (
                Math.abs(divRef.current.scrollLeft) >=
                divRef.current.scrollWidth - divRef.current.clientWidth - 3
            ) {
                console.log("scroll end");
                setShowRightArrow(false);
            } else {
                setShowRightArrow(true);
            }
            if (direction === scrollDirectionType.left) {
                divRef.current.scrollLeft -= 300;
                setShowRightArrow(true);
            } else {
                setShowLeftArrow(true);
                divRef.current.scrollLeft += 300;
            }
        }
    };

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

    const mouseOverHandler = () => {
        setIsHover(true);
    };
    const mouseLeaveHandler = () => {
        setIsHover(false);
    };

    // const scrollToTopHandler = () => {
    //     window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    // };

    return (
        <div className={styles.recommended}>
            <h2>Watch similar movies</h2>

            <div
                className={styles.railContainer}
                // style={{ backgroundColor: "wheat" }}
                onMouseOver={mouseOverHandler}
                onMouseLeave={mouseLeaveHandler}
            >
                {showLeftArrow && isHover && (
                    <button
                        className={styles.leftButton}
                        onClick={() =>
                            railScrollHandler(scrollDirectionType.left)
                        }
                    >
                        <AiOutlineLeftCircle size={35} />
                    </button>
                )}
                <div
                    className={isHover ? styles.innerRailContainer : undefined}
                >
                    <div className={styles.rail} ref={divRef}>
                        {moviesToRecommend.map((movie) => (
                            // <MovieRailItem movie={movie} key={movie.id} />
                            <MovieItem movie={movie} key={movie.id} />
                        ))}
                    </div>
                </div>
                {showRightArrow && isHover && (
                    <button
                        className={isHover ? styles.rightButton : undefined}
                        onClick={() =>
                            railScrollHandler(scrollDirectionType.right)
                        }
                    >
                        <AiOutlineRightCircle size={35} />
                    </button>
                )}
            </div>
        </div>
    );
};

export default MovieRecommendation;
