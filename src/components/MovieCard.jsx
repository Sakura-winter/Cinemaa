import { Link } from 'react-router-dom'
import { tmdbApi } from '../services/tmdbApi'
import './MovieCard.css'

const MovieCard = ({ movie }) => {
  const imageUrl = tmdbApi.getImageUrl(movie.poster_path, 'w500')
  const rating = movie.vote_average?.toFixed(1) || 'N/A'

  return (
    <Link to={`/movie/${movie.id}`} className="movie-card">
      <div className="movie-card-image">
        <img src={imageUrl} alt={movie.title} loading="lazy" />
        <div className="movie-card-overlay">
          <div className="movie-rating">
            <span className="rating-icon">⭐</span>
            <span className="rating-value">{rating}</span>
          </div>
        </div>
      </div>
      <div className="movie-card-info">
        <h3 className="movie-card-title">{movie.title}</h3>
        <p className="movie-card-date">
          {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
        </p>
      </div>
    </Link>
  )
}

export default MovieCard

