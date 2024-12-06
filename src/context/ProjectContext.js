// # src/context/ProjectContext.js
'use client'
import { createContext, useState, useCallback, useEffect } from 'react'
import axios from 'axios'

export const ProjectContext = createContext()

export function ProjectProvider({ children, initialCity }) {
  const [projects, setProjects] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [currentCity, setCurrentCity] = useState(initialCity)

  const fetchProjects = useCallback(async (cityName) => {
    setIsLoading(true)
    try {
      const response = await axios.get(`/api/projects?city=${cityName}`)
      console.log(response.data.projects);
      setProjects(response.data.projects)
      setCurrentCity(cityName)
    } catch (error) {
      console.error('Error fetching projects:', error)
      setProjects([])
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    if (initialCity) {
      fetchProjects(initialCity)
    }
  }, [initialCity, fetchProjects])

  return (
    <ProjectContext.Provider value={{ 
      projects, 
      isLoading, 
      currentCity,
      fetchProjects 
    }}>
      {children}
    </ProjectContext.Provider>
  )
}