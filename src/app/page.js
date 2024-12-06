import CitySearch from './components/CitySearch'

export default function Home() {
  return (
    <main className="min-h-screen p-6 bg-gray-100">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">
          MagicBricks Project Finder
        </h1>
        <CitySearch />
      </div>
    </main>
  )
}