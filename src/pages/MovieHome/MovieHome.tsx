import { useContext, SyntheticEvent } from "react";
import MovieList from "../../components/MovieList/MovieList";
import UIContext from "../../store/context/UI-Context/UI-context";
import MovieContext from "../../store/context/movie-context";
import styles from "./MovieHome.module.css";
import MovieRecommendation from "../../components/MovieRecommendation/MovieRecommendation";
import Carousel from "../../components/UI/Carousel";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { GenreType } from "../../store/movieList/movieListClass";

const MovieHome = () => {
    const uiCtx = useContext(UIContext);
    const movieCtx = useContext(MovieContext);
    const genres = useSelector((state: RootState) => state.movieList.genres);

    const searchTermChangeHandler = (
        event: SyntheticEvent<HTMLInputElement, Event>
    ) => {
        movieCtx.setSearchTerm(event.currentTarget.value);
    };

    return (
        <main style={{ marginTop: "1rem" }}>
            {uiCtx.showMobileSearchBar && (
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
            )}
            {/* <Carousel /> */}
            {genres.map((genre: GenreType, _index: number) => (
                <MovieRecommendation
                    genres={[genre]}
                    currentMovieTitle="Crocodile Dundee"
                    heading={genre}
                />
            ))}

            <MovieList />
        </main>
    );
};

export default MovieHome;
