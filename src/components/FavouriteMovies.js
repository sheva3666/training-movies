import React, { useState } from "react";
import useFetchFavouriteMovies from "../useFetchFavouriteMovies";
import Spinner from "../Spinner";
import Table from "./Table";
import Modal from "./Modal";
import { deleteMovie } from "../api/movies";
import Error from "./Error";

function FavouriteMovies() {
  const [refreshCounter, setRefreshCounter] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { favouriteMovies, loading, error } =
    useFetchFavouriteMovies(refreshCounter);

  const onDelete = async (favouriteMovie) => {
    await deleteMovie(favouriteMovie.id);
    onClose();
  };

  const onClose = () => {
    setRefreshCounter(refreshCounter + 1);
    setIsModalOpen(false);
  };

  if (loading) return <Spinner />;
  if (error) return <Error message={error} />;

  return (
    <React.Fragment>
      <button
        data-testid="add"
        className="btn add-movie"
        onClick={() => setIsModalOpen(true)}
      >
        Add movie
      </button>
      <Modal isOpen={isModalOpen} onClose={onClose} />
      <div className="favorite-movies">
        <Table
          showActionColumn={true}
          onAction={onDelete}
          actionLabel="X"
          movies={favouriteMovies}
        />
      </div>
    </React.Fragment>
  );
}

export default FavouriteMovies;
