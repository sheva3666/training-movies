import { useEffect, useState } from "react";
import { fetchFavourites } from "./api/movies";

function useFetchFavouriteMovies(forceRefresh) {
  const [favouriteMovies, setFavouriteMovies] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchFavourites()
      .then((response) => setFavouriteMovies(response))
      .catch((error) => setError(error))
      .then(() => setLoading(false));
  }, [forceRefresh]);

  return { favouriteMovies, error, loading };
}

export default useFetchFavouriteMovies;
