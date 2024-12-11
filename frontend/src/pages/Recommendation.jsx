import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Form, FormControl, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import api from "../api";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

const Recommendation = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [recommendations, setRecommendations] = useState(
    JSON.parse(localStorage.getItem("recommendations")) || []
  );

  // Update localStorage whenever recommendations change
  useEffect(() => {
    if (recommendations.length > 0) {
      localStorage.setItem("recommendations", JSON.stringify(recommendations));
    }
  }, [recommendations]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  const handleSearch = async (e) => {
    e.preventDefault(); 

    try {
      const response = await api.get(`api/recommend/?movie=${searchTerm}`);
      if (response.data.recommendations && response.data.recommendations.length > 0) {
        setRecommendations(response.data.recommendations);
      } else {
        console.log("No recommendations found.");
        setRecommendations([]); 
      }
    } catch (error) {
      console.error("Error fetching movie recommendations:", error);
      setRecommendations([]); 
    }
  };

  const handleMovieClick = (movie) => {
    localStorage.setItem("selectedMovie", JSON.stringify(movie));
  };
  

  return (
    <>
      <NavBar />
      <br />
      <div className="container mt-5 d-flex flex-column align-items-center">
        <h2 className="text-center">Search Recommendation</h2>
        <Form className="d-flex w-75 mb-4" onSubmit={handleSearch}>
          <Row className="w-100">
            <Col xs={9}>
              <FormControl
                type="search"
                placeholder="Search Movies"
                className="me-2"
                value={searchTerm}
                onChange={handleInputChange}
              />
            </Col>
            <Col xs="auto">
              <Button type="submit" variant="light">
                <i className="bi bi-search"></i>
              </Button>
            </Col>
          </Row>
        </Form>

        {recommendations.length > 0 ? (
          <div className="mt-4">
            <div className="row">
              {recommendations.map((movie) => (
                <div
                  key={movie.movie_id}
                  className="col-md-3 col-sm-4 py-3 d-flex justify-content-center"
                >
                  <Card style={{ width: "18rem" }}>
                    <Link to={`/recommenddetails/${movie.movie_id}`} onClick={() => handleMovieClick(movie)}>
                      <Card.Img
                        variant="top"
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                      />
                    </Link>
                    <Card.Body>
                      <Card.Title>{movie.title}</Card.Title>
                      <Card.Text>
                        <strong>Released:</strong> {movie.release_date}
                        <br />
                        <strong>Ratings:</strong> {movie.popularity}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-4">No recommendations found.</div>
        )}
      </div>
    </>
  );
};

export default Recommendation;
