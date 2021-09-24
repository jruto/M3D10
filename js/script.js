const _URL = "https://striveschool-api.herokuapp.com/api/movies/"
const _APIKEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTRiMmJmYTRiYjUzZDAwMTViMTlmYjYiLCJpYXQiOjE2MzI0ODg4MjgsImV4cCI6MTYzMzY5ODQyOH0.ZGMgkeUjh3FVJc8Y1IRKZ0KyZvBrktn99lGhq0QPxmM"

const moviesGrid = document.getElementById("movies-grid")
const spinner = document.querySelector(".spinner-border")

window.onload = async () => {
  displayMovies(await fetchData())
}

const fetchData = async (category = "") => {
  try {
    const response = await fetch(_URL + category, {
      headers: {
        Authorization: "Bearer " + _APIKEY,
      },
    })
    const data = await response.json()

    return data
  } catch (error) {
    console.log(error)
  }
}

const displayMovies = categoriesArr => {
  console.log(categoriesArr.sort())
  categoriesArr.sort().forEach(async category => {
    const moviesArr = await fetchData(category)

    const genreTitle = document.createElement("h4")
    genreTitle.classList.add("text-light", "mt-4")
    genreTitle.innerText = category
    moviesGrid.appendChild(genreTitle)

    const moviesCol = document.createElement("div")
    moviesCol.classList.add("col-12", "d-flex", "overflow-scroll")

    moviesCol.innerHTML = moviesArr
      .map(
        movie => `
        <div class="d-flex flex-column movie-card mx-2">
          <div class="position-relative">
            <a href="#">
              <img src="${movie.imageUrl}" class="img-fluid movie-img" alt="" />
              <span class="badge bg-warning text-dark position-absolute bottom-0 start-0 w-100 rounded-0 movie-name">${movie.name}</span>
            </a>
            <a href="./backoffice/backoffice.html?movieId=${movie._id}&movieCategory=${movie.category}" class="badge bg-primary text-light position-absolute top-0 start-0 rounded-0">Admin</a>
          </div>
          <p class="text-light m-0 movie-desc">${movie.description}</p>
        </div>
    `
      )
      .join("")
    moviesGrid.appendChild(moviesCol)
    spinner.classList.add("d-none")
  })
}
