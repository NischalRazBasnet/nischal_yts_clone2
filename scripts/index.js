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
    return movieData.data.movies;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

function showMovies(movies) {
  return movies.map(
    (movie) => `
    <div class="movie_cards">
          <img src="${movie.medium_cover_image}"/>
          <div id="movie_title">${movie.title}</div>
          <div class="movie_detail">
            <i class="fa-solid fa-star"></i>
            <p calss="rating">${movie.rating}/10</p>
            <p class="category">${movie.genres.join(",")}</p>
            <a href="view.html" class="btn_view">View Details</a>
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
