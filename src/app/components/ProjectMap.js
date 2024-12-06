'use client'
import { useContext, useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { ProjectContext } from '../../context/ProjectContext'

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png'
});

export default function ProjectMap({}) {
  const { projects = [] } = useContext(ProjectContext)
  const [cityProjects, setCityProjects] = useState([])
  const [center, setCenter] = useState([20.5937, 78.9629]) // Default center (India's center)

  // Assuming city name comes from the context or a prop
  let cityName; // You can dynamically pass the city name if needed.

  useEffect(() => {
    // Filter projects by city name and set the center based on the first project’s coordinates
    const filteredProjects = projects.filter(project => project.location.includes(cityName))
    console.log("filteredProjects" , filteredProjects);
    

    if (filteredProjects.length > 0) {
      const cityCenter = filteredProjects[0].coordinates
      setCenter([cityCenter.lat, cityCenter.lon]) // Update map center based on the first project
    }

    setCityProjects(filteredProjects) // Set the filtered projects based on the city
  }, [projects, cityName])

  return (
    <MapContainer 
      center={center} 
      zoom={12} 
      scrollWheelZoom={false}
      className="h-[500px] rounded-lg"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; OpenStreetMap contributors'
      />
      {cityProjects && cityProjects.length > 0 && cityProjects.map((project, index) => (
        project.coordinates && (
          <Marker 
            key={index} 
            position={[project.coordinates.lat, project.coordinates.lon]}
          >
            <Popup>
              <div>
                <h3 className="font-bold">{project.projectName || 'Project Name'}</h3>
                <p>{project.location || 'Location Not Available'}</p>
                <p>Price: {project.priceRange || 'Price Not Specified'}</p>
              </div>
            </Popup>
          </Marker>
        )
      ))}
    </MapContainer>
  )
}
