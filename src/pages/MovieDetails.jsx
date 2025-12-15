import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchMovieDetails,
  fetchMovieCredits,
  fetchSimilarMovies,
  fetchMovieReviews,
  clearCurrentMovie,
} from '../store/slices/moviesSlice'
import { addFavorite, removeFavorite } from '../store/slices/favoritesSlice'
import { tmdbApi } from '../services/tmdbApi'
import MovieCard from '../components/MovieCard'
import './MovieDetails.css'

const MovieDetails = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { currentMovie } = useSelector((state) => state.movies)
  const { movies: favorites } = useSelector((state) => state.favorites)

  const isFavorite = favorites.some((movie) => movie.id === parseInt(id))

  useEffect(() => {
    dispatch(fetchMovieDetails(id))
    dispatch(fetchMovieCredits(id))
    dispatch(fetchSimilarMovies(id))
    dispatch(fetchMovieReviews(id))

    return () => {
      dispatch(clearCurrentMovie())
    }
  }, [dispatch, id])

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      dispatch(removeFavorite(parseInt(id)))
    } else {
      dispatch(addFavorite(currentMovie.details))
    }
  }

  const { details, credits, similar, reviews, loading, error } = currentMovie

  if (loading) {
    return (
      <div className="page">
        <div className="loading">
          <div className="loading-spinner"></div>
          <p>Loading movie details...</p>
        </div>
      </div>
    )
  }

  if (error || !details) {
    return (
      <div className="page">
        <div className="error">Error loading movie details. Please try again.</div>
      </div>
    )
  }

  const backdropUrl = tmdbApi.getImageUrl(details.backdrop_path, 'w1280')
  const posterUrl = tmdbApi.getImageUrl(details.poster_path, 'w500')

  return (
    <div className="movie-details">
      <div
        className="movie-hero"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(10,10,15,0.95)), url(${backdropUrl})`,
        }}
      >
        <div className="container">
          <div className="movie-hero-content">
            <div className="movie-poster">
              <img src={posterUrl} alt={details.title} />
            </div>
            <div className="movie-info">
              <h1 className="movie-title">{details.title}</h1>
              <div className="movie-meta">
                <span className="movie-rating">
                  ⭐ {details.vote_average?.toFixed(1)} / 10
                </span>
                <span className="movie-year">
                  {new Date(details.release_date).getFullYear()}
                </span>
                <span className="movie-runtime">{details.runtime} min</span>
              </div>
              <div className="movie-genres">
                {details.genres?.map((genre) => (
                  <span key={genre.id} className="genre-tag">
                    {genre.name}
                  </span>
                ))}
              </div>
              <p className="movie-overview">{details.overview}</p>
              <div className="movie-actions">
                <button
                  className={`btn ${isFavorite ? 'btn-secondary' : 'btn-primary'}`}
                  onClick={handleFavoriteToggle}
                >
                  {isFavorite ? '❤️ Remove from Favorites' : '🤍 Add to Favorites'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        {credits && credits.cast && credits.cast.length > 0 && (
          <section className="movie-section">
            <h2 className="section-title">Cast</h2>
            <div className="cast-grid">
              {credits.cast.slice(0, 12).map((actor) => (
                <div key={actor.id} className="cast-card">
                  <img
                    src={tmdbApi.getImageUrl(actor.profile_path, 'w185')}
                    alt={actor.name}
                    className="cast-image"
                  />
                  <div className="cast-info">
                    <h4 className="cast-name">{actor.name}</h4>
                    <p className="cast-character">{actor.character}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {reviews && reviews.length > 0 && (
          <section className="movie-section">
            <h2 className="section-title">Reviews</h2>
            <div className="reviews-list">
              {reviews.slice(0, 5).map((review) => (
                <div key={review.id} className="review-card">
                  <div className="review-header">
                    <h4 className="review-author">{review.author}</h4>
                    <span className="review-rating">
                      ⭐ {review.author_details?.rating || 'N/A'}
                    </span>
                  </div>
                  <p className="review-content">{review.content}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {similar && similar.length > 0 && (
          <section className="movie-section">
            <h2 className="section-title">Similar Movies</h2>
            <div className="movie-grid">
              {similar.slice(0, 8).map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

export default MovieDetails

