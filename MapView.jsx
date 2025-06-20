import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { createClient } from '@supabase/supabase-js'
import L from 'leaflet'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Fix for default marker icon issues in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

export default function MapView() {
  const [places, setPlaces] = useState([])

  useEffect(() => {
    async function fetchPlaces() {
      const { data, error } = await supabase.from('places').select('*')
      if (error) console.error(error)
      else setPlaces(data)
    }
    fetchPlaces()
  }, [])

  return (
    <section style={{ marginTop: 40 }}>
      <h2>Salaspils Vietas</h2>
      <MapContainer style={{ height: '400px', width: '100%' }} center={[56.88, 24.33]} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {places.map(place => (
          <Marker key={place.id} position={[place.lat, place.lng]}>
            <Popup>
              <strong>{place.name}</strong><br />
              {place.address}<br />
              {place.type}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </section>
  )
}
