import { MoviesURL, FavouriteMoviesURL } from "../constants";

export const deleteMovie = async (id) => {
  await fetch(`${FavouriteMoviesURL}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-type": "aplication/json",
    },
  });
};

export const fetchFavourites = async () => {
  return fetch(FavouriteMoviesURL).then((response) => response.json());
};

export const fetchMovies = async () => {
  return fetch(MoviesURL).then((response) => response.json());
};

export const addFavourite = async (movie) => {
  await fetch(FavouriteMoviesURL, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(movie),
  });
};
