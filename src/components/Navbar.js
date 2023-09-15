import React from 'react';
import Grid from '@mui/material/Grid';
import volindo from '../assets/volindo.jpeg';
import './Navbar.css';
import { SearchBox } from './SearchBox';

const Narvbar = (props) => {
  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid item xs={6} sm={4}>
      <img src={volindo} alt="volindo" className="logo-image-navbar"/>
      </Grid>
      <Grid item xs={6} sm={4}>
        <SearchBox label={props.label} long={props.long}/>
      </Grid>
    </Grid>
  )
}

export default Narvbar