import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTopRatedMovies } from '../store/slices/moviesSlice'
import MovieGrid from '../components/MovieGrid'
import './Page.css'

const TopRated = () => {
  const dispatch = useDispatch()
  const { topRated } = useSelector((state) => state.movies)
  const [page, setPage] = useState(1)

  useEffect(() => {
    dispatch(fetchTopRatedMovies(page))
  }, [dispatch, page])

  const handleLoadMore = () => {
    if (page < topRated.totalPages) {
      setPage(page + 1)
    }
  }

  return (
    <div className="page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Top Rated Movies</h1>
          <p className="page-subtitle">Highest rated movies of all time</p>
        </div>
        <MovieGrid
          movies={topRated.movies}
          loading={topRated.loading}
          error={topRated.error}
        />
        {!topRated.loading && page < topRated.totalPages && (
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

export default TopRated

