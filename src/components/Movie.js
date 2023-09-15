import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import notImage from '../assets/image-not-found.jpeg';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    backgroundColor: 'black',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  media: {
    marginLeft: '0px',
    height: 250,
    width: '55%',
    objectFit: 'cover',
  },
  typography: {
    fontSize: 12,
  },
  title: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
  },
  releaseYear: {
    fontSize: 12,
    color: 'white',
    textAlign: 'center',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '10px',
  },
  button: {
    fontSize: 10,
    padding: '6px 12px',
  },
}));

export default function Movie({ movie: { movieId, title, releaseYear, movieImage } }) {
  const classes = useStyles();

  const isImageValid = movieImage && movieImage !== 'https://image.tmdb.org/t/p/w500null';
  
  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (movieId !== undefined && movieId !== null) {
      console.log(movieId);
      navigate('/movie-description', { state: { id: movieId } });
    }
  };

  return (
    <Card className={classes.root}>
      {isImageValid ? (
        <CardMedia className={classes.media} image={movieImage} title={title} />
      ) : (
        <CardMedia className={classes.media} image={notImage} title={title} />
      )}
      <CardContent>
        <Typography className={classes.title} variant="h5">
          {title}
        </Typography>
        <Typography className={classes.releaseYear} variant="body2" color="textSecondary">
          Release Year: {releaseYear}
        </Typography>
        <div className={classes.buttonContainer}>
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={handleButtonClick}
          >
            Descripcion
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
