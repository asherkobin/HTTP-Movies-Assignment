import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";

const UpdateMovie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState();
  const history = useHistory();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => setMovie(res.data))
      .catch(err => console.log(err.response));
  }, [id]);

  const handleSave = () => {
    if (!Array.isArray(movie.stars)) {
      movie.stars = movie.stars.split(",");
    }
    axios
      .put(`http://localhost:5000/api/movies/${id}`, movie)
      .then(res => history.push("/"))
      .catch(err => console.log(err.response));
  };

  const handleCancel = () => {
    history.goBack();
  }
  
  const handleChanges = e => {
    setMovie({
      ...movie,
      [e.target.name]: e.target.value
    });
  };
  
  return (
    !movie ? <div>...</div> :
      <div style={{ display: "grid", border: "1px solid black", width: "400px", marginLeft: "auto", marginRight: "auto", gridAutoColumns: "50%", padding: "5px", backgroundColor: "lightskyblue" }}>
        <label style={{ gridColumn: "1", gridRow: "1", textAlign: "right", marginRight: "5px" }} htmlFor="title">Title:</label>
        <input style={{ gridColumn: "2", gridRow: "1" }} type="text" id="title" name="title" value={movie.title} onChange={handleChanges} />

        <label style={{ gridColumn: "1", gridRow: "2", textAlign: "right", marginRight: "5px" }} htmlFor="director">Director:</label>
        <input style={{ gridColumn: "2", gridRow: "2" }} type="text" id="director" name="director" value={movie.director} onChange={handleChanges} />

        <label style={{ gridColumn: "1", gridRow: "3", textAlign: "right", marginRight: "5px" }} htmlFor="metascore">Metascore:</label>
        <input style={{ gridColumn: "2", gridRow: "3" }} type="text" id="metascore" name="metascore" value={movie.metascore} onChange={handleChanges} />
        
        <label style={{ gridColumn: "1", gridRow: "4", textAlign: "right", marginRight: "5px" }} htmlFor="stars">Stars (Comma-Separated):</label>
        <input style={{ gridColumn: "2", gridRow: "4" }} type="text" id="stars" name="stars" value={movie.stars} onChange={handleChanges} />  
        
        <div style={{ gridColumn: "1 / 3", gridRow: "5", textAlign: "right" }}>
          <button onClick={handleSave}>Save Changes</button>
          <button onClick={handleCancel} style={{ marginLeft: "2px" }}>Cancel</button>
        </div>
      </div>
  )
};

export default UpdateMovie;