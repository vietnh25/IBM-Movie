import React, { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import MovieList from "./components/MovieList";
import RangeSliderComp from "./components/RangeSliderComp";
import NavigationBar from "./components/NavigationBar";
import Pagination from "react-js-pagination";
import popCornLogo from "../src/pop-corn-logo.png";
import { css } from "@emotion/core";
import PacmanLoader from "react-spinners/PacmanLoader";
import YoutubeModal from "./components/YoutubeModal";
import favoriteMovie from "./components/FavoriteMovie";

import Zoom from "react-reveal/Zoom";
import FavoriteMovie from "./components/FavoriteMovie";

const override = css`
  display: block;
  margin: 10% auto;
`;

let trendNameOption = "trendNameOption";
let genreNameOption = "genreNameOption";
let keywordOption = "keywordOption";

const API_KEY = process.env.REACT_APP_APIKEY;

function App() {
  let [movieList, setMovieList] = useState(null); //the movie result from API
  let [OGMovies, setOGMovies] = useState([]); //the original movie result from API to compare with sorted movieList
  let [genreList, setGenreList] = useState(null); //to get the genre from genre API
  let [loading, setLoading] = useState(true);
  let [moviePage, setMoviePage] = useState({}); //the state to help pagination

  let [keyword, setSearchKeyword] = useState(null); //the state of value from the input bar to search via keyword
  let [trendName, setTrendName] = useState("now_playing"); //the value of searching via trend
  let [searchGenre, setSearchGenre] = useState(null); //the value of searching via genre
  let [searchOption, setSearchOption] = useState(""); //crucial option to different the search so the engine only does one kind of search (keyword OR genre OR trending) at a time
  const [show, setShow] = useState(false);
  let [movieID, setMovieID] = useState(""); //to get the youtube key from movie id
  let FavoriteList = JSON.parse(localStorage.getItem("FavoriteMovieList"));
  if (FavoriteList === null) {
    FavoriteList = [];
  }
  let [favoriteMovie, setFavoriteMovie] = useState(FavoriteList);

  const getGenre = async () => {
    let url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`;
    let data = await fetch(url);
    let genreResult = await data.json();
    getMovie();
    setGenreList(genreResult.genres);
    console.log("genres", genreResult.genres);
  };

  const getMovie = async () => {
    setSearchOption(trendNameOption);
    let url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`;
    let data = await fetch(url);
    let result = await data.json();
    setMoviePage(result);
    setMovieList(result.results);
    setOGMovies(result.results);
    console.log("movies", result);
  };

  const getTrendMovie = async (trend) => {
    setActivePage(1);
    setSearchOption(trendNameOption);
    setTrendName(trend);
    let url = `https://api.themoviedb.org/3/movie/${trend}?api_key=${API_KEY}&language=en-US&page=1`;
    let data = await fetch(url);
    let result = await data.json();
    setMoviePage(result);
    setMovieList(result.results);
    setOGMovies(result.results);
    console.log("movies", result);
  };

  const getDiscoverGenre = async (genre) => {
    setActivePage();
    setSearchOption(genreNameOption);
    setSearchGenre(genre);
    let url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${genre}`;
    let data = await fetch(url);
    let result = await data.json();
    setMoviePage(result);
    console.log("what are the total results here", result.total_results);
    setMovieList(result.results);
    setOGMovies(result.results);
  };

  //sort by Rating
  let sortByRating = (order) => {
    //const duplicatedMovieList = movieList.slice(0);
    const duplicatedMovieList = [...movieList];
    if (order === 0) {
      setMovieList(OGMovies);
    } else {
      const sortedMoveList = duplicatedMovieList.sort(function (a, b) {
        // return a.popularity - b.popularity;
        return (a.vote_average - b.vote_average) * order;
      });
      setMovieList(sortedMoveList);
    }
  };

  let unSort = () => {
    setMovieList(OGMovies);
  };
  //end sort by ratings

  //searchByKeyword
  const searchByKeyword = async (inputValue, event) => {
    setActivePage();
    console.log(inputValue);
    setSearchOption(keywordOption);
    setSearchKeyword(inputValue);
    if (inputValue === "") {
      getMovie();
      setMovieList(movieList);
      setOGMovies(movieList);
    } else {
      setMovieList(
        OGMovies.filter((movie) =>
          movie.title.toLowerCase().includes(inputValue.toLowerCase())
        )
      );
      let url = `https://api.themoviedb.org/3/search/movie?query=${inputValue}&api_key=${API_KEY}&language=en-US&page=1`;
      let data = await fetch(url);
      let result = await data.json();
      console.log("data searched by inPutValue:", data);
      setMoviePage(result);
      setMovieList(result.results);
      setOGMovies(result.results);
    }
  };

  //Youtube{
  const searchYoutube = async (id) => {
    console.log("what is title id", id);
    let url = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}&language=en-US`;
    let data = await fetch(url);
    let movieresult = await data.json();
    console.log("What is result", movieresult.results[0]);
    if (!movieresult.results[0]) {
      alert("This movie's Youtube trailer is currently unknown!");
      return;
    } else {
      setMovieID(movieresult.results[0]);
      handleShow();
      return;
    }
  };

  // pagination
  //add in searchOption to distinguish between the search
  let [page, setActivePage] = useState(1);
  let handlePageChange = async (pageNumber) => {
    setActivePage(pageNumber);
    console.log(`active page is ${pageNumber}`);
    let url = "";
    if (searchOption === "keywordOption") {
      url = `https://api.themoviedb.org/3/search/movie?query=${keyword}&api_key=${API_KEY}&language=en-US&page=${pageNumber}`;
    } else if (searchOption === "genreNameOption") {
      url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=${searchGenre}&page=${pageNumber}`;
    } else if (searchOption === "trendNameOption") {
      url = `https://api.themoviedb.org/3/movie/${trendName}?api_key=${API_KEY}&language=en-US&page=${pageNumber}`;
    }
    console.log("key current is:", trendName, keyword, searchGenre);
    let data = await fetch(url);
    let result = await data.json();
    setMoviePage(result);
    console.log("What is moviepage here", moviePage.total_results);
    setMovieList(result.results);
  };

  //modal
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //add favorite
  const addFavorite = (item) => {
    const duplicateMovie = favoriteMovie.filter(
      (movie) => movie.id === item.id
    );
    if (duplicateMovie.length > 0) {
      alert("This movie is already tagged!");
      return;
    }
    let newFavoriteMovie = favoriteMovie.slice();
    newFavoriteMovie.push(item);
    setFavoriteMovie(newFavoriteMovie);
    localStorage.setItem("FavoriteMovieList", JSON.stringify(newFavoriteMovie));
  };

  //delete favorite
  const deleteFavorite = (deleteID) => {
    let newFavoriteMovie = favoriteMovie.filter((item) => item.id != deleteID);
    setFavoriteMovie(newFavoriteMovie);
    localStorage.setItem("FavoriteMovieList", JSON.stringify(newFavoriteMovie));
  };

  //useEffect
  useEffect(() => {
    window.scrollTo(0, 0);
    getGenre();
  }, []);

  //loading
  if (genreList === null || movieList === null) {
    return (
      <div className="sweet-loading">
        <PacmanLoader
          css={override}
          size={125}
          color={"yellow"}
          loading={setLoading}
        />
      </div>
    );
  }

  //render
  return (
    <div className="wrapper">
      <NavigationBar
        popCornLogo={popCornLogo}
        getDiscoverGenre={getDiscoverGenre}
        sortByRating={sortByRating}
        unSort={unSort}
        getTrendMovie={getTrendMovie}
        searchByKeyword={searchByKeyword}
      />
      {/* <div><RangeSliderComp movieList ={movieList}/></div> */}
      {/* <div>bigTrendName</div> */}
      <FavoriteMovie
        favoriteMovie={favoriteMovie}
        deleteFavorite={deleteFavorite}
        searchYoutube={searchYoutube}
        handleShow={handleShow}
        genreList={genreList}
      />
      <Pagination
        className="pagination"
        hideDisabled
        prevPageText="Prev"
        nextPageText="Next"
        firstPageText="First"
        lastPageText="Last"
        activePage={page}
        itemsCountPerPage={20}
        totalItemsCount={moviePage.total_results}
        onChange={(pageNumber) => handlePageChange(pageNumber)}
        itemClass="page-item"
        linkClass="page-link"
      />

      <YoutubeModal
        show={show}
        onHide={() => setShow(false)}
        movieID={movieID}
      ></YoutubeModal>

      <MovieList
        movieList={movieList}
        searchYoutube={searchYoutube}
        handleShow={handleShow}
        genreList={genreList}
        addFavorite={addFavorite}
      />

      <Pagination
        className="pagination"
        hideDisabled
        prevPageText="Prev"
        nextPageText="Next"
        firstPageText="First"
        lastPageText="Last"
        activePage={page}
        itemsCountPerPage={20}
        totalItemsCount={moviePage.total_results}
        onChange={(pageNumber) => handlePageChange(pageNumber)}
        itemClass="page-item"
        linkClass="page-link"
      />
      <footer className="mt-5 text-muted text-center text-small">
        <p className="mb-1">
          © 2020 Powered with by{" "}
          <a href="hhttps://www.themoviedb.org/">TMDB API</a>
        </p>
        <ul className="list-inline">
          <li className="list-inline-item">
            Made by <a href="https://github.com/howtolove48/">howtolove48</a>
          </li>
        </ul>
      </footer>
    </div> //end wrapper
  );
}

export default App;
