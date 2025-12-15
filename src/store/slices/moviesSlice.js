import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { tmdbApi } from '../../services/tmdbApi'

export const fetchPopularMovies = createAsyncThunk(
  'movies/fetchPopular',
  async (page = 1) => {
    const response = await tmdbApi.getPopularMovies(page)
    return response
  }
)

export const fetchTopRatedMovies = createAsyncThunk(
  'movies/fetchTopRated',
  async (page = 1) => {
    const response = await tmdbApi.getTopRatedMovies(page)
    return response
  }
)

export const fetchUpcomingMovies = createAsyncThunk(
  'movies/fetchUpcoming',
  async (page = 1) => {
    const response = await tmdbApi.getUpcomingMovies(page)
    return response
  }
)

export const fetchMovieDetails = createAsyncThunk(
  'movies/fetchDetails',
  async (movieId) => {
    const response = await tmdbApi.getMovieDetails(movieId)
    return response
  }
)

export const fetchMovieCredits = createAsyncThunk(
  'movies/fetchCredits',
  async (movieId) => {
    const response = await tmdbApi.getMovieCredits(movieId)
    return response
  }
)

export const fetchSimilarMovies = createAsyncThunk(
  'movies/fetchSimilar',
  async (movieId) => {
    const response = await tmdbApi.getSimilarMovies(movieId)
    return response
  }
)

export const fetchMovieReviews = createAsyncThunk(
  'movies/fetchReviews',
  async (movieId) => {
    const response = await tmdbApi.getMovieReviews(movieId)
    return response
  }
)

const initialState = {
  popular: {
    movies: [],
    page: 1,
    totalPages: 1,
    loading: false,
    error: null,
  },
  topRated: {
    movies: [],
    page: 1,
    totalPages: 1,
    loading: false,
    error: null,
  },
  upcoming: {
    movies: [],
    page: 1,
    totalPages: 1,
    loading: false,
    error: null,
  },
  currentMovie: {
    details: null,
    credits: null,
    similar: [],
    reviews: [],
    loading: false,
    error: null,
  },
}

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    clearCurrentMovie: (state) => {
      state.currentMovie = initialState.currentMovie
    },
  },
  extraReducers: (builder) => {
    // Popular Movies
    builder
      .addCase(fetchPopularMovies.pending, (state) => {
        state.popular.loading = true
        state.popular.error = null
      })
      .addCase(fetchPopularMovies.fulfilled, (state, action) => {
        state.popular.loading = false
        state.popular.movies = action.payload.results
        state.popular.page = action.payload.page
        state.popular.totalPages = action.payload.total_pages
      })
      .addCase(fetchPopularMovies.rejected, (state, action) => {
        state.popular.loading = false
        state.popular.error = action.error.message
      })

    // Top Rated Movies
    builder
      .addCase(fetchTopRatedMovies.pending, (state) => {
        state.topRated.loading = true
        state.topRated.error = null
      })
      .addCase(fetchTopRatedMovies.fulfilled, (state, action) => {
        state.topRated.loading = false
        state.topRated.movies = action.payload.results
        state.topRated.page = action.payload.page
        state.topRated.totalPages = action.payload.total_pages
      })
      .addCase(fetchTopRatedMovies.rejected, (state, action) => {
        state.topRated.loading = false
        state.topRated.error = action.error.message
      })

    // Upcoming Movies
    builder
      .addCase(fetchUpcomingMovies.pending, (state) => {
        state.upcoming.loading = true
        state.upcoming.error = null
      })
      .addCase(fetchUpcomingMovies.fulfilled, (state, action) => {
        state.upcoming.loading = false
        state.upcoming.movies = action.payload.results
        state.upcoming.page = action.payload.page
        state.upcoming.totalPages = action.payload.total_pages
      })
      .addCase(fetchUpcomingMovies.rejected, (state, action) => {
        state.upcoming.loading = false
        state.upcoming.error = action.error.message
      })

    // Movie Details
    builder
      .addCase(fetchMovieDetails.pending, (state) => {
        state.currentMovie.loading = true
        state.currentMovie.error = null
      })
      .addCase(fetchMovieDetails.fulfilled, (state, action) => {
        state.currentMovie.loading = false
        state.currentMovie.details = action.payload
      })
      .addCase(fetchMovieDetails.rejected, (state, action) => {
        state.currentMovie.loading = false
        state.currentMovie.error = action.error.message
      })

    // Movie Credits
    builder
      .addCase(fetchMovieCredits.fulfilled, (state, action) => {
        state.currentMovie.credits = action.payload
      })

    // Similar Movies
    builder
      .addCase(fetchSimilarMovies.fulfilled, (state, action) => {
        state.currentMovie.similar = action.payload.results || []
      })

    // Movie Reviews
    builder
      .addCase(fetchMovieReviews.fulfilled, (state, action) => {
        state.currentMovie.reviews = action.payload.results || []
      })
  },
})

export const { clearCurrentMovie } = moviesSlice.actions
export default moviesSlice.reducer

