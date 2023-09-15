import React from 'react';
import { Grid, Container, Paper } from '@mui/material';
import volindo from '../assets/volindo.jpeg';
import './SearchPage.css';
import { SearchBox } from './SearchBox';

export const SearchPage = () => {
  return (
    <Grid
      container
      alignItems="center" // Alinear verticalmente al centro
      justifyContent="center" // Alinear horizontalmente al centro
      sx={{ minHeight: '100vh' }}
    >
      <Grid item xs={12} sm={6} md={4}>
        <Container className="search-container">
          <Paper className="search-box" style={{ background: 'black' }}>
            <img src={volindo} alt="volindo" className="logo-image-search-page" />
            <SearchBox 
              label={'Search your movie '}
              long={'300px'}
            />
          </Paper>
        </Container>
      </Grid>
    </Grid>
  );
};
