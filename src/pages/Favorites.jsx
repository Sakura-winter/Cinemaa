import { useSelector } from 'react-redux'
import MovieGrid from '../components/MovieGrid'
import './Page.css'

const Favorites = () => {
  const { movies } = useSelector((state) => state.favorites)

  return (
    <div className="page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">My Favorites</h1>
          <p className="page-subtitle">
            {movies.length > 0
              ? `You have ${movies.length} favorite ${movies.length === 1 ? 'movie' : 'movies'}`
              : 'No favorites yet. Add movies to your favorites list!'}
          </p>
        </div>
        {movies.length > 0 ? (
          <MovieGrid movies={movies} loading={false} error={null} />
        ) : (
          <div className="empty-state">
            <p>Start exploring and add movies to your favorites!</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Favorites

