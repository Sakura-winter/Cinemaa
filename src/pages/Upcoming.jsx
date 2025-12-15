import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUpcomingMovies } from '../store/slices/moviesSlice'
import MovieGrid from '../components/MovieGrid'
import './Page.css'

const Upcoming = () => {
  const dispatch = useDispatch()
  const { upcoming } = useSelector((state) => state.movies)
  const [page, setPage] = useState(1)

  useEffect(() => {
    dispatch(fetchUpcomingMovies(page))
  }, [dispatch, page])

  const handleLoadMore = () => {
    if (page < upcoming.totalPages) {
      setPage(page + 1)
    }
  }

  return (
    <div className="page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Upcoming Movies</h1>
          <p className="page-subtitle">Coming soon to theaters</p>
        </div>
        <MovieGrid
          movies={upcoming.movies}
          loading={upcoming.loading}
          error={upcoming.error}
        />
        {!upcoming.loading && page < upcoming.totalPages && (
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

export default Upcoming

