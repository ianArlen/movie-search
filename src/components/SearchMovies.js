import React, { useState, useEffect } from 'react';
import {useLocation} from 'react-router-dom';
import Navbar from './Navbar';
import ListMovies from './ListMovies';

const SearchMovies = () => {
  
  const location = useLocation();
  const [search, setSearch] = useState(location.state && location.state.search);

  useEffect(() => {
    setSearch(location.state && location.state.search);
  }, [location.state]);
  return (
    <div>
      <Navbar label={search} long={'100%'}/>
      <ListMovies search={search}/>
    </div>
  )
}

export default SearchMovies