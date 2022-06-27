import { useEffect, useState } from "react";
import { fetchMovies } from "./api/movies";

function useFetchMovies() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchMovies()
      .then((response) => setMovies(response))
      .catch((error) => setError(error))
      .then(() => setLoading(false));
  }, []);

  return { movies, error, loading };
}

export default useFetchMovies;
