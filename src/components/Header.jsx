import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setQuery, searchMovies } from '../store/slices/searchSlice'
import './Header.css'

const Header = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      dispatch(setQuery(searchTerm))
      dispatch(searchMovies({ query: searchTerm, page: 1 }))
      navigate('/search')
      setSearchTerm('')
    }
  }

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            <span className="logo-text">Cinemaa</span>
            <span className="logo-glow"></span>
          </Link>

          <nav className="nav">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/popular" className="nav-link">Popular</Link>
            <Link to="/top-rated" className="nav-link">Top Rated</Link>
            <Link to="/upcoming" className="nav-link">Upcoming</Link>
            <Link to="/favorites" className="nav-link">Favorites</Link>
          </nav>

          <form className="search-form" onSubmit={handleSearch}>
            <input
              type="text"
              className="search-input"
              placeholder="Search movies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="search-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
            </button>
          </form>
        </div>
      </div>
    </header>
  )
}

export default Header

