import React, { useEffect, useState } from "react";
import axios from "axios";
import AppPagination from './AppPagination';

const ListMovies = (props) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/searchMovies?title=${props.search}`)
      .then((response) => {
        setMovies(response.data);
      })
      .catch((error) => {
        console.error("Error al cargar las películas", error);
      });
  }, [props.search]);

  return (
    <div className="parentContainer"> {/* Agrega la clase parentContainer aquí */}
      <AppPagination movies={movies} />
    </div>
  );
};

export default ListMovies;
