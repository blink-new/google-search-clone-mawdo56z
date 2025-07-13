import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Mic, Camera, Grid3X3, User } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'

export default function GoogleHomepage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const navigate = useNavigate()

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

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Top Navigation */}
      <nav className="flex justify-between items-center p-4 text-sm">
        <div className="flex space-x-4">
          <a href="#" className="text-gray-700 hover:underline">About</a>
          <a href="#" className="text-gray-700 hover:underline">Store</a>
        </div>
        <div className="flex items-center space-x-4">
          <a href="#" className="text-gray-700 hover:underline">Gmail</a>
          <a href="#" className="text-gray-700 hover:underline">Images</a>
          <button className="p-2 rounded-full hover:bg-gray-100">
            <Grid3X3 className="w-5 h-5 text-gray-600" />
          </button>
          <Button variant="default" className="bg-[#4285F4] hover:bg-[#3367D6] text-white px-6 py-2 rounded">
            Sign in
          </Button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 -mt-20">
        {/* Google Logo */}
        <div className="mb-8">
          <svg width="272" height="92" viewBox="0 0 272 92" className="text-[#4285F4]">
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
        <div className="w-full max-w-[584px] relative">
          <div className="relative">
            <div className="flex items-center border border-gray-300 rounded-full px-4 py-3 hover:shadow-md focus-within:shadow-md transition-shadow">
              <Search className="w-5 h-5 text-gray-400 mr-3" />
              <Input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
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

          {/* Search Suggestions (placeholder) */}
          {showSuggestions && searchQuery && (
            <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg shadow-lg mt-1 z-10">
              <div className="p-2">
                <div className="flex items-center px-3 py-2 hover:bg-gray-100 cursor-pointer">
                  <Search className="w-4 h-4 text-gray-400 mr-3" />
                  <span className="text-sm">{searchQuery}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Search Buttons */}
        <div className="flex space-x-4 mt-8">
          <Button
            onClick={handleSearch}
            variant="outline"
            className="px-6 py-3 text-sm text-gray-700 bg-[#f8f9fa] border border-[#f8f9fa] hover:shadow-sm hover:border-gray-300"
          >
            Google Search
          </Button>
          <Button
            variant="outline"
            className="px-6 py-3 text-sm text-gray-700 bg-[#f8f9fa] border border-[#f8f9fa] hover:shadow-sm hover:border-gray-300"
          >
            I'm Feeling Lucky
          </Button>
        </div>

        {/* Language Options */}
        <div className="mt-8 text-sm text-gray-600">
          Google offered in: 
          <a href="#" className="text-[#4285F4] hover:underline ml-1">Français</a>
          <a href="#" className="text-[#4285F4] hover:underline ml-2">Español</a>
          <a href="#" className="text-[#4285F4] hover:underline ml-2">Deutsch</a>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#f2f2f2] border-t border-gray-300">
        <div className="px-8 py-3 text-sm text-gray-600">
          <div className="flex justify-between items-center">
            <div className="flex space-x-6">
              <a href="#" className="hover:underline">Advertising</a>
              <a href="#" className="hover:underline">Business</a>
              <a href="#" className="hover:underline">How Search works</a>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="hover:underline">Privacy</a>
              <a href="#" className="hover:underline">Terms</a>
              <a href="#" className="hover:underline">Settings</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}