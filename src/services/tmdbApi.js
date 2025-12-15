import axios from 'axios'

const API_KEY = import.meta.env.VITE_TMDB_API_KEY || 'YOUR_API_KEY_HERE'
const BASE_URL = 'https://api.themoviedb.org/3'
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p'

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
})

export const tmdbApi = {
  // Get image URL
  getImageUrl: (path, size = 'w500') => {
    if (!path) return 'https://via.placeholder.com/500x750?text=No+Image'
    return `${IMAGE_BASE_URL}/${size}${path}`
  },

  // Get popular movies
  getPopularMovies: async (page = 1) => {
    const response = await api.get('/movie/popular', { params: { page } })
    return response.data
  },

  // Get top rated movies
  getTopRatedMovies: async (page = 1) => {
    const response = await api.get('/movie/top_rated', { params: { page } })
    return response.data
  },

  // Get upcoming movies
  getUpcomingMovies: async (page = 1) => {
    const response = await api.get('/movie/upcoming', { params: { page } })
    return response.data
  },

  // Get movie details
  getMovieDetails: async (movieId) => {
    const response = await api.get(`/movie/${movieId}`)
    return response.data
  },

  // Get movie credits
  getMovieCredits: async (movieId) => {
    const response = await api.get(`/movie/${movieId}/credits`)
    return response.data
  },

  // Get similar movies
  getSimilarMovies: async (movieId) => {
    const response = await api.get(`/movie/${movieId}/similar`)
    return response.data
  },

  // Get movie reviews
  getMovieReviews: async (movieId) => {
    const response = await api.get(`/movie/${movieId}/reviews`)
    return response.data
  },

  // Search movies
  searchMovies: async (query, page = 1) => {
    const response = await api.get('/search/movie', {
      params: { query, page },
    })
    return response.data
  },
}

