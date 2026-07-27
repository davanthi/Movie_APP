import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar.jsx";
import { getAllMovies } from "../Calls/movieCalls.js";
import MovieCard from "../components/MovieCard";
import "./Home.css";
import { Typography, Row, Col, Empty } from "antd";
const { Title } = Typography;

function Home() {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const movies = await getAllMovies();
        setMovies(movies.data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        console.log("");
      }
    })();
  }, []);

  return (
    <div className="home-page">
      <div className="home-container">
        <div className="home-header">
          <Title level={1} className="home-title">
            Now Showing
          </Title>
          <p className="home-subtitle">Discover your next favorite movie</p>
        </div>
      </div>
      <Navbar />
      {movies && movies.length > 0 ? (
        <Row gutter={[24, 24]} className="movies-grid">
          {movies.map((movieObj, index) => (
            <Col xs={24} sm={12} md={8} lg={6} xl={6} key={index}>
              <MovieCard
                title={movieObj.title}
                posterUrl={movieObj.posterPath}
                language={movieObj.language}
                rating={movieObj.ratings}
                genre={movieObj.genre}
              />
            </Col>
          ))}
        </Row>
      ) : (
        <Empty description="No movies available" style={{ margin: "60px 0" }} />
      )}
    </div>
  );
}

export default Home;
