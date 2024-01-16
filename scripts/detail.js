async function fetchMovieDetails(movieId) {
  const apiDetailUrl = `https://yts.mx/api/v2/movie_details.json?movie_id=${movieId}`;
  try {
    const response = await fetch(apiDetailUrl);
    if (!response.ok) {
      throw new Error(`Http error!!Status:${response.status}`);
    }
    const movieDetails = await response.json();
    console.log(movieDetails, "Details");
    displayMovieDetails(movieDetails.data.movie);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

function displayMovieDetails(movie) {
  const detailsContainer = document.querySelector(".details_container");
  detailsContainer.innerHTML = `
    <div class="row">
      <div class="col-xs-2 col-md-2">
        <img src="${movie.medium_cover_image}" />
      </div>
      <div class="col-xs-10 col-md-10">
        <div id="movie_title">${movie.title}</div>
        <div class="details">
          <p class="year">${movie.year}</p>
          <p class="category">${movie.genres.join(",")}</p>
          <p class="available">Available in:</p>
          <button class="subtitle">Download Subtitles</button>
          <div class="row">
            <div class="col-xs-1 col-md-1">
              <i class="fa-solid fa-heart"></i>
            </div>
            <div class="col-xs-1 col-md-1">
              <p id="likes_count">${movie.like_count}</p>
            </div>
          </div>
          <div class="row">
            <div class="col-xs-1 col-md-1">
              <img src="images/imdb.svg" />
            </div>
            <div class="col-xs-1 col-md-1">
              <p class="rating">${movie.rating}/10</p>
              <i class="fa-solid fa-star"></i>
            </div>
          </div>
        </div>
      </div>
      <div class="watch_down_btn">
        <button class="download_btn">Download</button>
        <button class="watch_btn">Watch Now</button>
      </div>
    </div>`;
}

function getMovieId() {
  const url = new URLSearchParams(window.location.search);
  return url.get("movie_id");
}

async function loadMovieDetails() {
  try {
    const movieId = getMovieId();
    if (movieId) {
      await fetchMovieDetails(movieId);
    } else {
      console.error("Movie not Found");
    }
  } catch (error) {
    console.error(error);
  }
}

loadMovieDetails();
