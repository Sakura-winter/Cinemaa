import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPopularMovies } from '../store/slices/moviesSlice'
import MovieGrid from '../components/MovieGrid'
import './Page.css'

const Popular = () => {
  const dispatch = useDispatch()
  const { popular } = useSelector((state) => state.movies)
  const [page, setPage] = useState(1)

  useEffect(() => {
    dispatch(fetchPopularMovies(page))
  }, [dispatch, page])

  const handleLoadMore = () => {
    if (page < popular.totalPages) {
      setPage(page + 1)
    }
  }

  return (
    <div className="page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Popular Movies</h1>
          <p className="page-subtitle">Trending movies right now</p>
        </div>
        <MovieGrid
          movies={popular.movies}
          loading={popular.loading}
          error={popular.error}
        />
        {!popular.loading && page < popular.totalPages && (
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

export default Popular

