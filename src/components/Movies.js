import useFetchMovies from "../useFetchMovies";
import Spinner from "../Spinner";
import Table from "./Table";
import Error from "./Error";

function Movies() {
  const { movies, loading, error } = useFetchMovies();

  if (loading) return <Spinner />;
  if (error) return <Error message={error} />;

  return (
    <div className="movies">
      <Table showActionColumn={false} movies={movies} />
    </div>
  );
}

export default Movies;
