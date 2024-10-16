import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import api from "../api.js";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

const img_base_url = "https://image.tmdb.org/t/p/w300"; // Base URL for images

const MovieDetails = () => {
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const token = localStorage.getItem("token"); // Get the JWT token
       
        const data1 = await api.get(`api/movies/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Add Authorization header
          },
        });

        console.log("Response Data:", data1.data);
    
        setMovies(data1.data.results); // Assuming response contains results array
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
    const fetchSeries = async () => {
        try {
          const token = localStorage.getItem("token"); // Get the JWT token
         
          const data1 = await api.get(`api/series/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`, // Add Authorization header
            },
          });
  
          console.log("Response Data:", data1.data);
      
          setMovies(data1.data.results); // Assuming response contains results array
        } catch (error) {
          console.error("Error fetching series:", error);
        }
      };

    fetchMovies();
    fetchSeries();
  }, []);

  return (
    <>
      <div className="container mt-5" >
        <div className="row">
          {movies.map((movie) => {
            const {
              id,
              name,
              first_air_date,
              poster_path,
              overview,
              genre_ids,
              media_type,
            } = movie;

            return (
              <div key={id} className="col-md-3 col-sm-4 py-3 d-flex justify-content-center">
                <Card style={{ width: "18rem" }}>
             
                  <Card.Img
                    variant="top"
                    src={poster_path ? `${img_base_url}${poster_path}` : "path_to_unavailable_image"}
                    alt={name}
                  />
                
                  
                  <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Card.Text>
                      <strong></strong> {media_type}<br />
                      <strong>First Air Date:</strong> {first_air_date}<br />
                      <strong>Genres:</strong> {genre_ids.join(', ')} {/* You can map the genre IDs to genre names */}
                      <br />
                      <strong>Overview:</strong> {overview}
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

export default MovieDetails;
