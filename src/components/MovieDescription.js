import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Narvbar from './Navbar';
import notImage from '../assets/image-not-found.jpeg';

const MovieDescription = () => {
  const location = useLocation();
  const [movieId, setMovieId] = useState(location.state && location.state.id);
  const [movieDetails, setMovieDetails] = useState({}); // Estado para almacenar los detalles de la película

  const isImageValid = movieDetails.movieImage && movieDetails.movieImage !== 'https://image.tmdb.org/t/p/w500null';

  useEffect(() => {
    setMovieId(location.state && location.state.id);

    // Realizar la solicitud para obtener los detalles de la película
    if (movieId) {
      fetch(`http://localhost:4000/getMovieDetails?movieId=${movieId}`)
        .then((response) => response.json())
        .then((data) => {
          // Almacenar los detalles de la película en el estado
          setMovieDetails(data);
        })
        .catch((error) => {
          console.error('Error al obtener los detalles de la película:', error);
        });
    }
  }, [location.state, movieId]);

  return (
    <div>
      <Narvbar />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '50vh',
          marginBottom: '20px',
        }}
      >
        <Card
          sx={{
            maxWidth: 345,
            background: 'black',
            color: 'white',
          }}
        >
          <CardMedia
            component="img"
            sx={{
              width: '100%',
            }}
            image={isImageValid ? movieDetails.movieImage : notImage}
            title="movie"
          />
          <CardContent>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={6}>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  sx={{ color: 'white', fontSize: '25px' }}
                >
                  {movieDetails.title} {/* Utiliza el título de los detalles de la película */}
                </Typography>
              </Grid>
              <Grid item xs={6} style={{ textAlign: 'right' }}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ color: 'white', fontSize: '18px' }}
                >
                  {movieDetails.duration} min {/* Utiliza la duración de los detalles de la película */}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                {/* Validar si existe una descripción */}
                {movieDetails.description ? (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ color: 'white', textAlign: 'justify', fontSize: '16px' }}
                  >
                    {movieDetails.description}
                  </Typography>
                ) : (
                  // Si no existe una descripción, mostrar "No description available"
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ color: 'white', textAlign: 'justify', fontSize: '16px' }}
                  >
                    No description available
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ color: 'white', textAlign: 'justify', fontSize: '16px' }}
                >
                  Genres: {movieDetails.genres ? movieDetails.genres.join(', ') : 'N/A'} {/* Utiliza los géneros de los detalles de la película */}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ color: 'white', textAlign: 'justify', fontSize: '16px' }}
                >
                  Rating: {movieDetails.averageRating} {/* Utiliza la calificación media de los detalles de la película */}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MovieDescription;
