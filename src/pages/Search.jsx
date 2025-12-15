import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { searchMovies } from '../store/slices/searchSlice'
import MovieGrid from '../components/MovieGrid'
import './Page.css'

const Search = () => {
  const dispatch = useDispatch()
  const { query, results, loading, error, totalResults, page, totalPages } = useSelector(
    (state) => state.search
  )
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    if (query) {
      dispatch(searchMovies({ query, page: currentPage }))
    }
  }, [dispatch, query, currentPage])

  const handleLoadMore = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  if (!query) {
    return (
      <div className="page">
        <div className="container">
          <div className="page-header">
            <h1 className="page-title">Search Movies</h1>
            <p className="page-subtitle">Use the search bar to find movies</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Search Results</h1>
          <p className="page-subtitle">
            Found {totalResults} results for "{query}"
          </p>
        </div>
        <MovieGrid movies={results} loading={loading} error={error} />
        {!loading && currentPage < totalPages && (
          <div className="load-more-container">
            <button className="btn btn-primary" onClick={handleLoadMore}>
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Search

