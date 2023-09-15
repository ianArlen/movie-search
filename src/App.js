import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { SearchPage } from './components/SearchPage';
import SearchMovies from './components/SearchMovies';
import MovieDescription from './components/MovieDescription';


function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<SearchPage />} />
      <Route path="/search-movies" element={<SearchMovies />} />
      <Route path="/movie-description" element={<MovieDescription />} />
    </Routes>
  </Router>
  );
}

export default App;