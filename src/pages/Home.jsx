import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPopularMovies } from '../store/slices/moviesSlice'
import MovieGrid from '../components/MovieGrid'
import './Home.css'

const Home = () => {
  const dispatch = useDispatch()
  const { popular } = useSelector((state) => state.movies)

  useEffect(() => {
    if (popular.movies.length === 0) {
      dispatch(fetchPopularMovies(1))
    }
  }, [dispatch, popular.movies.length])

  return (
    <div className="page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">
            Welcome to <span className="highlight">Cinemaa</span>
          </h1>
          <p className="page-subtitle">Discover the best movies and shows</p>
        </div>
        <section className="section">
          <h2 className="section-title">Popular Movies</h2>
          <MovieGrid
            movies={popular.movies}
            loading={popular.loading}
            error={popular.error}
          />
        </section>
      </div>
    </div>
  )
}

export default Home

