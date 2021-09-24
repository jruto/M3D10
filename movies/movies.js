const _URL = "https://api.themoviedb.org/3/"
const _APIKEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTRiMmJmYTRiYjUzZDAwMTViMTlmYjYiLCJpYXQiOjE2MzI0ODg4MjgsImV4cCI6MTYzMzY5ODQyOH0.ZGMgkeUjh3FVJc8Y1IRKZ0KyZvBrktn99lGhq0QPxmM"

const moviesGrid = document.getElementById("movies-grid")
const searchInput = document.getElementById("search-input")
const searchBtn = document.getElementById("search-btn")

window.onload = async () => {
  // Render Top Rated Section
  // 1 Fetch movies array
  // const topRatedMoviesArr = await fetchMovies("top_rated")
  // console.log(topRatedMoviesArr)
  // // 2 Render movies on page
  // renderMovies(topRatedMoviesArr, "Top Rated")

  // // Render Popular Section
  // // 1 Fetch movies array
  // const popularMoviesArr = await fetchMovies("popular")
  // console.log(popularMoviesArr)
  // // 2 Render movies on page
  // renderMovies(popularMoviesArr, "Popular")

  renderMovies(await fetchMovies("popular"), "Popular")
  renderMovies(await fetchMovies("top_rated"), "Top Rated")
  renderMovies(await fetchMovies("now_playing"), "Now Playing")
  renderMovies(await fetchMovies("upcoming"), "Upcoming")

  // renderMovie(await fetchMovies("latest"), "Latest")

  searchBtn.addEventListener("click", searchMovies)
}

const fetchMovies = async (list, query = "") => {
  try {
    const response = await fetch(_URL + (!query ? `movie/${list}` : `search/movie?query=${query}`), {
      headers: {
        Authorization: "Bearer " + _APIKEY,
      },
    })

    const data = await response.json()
    console.log(data)
    return list === "latest" ? data : data.results
  } catch (error) {
    console.log(error)
  }
}

const renderMovies = (moviesArr, sectionTitle) => {
  moviesGrid.innerHTML += `
  <h4 class="text-light mt-4">${sectionTitle}</h4>
  `
  const moviesCol = document.createElement("div")
  moviesCol.classList.add("col-12", "d-flex", "overflow-scroll")

  moviesArr.forEach(movie => {
    moviesCol.innerHTML += `
        <div class="d-flex flex-column movie-card mx-2">
          <div class="position-relative">
            <a href="#">
              <img src="https://image.tmdb.org/t/p/original${movie.poster_path}" class="img-fluid movie-img" alt="" />
              <span class="badge bg-warning text-dark position-absolute bottom-0 start-0 w-100 rounded-0 movie-name">${movie.title}</span>
            </a>
            <div class="badge bg-primary text-light position-absolute top-0 start-0 rounded-0"><i class="fas fa-star"></i>${movie.vote_average}</div>
          </div>
          <p class="text-light m-0 movie-desc">${movie.overview}</p>
        </div>
  `
  })
  // console.log(moviesCol)
  // moviesCol.innerHTML = moviesArr
  //   .map(
  //     movie => `
  //       <div class="d-flex flex-column movie-card mx-2">
  //         <div class="position-relative">
  //           <a href="#">
  //             <img src="https://image.tmdb.org/t/p/original${movie.poster_path}" class="img-fluid movie-img" alt="" />
  //             <span class="badge bg-warning text-dark position-absolute bottom-0 start-0 w-100 rounded-0 movie-name">${movie.title}</span>
  //           </a>
  //           <div class="badge bg-primary text-light position-absolute top-0 start-0 rounded-0"><i class="fas fa-star"></i>${movie.vote_average}</div>
  //         </div>
  //         <p class="text-light m-0 movie-desc">${movie.overview}</p>
  //       </div>
  // `
  //   )
  //   .join("")
  moviesGrid.appendChild(moviesCol)
}

// const renderMovie = (movieObj, section) => {
//   moviesGrid.innerHTML += `
//   <h4 class="text-light mt-4">${section}</h4>
//   <div class="d-flex flex-column movie-card mx-2">
//     <div class="position-relative">
//       <a href="#">
//         <img src="https://via.placeholder.com/400" class="img-fluid movie-img" alt="" />
//         <span class="badge bg-warning text-dark position-absolute bottom-0 start-0 w-100 rounded-0 movie-name">${movieObj.title}</span>
//       </a>
//       <div class="badge bg-primary text-light position-absolute top-0 start-0 rounded-0"><i class="fas fa-star"></i>${movieObj.vote_average}</div>
//     </div>
//     <p class="text-light m-0 movie-desc">${movieObj.overview}</p>
//   </div>
//   `
// }

const searchMovies = async () => {
  const query = searchInput.value
  console.log(query)
  if (query.length > 2) {
    const searchResults = await fetchMovies("", query)
    moviesGrid.innerHTML = ""
    renderMovies(searchResults, `Results for: ${query}`)
    console.log(searchResults)
  } else {
    moviesGrid.innerHTML = ""
    renderMovies(await fetchMovies("popular"), "Popular")
    renderMovies(await fetchMovies("top_rated"), "Top Rated")
    renderMovies(await fetchMovies("now_playing"), "Now Playing")
    renderMovies(await fetchMovies("upcoming"), "Upcoming")
  }
}
