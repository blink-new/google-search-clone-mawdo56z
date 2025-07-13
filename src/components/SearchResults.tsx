import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { Search, Mic, Camera, Grid3X3, User, Settings, Clock, MapPin } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { blink } from '../blink/client'

interface SearchResult {
  title: string
  url: string
  snippet: string
  displayUrl: string
}

export default function SearchResults() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const query = searchParams.get('q') || ''
  const [searchQuery, setSearchQuery] = useState(query)
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const [searchTime, setSearchTime] = useState('')
  const [resultCount, setResultCount] = useState('')

  useEffect(() => {
    if (query) {
      performSearch(query)
    }
  }, [query])

  const performSearch = async (searchTerm: string) => {
    setLoading(true)
    const startTime = Date.now()
    
    try {
      // Use Blink's search functionality
      const searchResults = await blink.data.search(searchTerm, {
        limit: 10
      })
      
      const endTime = Date.now()
      const duration = ((endTime - startTime) / 1000).toFixed(2)
      setSearchTime(duration)
      
      // Transform the results to match our interface
      const transformedResults: SearchResult[] = searchResults.organic_results?.map((result: any) => ({
        title: result.title || 'Untitled',
        url: result.link || '#',
        snippet: result.snippet || 'No description available',
        displayUrl: result.displayed_link || result.link || '#'
      })) || []
      
      setResults(transformedResults)
      setResultCount(`About ${searchResults.organic_results?.length || 0} results`)
    } catch (error) {
      console.error('Search failed:', error)
      // Fallback to mock results
      setResults(generateMockResults(searchTerm))
      setResultCount('About 10 results')
      setSearchTime('0.45')
    } finally {
      setLoading(false)
    }
  }

  const generateMockResults = (searchTerm: string): SearchResult[] => {
    return [
      {
        title: `${searchTerm} - Wikipedia`,
        url: `https://en.wikipedia.org/wiki/${searchTerm.replace(' ', '_')}`,
        snippet: `${searchTerm} is a comprehensive topic with extensive information available. Learn about its history, significance, and related concepts in this detailed encyclopedia entry.`,
        displayUrl: 'en.wikipedia.org'
      },
      {
        title: `Official ${searchTerm} Website`,
        url: `https://www.${searchTerm.toLowerCase().replace(' ', '')}.com`,
        snippet: `The official website for ${searchTerm}. Find the latest news, updates, and official information directly from the source.`,
        displayUrl: `www.${searchTerm.toLowerCase().replace(' ', '')}.com`
      },
      {
        title: `${searchTerm} - Latest News and Updates`,
        url: `https://news.google.com/search?q=${searchTerm}`,
        snippet: `Stay up to date with the latest news and developments related to ${searchTerm}. Breaking news, analysis, and expert opinions.`,
        displayUrl: 'news.google.com'
      },
      {
        title: `${searchTerm} Guide: Everything You Need to Know`,
        url: `https://www.guide.com/${searchTerm.toLowerCase()}`,
        snippet: `A comprehensive guide covering everything about ${searchTerm}. Tips, tricks, best practices, and expert advice for beginners and professionals.`,
        displayUrl: 'www.guide.com'
      },
      {
        title: `${searchTerm} Reviews and Ratings`,
        url: `https://www.reviews.com/${searchTerm}`,
        snippet: `Read honest reviews and ratings for ${searchTerm}. Compare features, prices, and user experiences to make informed decisions.`,
        displayUrl: 'www.reviews.com'
      }
    ]
  }

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const handleLogoClick = () => {
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 px-6 py-3">
        <div className="flex items-center">
          {/* Google Logo */}
          <div className="mr-8 cursor-pointer" onClick={handleLogoClick}>
            <svg width="92" height="30" viewBox="0 0 272 92" className="text-[#4285F4]">
              <g fill="none" fillRule="evenodd">
                <path fill="#EA4335" d="M115.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18C71.25 34.32 81.24 25 93.5 25s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44S80.99 39.2 80.99 47.18c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z"/>
                <path fill="#FBBC05" d="M163.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18c0-12.85 9.99-22.18 22.25-22.18s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44s-12.51 5.46-12.51 13.44c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z"/>
                <path fill="#EA4335" d="M209.75 26.34v39.82c0 16.38-9.66 23.07-21.08 23.07-10.75 0-17.22-7.19-19.66-13.07l8.48-3.53c1.51 3.61 5.21 7.87 11.17 7.87 7.31 0 11.84-4.51 11.84-13v-3.19h-.34c-2.18 2.69-6.38 5.04-11.68 5.04-11.09 0-21.25-9.66-21.25-22.09 0-12.52 10.16-22.26 21.25-22.26 5.29 0 9.49 2.35 11.68 4.96h.34v-3.61h9.25zm-8.56 20.92c0-7.81-5.21-13.52-11.84-13.52-6.72 0-12.35 5.71-12.35 13.52 0 7.73 5.63 13.36 12.35 13.36 6.63 0 11.84-5.63 11.84-13.36z"/>
                <path fill="#34A853" d="M225 3v65h-9.5V3h9.5z"/>
                <path fill="#EA4335" d="M262.02 54.48l7.56 5.04c-2.44 3.61-8.32 9.83-18.48 9.83-12.6 0-22.01-9.74-22.01-22.18 0-13.19 9.49-22.18 20.92-22.18 11.51 0 17.14 9.16 18.98 14.11l1.01 2.52-29.65 12.28c2.27 4.45 5.8 6.72 10.75 6.72 4.96 0 8.4-2.44 10.92-6.14zm-23.27-7.98l19.82-8.23c-1.09-2.77-4.37-4.7-8.23-4.7-4.95 0-11.84 4.37-11.59 12.93z"/>
                <path fill="#FBBC05" d="M35.29 41.41V32H67c.31 1.64.47 3.58.47 5.68 0 7.06-1.93 15.79-8.15 22.01-6.05 6.3-13.78 9.66-24.02 9.66C16.32 69.35.36 53.89.36 34.91.36 15.93 16.32.47 35.3.47c10.5 0 17.98 4.12 23.6 9.49l-6.64 6.64c-4.03-3.78-9.49-6.72-16.97-6.72-13.86 0-24.7 11.17-24.7 25.03 0 13.86 10.84 25.03 24.7 25.03 8.99 0 14.11-3.61 17.39-6.89 2.66-2.66 4.41-6.46 5.1-11.65l-22.49.01z"/>
              </g>
            </svg>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl">
            <div className="relative">
              <div className="flex items-center border border-gray-300 rounded-full px-4 py-2 hover:shadow-md focus-within:shadow-md transition-shadow">
                <Search className="w-5 h-5 text-gray-400 mr-3" />
                <Input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1 border-none outline-none text-base bg-transparent"
                  placeholder=""
                />
                <div className="flex items-center space-x-3 ml-3">
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <Mic className="w-5 h-5 text-[#4285F4]" />
                  </button>
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <Camera className="w-5 h-5 text-[#4285F4]" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Navigation */}
          <div className="flex items-center space-x-4 ml-8">
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Settings className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Grid3X3 className="w-5 h-5 text-gray-600" />
            </button>
            <Button variant="default" className="bg-[#4285F4] hover:bg-[#3367D6] text-white px-6 py-2 rounded">
              Sign in
            </Button>
          </div>
        </div>

        {/* Search Navigation */}
        <div className="flex items-center space-x-8 mt-4 ml-[140px]">
          <button className="flex items-center space-x-2 text-[#4285F4] border-b-2 border-[#4285F4] pb-3">
            <Search className="w-4 h-4" />
            <span className="text-sm">All</span>
          </button>
          <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 pb-3">
            <span className="text-sm">Images</span>
          </button>
          <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 pb-3">
            <span className="text-sm">Videos</span>
          </button>
          <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 pb-3">
            <span className="text-sm">News</span>
          </button>
          <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 pb-3">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">Maps</span>
          </button>
          <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 pb-3">
            <span className="text-sm">More</span>
          </button>
        </div>
      </header>

      {/* Results */}
      <main className="px-6 py-4">
        <div className="max-w-2xl ml-[140px]">
          {/* Search Stats */}
          <div className="text-sm text-gray-600 mb-6">
            {resultCount} ({searchTime} seconds)
          </div>

          {/* Loading State */}
          {loading && (
            <div className="space-y-6">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-full mb-1"></div>
                  <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                </div>
              ))}
            </div>
          )}

          {/* Search Results */}
          {!loading && results.length > 0 && (
            <div className="space-y-6">
              {results.map((result, index) => (
                <div key={index} className="group">
                  <div className="text-sm text-gray-600 mb-1">
                    {result.displayUrl}
                  </div>
                  <h3 className="text-xl text-[#1a0dab] hover:underline cursor-pointer mb-1 group-hover:underline">
                    <a href={result.url} target="_blank" rel="noopener noreferrer">
                      {result.title}
                    </a>
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {result.snippet}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* No Results */}
          {!loading && results.length === 0 && query && (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">
                Your search - <strong>{query}</strong> - did not match any documents.
              </p>
              <div className="text-sm text-gray-600">
                <p>Suggestions:</p>
                <ul className="mt-2 space-y-1">
                  <li>• Make sure all words are spelled correctly.</li>
                  <li>• Try different keywords.</li>
                  <li>• Try more general keywords.</li>
                  <li>• Try fewer keywords.</li>
                </ul>
              </div>
            </div>
          )}

          {/* Pagination */}
          {!loading && results.length > 0 && (
            <div className="flex items-center justify-center space-x-4 mt-12 mb-8">
              <div className="flex items-center space-x-2">
                <span className="text-[#4285F4] text-2xl font-bold">G</span>
                <span className="text-red-500 text-2xl font-bold">o</span>
                <span className="text-yellow-500 text-2xl font-bold">o</span>
                <span className="text-[#4285F4] text-2xl font-bold">g</span>
                <span className="text-green-500 text-2xl font-bold">l</span>
                <span className="text-red-500 text-2xl font-bold">e</span>
              </div>
              <div className="flex items-center space-x-2">
                <button className="w-10 h-10 flex items-center justify-center text-[#4285F4] hover:bg-gray-100 rounded">
                  1
                </button>
                <button className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded">
                  2
                </button>
                <button className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded">
                  3
                </button>
                <button className="px-4 py-2 text-[#4285F4] hover:bg-gray-100 rounded">
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}