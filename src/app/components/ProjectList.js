'use client'
import { useContext } from 'react'
import { ProjectContext } from '../../context/ProjectContext'

export default function ProjectList({ cityName }) {
  const { projects, isLoading } = useContext(ProjectContext)
  console.log("ProjectList", projects);

  if (isLoading) {
    return (
      <div className="text-center">
        <div className="spinner animate-spin">🔄</div>
        <p>Fetching projects for {cityName}...</p>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">
        Projects in {cityName}
      </h2>
      {projects.length === 0 ? (
        <p>No projects found in {cityName}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div 
              key={index} 
              className={`${index % 2 === 0 ? 'bg-slate-400' : 'bg-gray-500' } p-4 rounded-lg shadow-md`}
            >
              <h3 className="text-xl font-semibold">{project.projectName}</h3>
              <p>Location: {project.location}</p>
              <p>Price Range: {project.priceRange}</p>
              <p>BHK: {project.bhk}</p>
              {/* <p>Builder: {project.builderName}</p> */}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
