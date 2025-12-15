import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { tmdbApi } from '../../services/tmdbApi'

export const searchMovies = createAsyncThunk(
  'search/movies',
  async ({ query, page = 1 }) => {
    const response = await tmdbApi.searchMovies(query, page)
    return response
  }
)

const initialState = {
  query: '',
  results: [],
  page: 1,
  totalPages: 1,
  totalResults: 0,
  loading: false,
  error: null,
}

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload
    },
    clearSearch: (state) => {
      state.query = ''
      state.results = []
      state.page = 1
      state.totalPages = 1
      state.totalResults = 0
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchMovies.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(searchMovies.fulfilled, (state, action) => {
        state.loading = false
        state.results = action.payload.results
        state.page = action.payload.page
        state.totalPages = action.payload.total_pages
        state.totalResults = action.payload.total_results
      })
      .addCase(searchMovies.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  },
})

export const { setQuery, clearSearch } = searchSlice.actions
export default searchSlice.reducer

