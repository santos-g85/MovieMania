import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import Movies from "./pages/Movies";
import TvSeries from './pages/TvSeries';
import Trending from './pages/Trending';
import MovieDetails from './pages/MovieDetails';
import Recommendation from './pages/Recommendation';

function Logout() {
  localStorage.clear()
  return <Navigate to="/login" />
}

function RegisterAndLogout() {
  localStorage.clear()
  return <Register />
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route
          path=""
          element={
            <ProtectedRoute>
              <Recommendation/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/recommendation"
          element={
            <ProtectedRoute>
              <Recommendation/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/trending"
          element={
            <ProtectedRoute>
             <Trending/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/moviesdetails/:id"
          element={
            <ProtectedRoute>
             <MovieDetails/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/movies"
          element={
            <ProtectedRoute>
             <Movies/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/tvseries"
          element={
            <ProtectedRoute>
             <TvSeries/>
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<RegisterAndLogout />} />
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App