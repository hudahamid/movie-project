'use strict';
//..
const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const PROFILE_BASE_URL = "http://image.tmdb.org/t/p/w185";
const BACKDROP_BASE_URL = "http://image.tmdb.org/t/p/w780";
const CONTAINER = document.querySelector(".container");

// Don't touch this function please
const autorun = async () => {
 const movies = await fetchMovies();
  renderMovies(movies.results);
};



// Don't touch this function please
const constructUrl = (path) => {
  return `${TMDB_BASE_URL}/${path}?api_key=${atob(
    "NTQyMDAzOTE4NzY5ZGY1MDA4M2ExM2M0MTViYmM2MDI="
  )}`;
};

// You may need to add to this function, definitely don't delete it.
const movieDetails = async (movie) => {
  const movieRes = await fetchMovie(movie.id);
  const movieReleate = await fetchReleatedMovies(movie.id);
  renderMovie(movieRes);
  renderReleatedMovies( movieReleate)
};

// This function is to fetch movies. You may need to add it or change some part in it in order to apply some of the features.
const fetchMovies = async () => {
  const url = constructUrl(`movie/now_playing`);
  const res = await fetch(url);
  return res.json();
};

// Don't touch this function please. This function is to fetch one movie.
const fetchMovie = async (movieId) => {
  const url = constructUrl(`movie/${movieId}`);
  const res = await fetch(url);
  return res.json();
};


//___________________________fetchReleatedMovies____________
const fetchReleatedMovies = async (id) => {
  const url = constructUrl(`movie/${id}/similar`);
  const res = await fetch(url);
  //console.log(res.json())
  return res.json();
};

//..........................................style.........................................................

// You'll need to play with this function in order to add features and enhance the style.
const renderMovies = (movies) => {
  movies.map((movie) => {
    const movieDiv = document.createElement("div");
    movieDiv.innerHTML = `
        <img src="${BACKDROP_BASE_URL + movie.backdrop_path}" alt="${
      movie.title
    } poster">
        <h3>${movie.title}</h3>`;
    movieDiv.addEventListener("click", () => {
      movieDetails(movie);
    });
    CONTAINER.appendChild(movieDiv);
  });
};

// You'll need to play with this function in order to add features and enhance the style.
const renderMovie = (movie) => {
  CONTAINER.innerHTML = `
    <div class="row">
        <div class="col-md-4">
             <img id="movie-backdrop" src=${BACKDROP_BASE_URL + movie.backdrop_path
    }>
        </div>
        <div class="col-md-8">
            <h2 id="movie-title">${movie.title}</h2>
            <p id="movie-release-date"><b>Release Date:</b> ${movie.release_date
    }</p>
           <p id="movie-release-date"><b>Movie Language</b> ${movie.original_language.toUpperCase()

    }</p>
           <p id="movie-release-date"><b>Vote count:</b> ${movie.vote_count

    }</p>

    
            <p id="movie-runtime"><b>movie rating</b> ${movie.vote_average}</p>
             <p id="movie-runtime"><b>movie production company name and logo</b> ${movie.production_companies[3]
    } </p>
              <p id="movie-runtime"><b>director name:</b> ${movie.runtime} Minutes</p>

           
    
            <p id="movie-runtime"><b>Runtime:</b> ${movie.runtime} Minutes</p>
            <h3>Overview:</h3>
            <p id="movie-overview">${movie.overview}</p>
        </div>
        </div>
            <h3>Actors:</h3>
            <ul id="actors" class="list-unstyled">
            <li> <img id="actor-backdrop" src= movie.cast
    }></li>
            </ul>

           <h3>Related Movies</h3> `;

          
         const releatedMovieList = document.createElement("releated")
         releatedMovieList.append(renderReleatedMovies(releated))
          
    
    
    
   
};

// actor rendering,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
const renderActors = (actors) => {
  actors.map((actor) => {
    const actorDiv = document.createElement("div");
    actorDiv.innerHTML = `
          <img src="${PROFILE_BASE_URL + actor.profile_path}" alt="${actor.name
      } poster">
          <h3>${actor.name}</h3>`;
    actorDiv.addEventListener("click", () => {
      actorDetails(actor);
    });
    CONTAINER.appendChild(actorDiv);
  });
};

// actor rendering,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
const renderReleatedMovies = (relates) => {
  relates.similar.slice(0, 5).map((relate) => {
    const actorDiv = document.createElement("ul");
    actorDiv.innerHTML = `
        <li>${actor.name}</li>
        <img src="${BACKDROP_BASE_URL + relate.backdrop_path}" alt="${
          relate.title
        } poster">`
    actorDiv.addEventListener("click", () => {displaySingleActorPage();});
    CONTAINER.appendChild(actorDiv);
  });

}
document.addEventListener("DOMContentLoaded", autorun);
