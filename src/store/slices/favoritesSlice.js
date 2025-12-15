import { createSlice } from '@reduxjs/toolkit'

const getInitialFavorites = () => {
  const stored = localStorage.getItem('cinemaa_favorites')
  return stored ? JSON.parse(stored) : []
}

const initialState = {
  movies: getInitialFavorites(),
}

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      const movie = action.payload
      const exists = state.movies.find((m) => m.id === movie.id)
      if (!exists) {
        state.movies.push(movie)
        localStorage.setItem('cinemaa_favorites', JSON.stringify(state.movies))
      }
    },
    removeFavorite: (state, action) => {
      state.movies = state.movies.filter((movie) => movie.id !== action.payload)
      localStorage.setItem('cinemaa_favorites', JSON.stringify(state.movies))
    },
    clearFavorites: (state) => {
      state.movies = []
      localStorage.removeItem('cinemaa_favorites')
    },
  },
})

export const { addFavorite, removeFavorite, clearFavorites } = favoritesSlice.actions
export default favoritesSlice.reducer

