// # src/app/city/[cityName]/page.js
import { use } from 'react'
import ProjectList from '../../components/ProjectList'
import ProjectMap from '../../components/ProjectMap'
import { ProjectProvider } from '../../../context/ProjectContext'

export default function CityProjectsPage({ params }) {
  
  const cityName = params.cityName

  return (
    <ProjectProvider initialCity={cityName}>
      <div className="container mx-auto p-6 grid  gap-6">
        <ProjectList cityName={cityName} />
        {/* <ProjectMap /> */}
      </div>
    </ProjectProvider>
  )
}