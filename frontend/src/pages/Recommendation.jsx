import React, { useState } from "react";
import NavBar from "./NavBar";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Form, FormControl, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import api from "../api";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

const Recommendation = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [recommendations, setRecommendations] = useState([]);

  // Function to capitalize the first letter of each word
  /*const capitalizeFirstLetter = (str) => {
    return str
      .split(' ') // Split the string into words
      .map(word => word.charAt(0).toUpperCase() + word.slice(1)) 
      .join(' '); // Join the words back into a string
  };
*/
  // Function to handle input change
  const handleInputChange = (e) => {
    const value = e.target.value;
    //setSearchTerm(capitalizeFirstLetter(value));
    setSearchTerm(value);
  };

  // Function to handle form submission
  const handleSearch = async (e) => {
    e.preventDefault(); // Prevent the form from reloading the page

    try {
      const token = localStorage.getItem("token");
      const response = await api.get(`api/recommend/?movie=${searchTerm}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.time(response);

      console.log("Response Data:", response.data);
      setRecommendations(response.data.recommendations);
    } catch (error) {
      console.error("Error fetching movie recommendations:", error);
    }
  };

  return (
    <>
      <NavBar />
      <br />
      <div className="container mt-5 d-flex flex-column align-items-center">
        <h2 className="text-center">Search Recommendation</h2>
        <Form className="d-flex w-75 mb-4" onSubmit={handleSearch}>
          {" "}
          {/* Adjust width to 75% */}
          <Row className="w-100">
            <Col xs={9}>
              {" "}
              {/* Make the input field take 9 out of 12 columns */}
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

        {recommendations.length > 0 && (
          <div className="mt-4">
            <div className="row">
              {recommendations.map((movie) => (
                <div
                  key={movie.movie_id}
                  className="col-md-3 col-sm-4 py-3 d-flex justify-content-center"
                >
                  <Card style={{ width: "18rem" }}>
                    <Link to={`/moviedetails/${movie.movie_id}`}>
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
        )}
      </div>
    </>
  );
};

export default Recommendation;
