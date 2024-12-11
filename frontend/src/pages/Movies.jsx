import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import api from "../api.js";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

const img_base_url = "https://image.tmdb.org/t/p/w300"; 

const Trending = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const token = localStorage.getItem("token"); 
        const response = await api.get("api/movies/", {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });

        console.log("Response Data:", response.data);
        setMovies(response.data.results); 
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchTrendingMovies();
  }, []);

  return (
    <>
      <NavBar />
      <div className="container mt-5" >
        <br/>
        <h2>Movies</h2>
        <div className="row">
          {movies.map((movie) => {
            const {
              id,
              name,
              original_title,
              release_date,
              poster_path,
              overview,
              genre_ids,
              media_type,
            } = movie;

            return (
              <div key={id} className="col-md-3 col-sm-4 py-3 d-flex justify-content-center">
                <Card style={{ width: "18rem" }}>
                  <Link to={`/moviedetails/${id}`}> 
                  <Card.Img
                    variant="top"
                    src={poster_path ? `${img_base_url}${poster_path}` : "path_to_unavailable_image"}
                    alt={original_title}
                  />
                </Link>
                  
                  <Card.Body>
                    <Card.Title>{original_title}</Card.Title>
                    <Card.Text>
                      <strong>{release_date}</strong> <br />
                      <strong>Genres:</strong> {genre_ids.join(', ')} {/* You can map the genre IDs to genre names */}
                      <br />
                    </Card.Text>
                  
                  </Card.Body>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Trending;
