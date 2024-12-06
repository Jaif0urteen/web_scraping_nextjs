'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function CitySearch() {
  const [cityName, setCityName] = useState('')
  const router = useRouter()

  const handleSearch = (e) => {
    e.preventDefault()
    if (cityName.trim()) {
      router.push(`/city/${cityName}`)
    }
  }

  return (
    <form onSubmit={handleSearch} className="max-w-md mx-auto">
      <div className="flex">
        <input 
          type="text" 
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
          placeholder="Enter City Name (e.g., Hyderabad)" 
          className="flex-grow px-4 py-2 border rounded-l-lg"
        />
        <button 
          type="submit" 
          className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600"
        >
          Search Projects
        </button>
      </div>
    </form>
  )
}