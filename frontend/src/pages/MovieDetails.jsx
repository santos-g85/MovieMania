import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api.js";
import Card from "react-bootstrap/Card";

const img_base_url = "https://image.tmdb.org/t/p/w300";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await api.get(`api/movie_detail/${id}/`);
        setMovie(response.data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
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
          src={poster_path ? `${img_base_url}${poster_path}` : "path_to_unavailable_image"}
          alt={original_title}
        />
        <Card.Body>
          <Card.Title>{original_title}</Card.Title>
          <Card.Text>
            <strong>Release Date:</strong> {release_date} <br />
            <strong>Genres:</strong> {genres.map((genre) => genre.name).join(', ')} <br />
            <strong>Overview:</strong> {overview}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default MovieDetails;
