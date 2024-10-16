import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import api from "../api.js";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import Pagination from "./Pagination"; 

const img_base_url = "https://image.tmdb.org/t/p/w300"; 

const Trending = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1); 
  const [totalPages, setTotalPages] = useState(1); 

  
  const fetchTrendingMovies = async () => {
    try {
      const token = localStorage.getItem("token"); 
      const response = await api.get(`api/trending/?page=${page}`, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      console.log("Response Data:", response.data);
      setMovies(response.data.results); 
      setTotalPages(response.data.total_pages); 
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  
  useEffect(() => {
    fetchTrendingMovies();
  }, [page]);

  
  const handlePrevious = () => {
    if (page > 1) {
      setPage(page - 1); 
    }
  };

  const handleNext = () => {
    if (page < totalPages) {
      setPage(page + 1); 
    }
  };

  return (
    <>
      <NavBar />
      <div className="container mt-5">
        <br />
        <h2>Today's Trending</h2>
        <div className="row">
          {movies.map((movie) => {
            const {
              id,
              original_name,
              original_title,
              first_air_date,
              release_date,
              poster_path,
              overview,
              genre_ids,
              media_type,
            } = movie;

            return (
              <div
                key={id}
                className="col-md-3 col-sm-4 py-3 d-flex justify-content-center"
              >
                <Card style={{ width: "18rem" }}>
                  <Link to={`/moviedetails/${id}`}>
                    <Card.Img
                      variant="top"
                      src={
                        poster_path
                          ? `${img_base_url}${poster_path}`
                          : "path_to_unavailable_image"
                      }
                      alt={original_title || original_name}
                    />
                  </Link>

                  <Card.Body>
                    <Card.Title>
                      {original_name || original_title}
                    </Card.Title>
                    <Card.Text>
                      <strong>{media_type}</strong>
                      <br />
                      <strong>Release:</strong>
                      {first_air_date || release_date}
                      <br />
                      <strong>Genres:</strong>{" "}
                      {genre_ids.join(", ")} 
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
            );
          })}
        </div>

      
        <Pagination
          page={page}
          totalPages={totalPages}
          handlePrevious={handlePrevious}
          handleNext={handleNext}
        />
      </div>
    </>
  );
};

export default Trending;
