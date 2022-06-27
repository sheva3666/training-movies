import React, { useEffect, useRef, useState } from "react";
import useFetchMovies from "../useFetchMovies";
import Table from "./Table";
import useFetchFavouriteMovies from "../useFetchFavouriteMovies";
import { addFavourite } from "../api/movies";

function Modal({ onClose, isOpen }) {
  const modalWindowRef = useRef(null);

  const [message, setMessage] = useState("");
  const { movies } = useFetchMovies();
  const { favouriteMovies } = useFetchFavouriteMovies();

  useEffect(() => {
    if (modalWindowRef.current) {
      modalWindowRef.current.style.display = isOpen ? "block" : "none";
    }
  }, [isOpen, modalWindowRef]);

  const addMovie = async (movie) => {
    const favouriteMovie = favouriteMovies.find(
      (favouriteMovie) => favouriteMovie.id === movie.id
    );
    if (favouriteMovie === undefined) {
      await addFavourite(movie);
      onClose();
    } else {
      setMessage("This movie is already on the list");
    }
  };

  const onCancel = () => {
    setMessage("");
  };

  return (
    <div data-testid="modal" ref={modalWindowRef} className="modal">
      <div className="modal-content">
        {message.length > 0 ? (
          <div className="message">
            <h2 data-testid="message-text" className="message-text">
              {message}
            </h2>
            <button onClick={onCancel} className="btn">
              Cancel
            </button>
          </div>
        ) : (
          ""
        )}
        <Table
          showActionColumn={true}
          actionLabel="Add"
          onAction={addMovie}
          movies={movies}
        />
        <button data-testid="btn-close" className="btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

export default Modal;
