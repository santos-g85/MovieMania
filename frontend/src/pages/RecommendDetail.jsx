import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";

const RecommenDetail = () => {
  const { id } = useParams();  // Get movie ID from URL params
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const selectedMovie = JSON.parse(localStorage.getItem("selectedMovie"));

    if (selectedMovie && selectedMovie.id === parseInt(id)) {
      setMovie(selectedMovie);  // Set the movie data if it matches the ID
    } else {
      console.error("Movie details not found or ID mismatch.");
    }
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;  // Show loading state while movie data is being fetched
  }

  const {
    original_title,
    release_date,
    poster_path,
    overview,
    genres,
  } = movie;

  return (
    <div className="container mt-5">
      <Card className="mb-3">
        <Card.Img
          variant="top"
          src={poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : "path_to_unavailable_image"}
          alt={original_title}
        />
        <Card.Body>
          <Card.Title>{original_title}</Card.Title>
          <Card.Text>
            <strong>Release Date:</strong> {release_date} <br />
            <strong>Genres:</strong> {genres && genres.map((genre) => genre.name).join(", ")} <br />
            <strong>Overview:</strong> {overview}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default RecommenDetail;
