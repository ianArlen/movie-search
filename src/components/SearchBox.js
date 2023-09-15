import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import SearchIcon from '@mui/icons-material/Search';
import Grid from '@mui/material/Grid';
import { Box } from '@mui/system';
import axios from 'axios';

export const SearchBox = (props) => {
  const [inputValue, setInputValue] = useState('');
  const [movies, setMovies] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [fieldEmpty, setFieldEmpty] = useState(true);
  const [showLabel, setShowLabel] = useState(true);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (userInput.trim() !== '') {
      const apiUrl = 'http://localhost:4000/searchMovies';
      axios
        .get(apiUrl, {
          params: {
            title: userInput,
          },
        })
        .then((response) => {
          setMovies(response.data);
          if (response.data.length === 0) {
            // Agregar una opción inválida
            setMovies([{ title: 'Invalid Option' }, ...response.data]);
          }
        })
        .catch((error) => {
          console.error('Error fetching películas:', error);
        });
      setShowLabel(false);
    } else {
      setMovies([]);
    }
  }, [inputValue, userInput]);

  const handleEnter = () => {
    if (0 < movies.length) {
      if (userInput === 'undefined') setInputValue('Search your movie');
      else setInputValue(userInput);
      navigate('/search-movies', { state: { search: inputValue } });
      setShowLabel(false);
    } else {
      setMessage('');
      setInputValue('');
      setFieldEmpty(true);
    }
  };

  const handleAutocompleteSelect = (event, value) => {
    if (event.key === 'Enter') {
      if (typeof value === 'string' && value.trim() !== '' && movies.length !== 0) {
        setInputValue(value);
        navigate('/search-movies', { state: { search: inputValue } });
        setFieldEmpty(false);
      } else {
        setMessage('');
        setUserInput('');
        setFieldEmpty(true);
      }
    }
  };

  return (
    <Stack>
      <Grid container alignItems="center" spacing={1}>
        <Grid item xs={2}>
          <SearchIcon
            style={{ color: 'white', cursor: 'pointer', marginLeft: '130%' }}
            onClick={handleEnter}
          />
        </Grid>
        <Grid item xs={10}>
          <Autocomplete
            id="nba_player_demo"
            freeSolo
            getOptionLabel={(option) => `${option.title}`}
            options={movies}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
              setUserInput(newInputValue.trim());
            }}
            filterOptions={(options, state) => {
              if (/^[0-9a-zA-Z]+$/.test(state.inputValue)) {
                return options.filter((option) =>
                  option.title.toLowerCase().includes(state.inputValue.toLowerCase())
                );
              }
              return [];
            }}
            noOptionsText={'Write an existing movie'}
            renderOption={(props, option) => (
              <Box component="li" {...props} key={option.movieId}>
                {option.first_name} {option.title}
              </Box>
            )}
            onChange={handleAutocompleteSelect}
            renderInput={(params) => (
              <TextField
                {...params}
                sx={{
                  width: props.long,
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'white',
                    },
                    '&:hover fieldset': {
                      borderColor: 'white',
                    },
                    '&:focus-within fieldset': {
                      borderColor: 'white',
                    },
                  },
                  '& label': {
                    color: 'white',
                    size: '7px',
                    marginLeft: '15%', // Pequeño margen para separar el icono
                  },
                  '& input': {
                    color: 'white',
                    caretColor: 'white',
                    marginLeft: '40px',
                  },
                  '& .MuiInputLabel-root': {
                    color: 'white',
                  },
                }}
                InputLabelProps={{
                  style: { color: '#fff' },
                  shrink: false,
                }}
                label={showLabel && fieldEmpty ? (props.label || 'Search your movie') : message}
                onKeyPress={(event) => {
                  if (event.key === 'Enter') {
                    handleEnter();
                  }
                }}
              />
            )}
          />
        </Grid>
      </Grid>
    </Stack>
  );
};
