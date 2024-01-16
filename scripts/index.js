async function fetchhMovies(searchQuery = "") {
  const apiUrl = searchQuery
    ? `https://yts.mx/api/v2/list_movies.json?query_term=${encodeURIComponent(
        searchQuery
      )}`
    : "https://yts.mx/api/v2/list_movies.json";
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const movieData = await response.json();
    console.log(movieData, "search");
    displayMovies(movieData.data.movies);
    return movieData.data.movies;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

function searchMovies() {
  const searchInput = document.getElementById("quick_search").value;
  console.log(searchInput);
  fetchhMovies(searchInput);
}

function movieDetail(movieId = "") {
  window.location.href = `detail.html?movie_id=${movieId}`;
  console.log(movieId);
}

function showMovies(movies) {
  console.log(movies, "movie");
  return movies.map(
    (movie) => `
    <div class="movie_cards">
          <img src="${movie.medium_cover_image}"/>
          <div id="movie_title">${movie.title}</div>
          <div class="movie_detail">
            <i class="fa-solid fa-star"></i>
            <p class="rating">${movie.rating}/10</p>
            <p class="category">${movie.genres.join(",")}</p>
            <button class="view_details" id="details" onclick="movieDetail(${
              movie.id
            })">View Details</button>
          </div>
        </div>`
  );
}

function displayMovies(movies) {
  const movieContainer = document.querySelector(".movies_box");
  const htmlArray = showMovies(movies);
  movieContainer.innerHTML = htmlArray.join("");
}

async function movieLoader() {
  try {
    const movies = await fetchhMovies();
    displayMovies(movies);
  } catch (error) {
    console.error(error);
  }
}

movieLoader();
