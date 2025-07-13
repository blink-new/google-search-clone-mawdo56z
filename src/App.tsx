import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import GoogleHomepage from './components/GoogleHomepage'
import SearchResults from './components/SearchResults'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GoogleHomepage />} />
        <Route path="/search" element={<SearchResults />} />
      </Routes>
    </Router>
  )
}

export default App