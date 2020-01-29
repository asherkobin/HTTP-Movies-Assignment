import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
import { useHistory, useParams } from "react-router-dom";

const Movie = (props) => {
  const [movie, setMovie] = useState();
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => setMovie(res.data))
      .catch(err => console.log(err.response));
  }, [id]);

  const saveMovie = () => {
    props.addToSavedList(movie);
  };

  const editMovie = () => {
    history.push(`/update-movie/${movie.id}`);
  };

  const deleteMovie = () => {
    axios
      .delete(`http://localhost:5000/api/movies/${id}`)
      .then(res => history.push("/"))
      .catch(err => console.log(err.response));
  }

  return (
    !movie ? <div>Loading movie information...</div> :
    <div className="save-wrapper">
      <MovieCard movie={movie} />
      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
      <div className="edit-button" onClick={editMovie}>
        Edit
      </div>
      <div className="delete-button" onClick={deleteMovie}>
        Delete
      </div>
    </div>
    );
}

export default Movie;