import { useContext } from "react";
import MovieList from "../../components/MovieList/MovieList";
// import UIContext from "../../store/context/UI-Context/UI-context";
import MovieContext from "../../store/context/movie-context";
import styles from "./MovieHome.module.css";
import MovieRecommendation from "../../components/MovieRecommendation/MovieRecommendation";
// import Carousel from "../../components/UI/Carousel/Carousel";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { GenreType } from "../../store/movieList/movieListClass";
import Carousel2 from "../../components/UI/Carousel2/Carousel2";

const MovieHome = () => {
    // const uiCtx = useContext(UIContext);
    const movieCtx = useContext(MovieContext);
    const genres = useSelector((state: RootState) => state.movieList.genres);

    // const searchTermChangeHandler = (
    //     event: SyntheticEvent<HTMLInputElement, Event>
    // ) => {
    //     movieCtx.setSearchTerm(event.currentTarget.value);
    // };

    return (
        <main style={{ marginTop: "1rem", backgroundColor: "black" }}>
            {/* {uiCtx.showMobileSearchBar && (
                <div className={styles.searchBar}>
                    <input
                        id="mobile-search-input"
                        type="text"
                        placeholder="Search..."
                        onChange={searchTermChangeHandler}
                        name="mobile-search"
                        value={movieCtx.searchTerm}
                    />
                </div>
            )} */}
            {/* {!movieCtx.searchTerm && <Carousel />} */}
            <div
                className={`${styles.carousel} ${
                    movieCtx.searchTerm ? styles.hidden : undefined
                }`}
            >
                {/* <Carousel /> */}
                <Carousel2 />
            </div>
            {!movieCtx.searchTerm ? (
                <>
                    {genres.map((genre: GenreType, _index: number) => (
                        <MovieRecommendation
                            genres={[genre]}
                            currentMovieTitle="Crocodile Dundee"
                            heading={genre}
                            shouldFilter={true}
                            key={genre}
                        />
                    ))}
                    {/* <div style={{ marginTop: "2rem" }}>
                        <MovieList size={-1} />
                    </div> */}
                </>
            ) : (
                <div className={styles.searchContainer}>
                    <div>
                        <h3>Search Results</h3>
                        <MovieList size={10} />
                    </div>
                    {/* <div>
                        <h3 style={{ marginBottom: "1.5rem" }}>
                            Search by Genre
                        </h3>
                        <div>
                            {genres.map((genre: GenreType, _index: number) => (
                                <MovieRecommendation
                                    genres={[genre]}
                                    currentMovieTitle="Crocodile Dundee"
                                    heading={genre}
                                    shouldFilter={true}
                                    key={genre}
                                />
                            ))}
                        </div>
                    </div> */}
                </div>
            )}
        </main>
    );
};

export default MovieHome;
