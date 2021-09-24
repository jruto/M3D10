/*
POST Response:
category: "comedy"
createdAt: "2021-05-28T13:37:22.409Z"
description: "A top London cop is assigned to investigate a seemingly sleepy town, which suddenly starts to stir with a series of grisly \"accidents.\""
imageUrl: "https://occ-0-762-41.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABTSZYvA19KFoR3bJTDzORRbut-va9Fero3ZrUKbS2RSFRniZp7yoxRFHugmAZSNapwuuTRFu1STgw0c8hhhtfF77TXk.webp?r=15f"
name: "Hot Fuzz"
updatedAt: "2021-05-28T13:37:22.409Z"
userId: "60ae5964ceaf480015c91936"
__v: 0
_id: "60b0f212dc14580015e4afa6"
*/

const objModel = {
  name: "",
  description: "",
  category: "",
  imageUrl: "",
}
const _URL = "https://striveschool-api.herokuapp.com/api/movies/"
const _APIKEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTRiMmJmYTRiYjUzZDAwMTViMTlmYjYiLCJpYXQiOjE2MzI0ODg4MjgsImV4cCI6MTYzMzY5ODQyOH0.ZGMgkeUjh3FVJc8Y1IRKZ0KyZvBrktn99lGhq0QPxmM"

const searchParams = new URLSearchParams(window.location.search)
const queryMovieId = searchParams.get("movieId")
const queryMovieCategory = searchParams.get("movieCategory")
console.log(queryMovieId)
console.log(queryMovieCategory)

const deleteBtn = document.getElementById("delete-btn")
const submitBtn = document.getElementById("submit-btn")

window.onload = async () => {
  document.querySelector("h1").innerText = queryMovieId ? "Edit Movie" : "Add Movie"
  if (queryMovieId) {
    const selectedCategory = await getData(queryMovieCategory)
    const selectedMovie = selectedCategory.find(movie => movie._id === queryMovieId)

    deleteBtn.classList.remove("d-none")
    deleteBtn.addEventListener("click", () => {
      deleteData()
    })

    document.getElementById("movie-name").value = selectedMovie.name
    document.getElementById("movie-description").value = selectedMovie.description
    document.getElementById("movie-category").value = selectedMovie.category
    document.getElementById("movie-img-url").value = selectedMovie.imageUrl
  }
}

const getData = async (movieCategory = "") => {
  try {
    const response = await fetch(_URL + movieCategory, {
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

const postPutData = async (movieId = "", payload, method) => {
  try {
    const response = await fetch(_URL + movieId, {
      method,
      headers: {
        Authorization: "Bearer " + _APIKEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
    const data = await response.json()
    if (response.ok) {
      if (method === "POST") {
        displayInfoMessage(`Movie created successfully with ID: ${data._id}`, "success")
      } else {
        displayInfoMessage(`Movie with ID ${data._id} edited successfully`, "success")
      }
    } else {
      displayInfoMessage("Something went wrong", "danger")
    }
    return data
  } catch (error) {
    console.log(error)
  }
}

const deleteData = async () => {
  try {
    const response = await fetch(_URL + queryMovieId, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + _APIKEY,
      },
    })
    const data = await response.json()
    if (response.ok) {
      displayInfoMessage(`Movie with ID ${data._id} deleted successfully`, "success")
    } else {
      displayInfoMessage("Something went wrong", "danger")
    }
    return data
  } catch (error) {
    console.log(error)
  }
}

const submitData = async () => {
  const body = {
    name: document.getElementById("movie-name").value,
    description: document.getElementById("movie-description").value,
    category: document.getElementById("movie-category").value.toLowerCase(),
    imageUrl: document.getElementById("movie-img-url").value,
  }
  if (queryMovieId) {
    console.log(await postPutData(queryMovieId, body, "PUT"))
  } else {
    console.log(await postPutData("", body, "POST"))
  }
}
submitBtn.addEventListener("click", submitData)

const displayInfoMessage = (message, alertType) => {
  document.querySelector("body").innerHTML += `
      <div class="alert alert-${alertType} m-0" style="position: fixed; bottom: 10px; left: 10px" role="alert">
        ${message}
      </div>
    `
  setTimeout(() => {
    document.querySelector(".alert").remove()
  }, 4000)
}
