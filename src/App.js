import React, { useEffect, useState } from "react";

import Movie from "./components/Movie";

const FEATURED_API =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=4649c10d4ba3c182bf2c9432f332bb4d&page=1";

const SEARCH_API =
  "https://api.themoviedb.org/3/search/movie?api_key=4649c10d4ba3c182bf2c9432f332bb4d&query=";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  
  const getMovies = async (API) => {
    const res = await fetch(API);
    const data = await res.json();
    setMovies(data.results);
  };
  useEffect(() => {
    getMovies(FEATURED_API);
  }, []);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (searchTerm) {
      getMovies(SEARCH_API + searchTerm);
      setSearchTerm("");
    }
  };
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };
  return (
    <>
      <header>
        <form onSubmit={handleOnSubmit}>
          <input
            className="search"
            type="text"
            placeholder="Search ..."
            value={searchTerm}
            onChange={handleChange}
          />
        </form>
      </header>
      <div className="movie-container">
        {movies.length > 0 &&
          movies.map((movie) => <Movie key={movie.id} {...movie} />)}
      </div>
    </>
  );
}
export default App;
