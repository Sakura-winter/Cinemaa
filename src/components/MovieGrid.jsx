import MovieCard from './MovieCard'
import './MovieGrid.css'

const MovieGrid = ({ movies, loading, error }) => {
  if (loading) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
        <p>Loading movies...</p>
      </div>
    )
  }

  if (error) {
    return <div className="error">Error: {error}</div>
  }

  if (!movies || movies.length === 0) {
    return <div className="error">No movies found</div>
  }

  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  )
}

export default MovieGrid

