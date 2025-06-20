import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const places = [
  { id: 1, name: "Salaspils Kultūras nams", type: "Kultūras centrs", lat: 56.8709, lng: 24.3131, address: "Kultūras iela 1", hours: "9:00 - 18:00" },
  { id: 2, name: "Salaspils bibliotēka", type: "Bibliotēka", lat: 56.8717, lng: 24.3090, address: "Rīgas iela 4", hours: "10:00 - 19:00" },
  { id: 3, name: "Rimi Salaspils", type: "Pārtikas veikals", lat: 56.8698, lng: 24.3140, address: "Rīgas iela 10", hours: "8:00 - 22:00" },
  { id: 4, name: "Maxima Salaspils", type: "Pārtikas veikals", lat: 56.8695, lng: 24.3180, address: "Dārza iela 7", hours: "7:00 - 23:00" },
  { id: 5, name: "Salaspils Dārzu parks", type: "Parks", lat: 56.8740, lng: 24.3100, address: "Parka iela", hours: "Atvērts visu diennakti" },
  { id: 6, name: "Salaspils Sporta centrs", type: "Sporta centrs", lat: 56.8730, lng: 24.3140, address: "Sporta iela 12", hours: "6:00 - 22:00" },
  { id: 7, name: "Salaspils Jaunatnes centrs", type: "Jaunatnes centrs", lat: 56.8705, lng: 24.3085, address: "Jaunatnes iela 3", hours: "9:00 - 20:00" },
  { id: 8, name: "Salaspils slimnīca", type: "Medicīnas iestāde", lat: 56.8755, lng: 24.3155, address: "Slimnīcas iela 5", hours: "24/7" },
  { id: 9, name: "Salaspils Vidusskola", type: "Skola", lat: 56.8688, lng: 24.3200, address: "Skolas iela 8", hours: "7:30 - 16:00" },
  { id: 10, name: "Dzegužkalna parks", type: "Parks", lat: 56.8670, lng: 24.3080, address: "Dzegužkalna iela", hours: "Atvērts visu diennakti" },
  { id: 11, name: "Salaspils kafejnīca 'Pie Jāņa'", type: "Kafejnīca", lat: 56.8690, lng: 24.3120, address: "Rīgas iela 15", hours: "9:00 - 22:00" },
  { id: 12, name: "Salaspils sporta laukums", type: "Sporta laukums", lat: 56.8715, lng: 24.3160, address: "Sporta iela 7", hours: "6:00 - 21:00" },
  { id: 13, name: "Salaspils bērnudārzs 'Mazulis'", type: "Bērnudārzs", lat: 56.8707, lng: 24.3105, address: "Bērnu iela 10", hours: "7:00 - 18:00" },
  { id: 14, name: "Salaspils tirdzniecības centrs", type: "Tirdzniecības centrs", lat: 56.8748, lng: 24.3150, address: "Centra iela 2", hours: "9:00 - 20:00" },
  { id: 15, name: "Salaspils pasta nodaļa", type: "Pasta nodaļa", lat: 56.8712, lng: 24.3110, address: "Pasta iela 1", hours: "8:00 - 17:00" },
  { id: 16, name: "Salaspils bērnu bibliotēka", type: "Bibliotēka", lat: 56.8735, lng: 24.3135, address: "Grāmatu iela 3", hours: "10:00 - 18:00" },
  { id: 17, name: "Salaspils estrāde", type: "Estrāde", lat: 56.8720, lng: 24.3095, address: "Estrādes iela 5", hours: "Pasākumu laikā" },
  { id: 18, name: "Salaspils muzejs", type: "Muzejs", lat: 56.8750, lng: 24.3100, address: "Muzeja iela 1", hours: "10:00 - 17:00" },
  { id: 19, name: "Salaspils autoosta", type: "Sabiedriskais transports", lat: 56.8715, lng: 24.3190, address: "Autoostas iela 1", hours: "5:00 - 23:00" },
  { id: 20, name: "Salaspils dārzkopības centrs", type: "Veikals", lat: 56.8738, lng: 24.3160, address: "Dārza iela 14", hours: "8:00 - 19:00" },
  
  // Pievienot vēl 40 vietas zemāk (piemēri):
  { id: 21, name: "Salaspils Sporta zāle", type: "Sporta centrs", lat: 56.8725, lng: 24.3200, address: "Sporta iela 20", hours: "6:00 - 23:00" },
  { id: 22, name: "Salaspils Mākslas skola", type: "Skola", lat: 56.8692, lng: 24.3050, address: "Skolas iela 5", hours: "8:00 - 17:00" },
  { id: 23, name: "Salaspils Zoo veikals", type: "Veikals", lat: 56.8745, lng: 24.3125, address: "Zoodārza iela 2", hours: "9:00 - 19:00" },
  { id: 24, name: "Salaspils BMX trase", type: "Sporta laukums", lat: 56.8750, lng: 24.3205, address: "Sporta iela 25", hours: "6:00 - 22:00" },
  { id: 25, name: "Salaspils Kino centrs", type: "Kultūras centrs", lat: 56.8730, lng: 24.3120, address: "Kultūras iela 7", hours: "10:00 - 23:00" },
  { id: 26, name: "Salaspils Peldbaseins", type: "Sporta centrs", lat: 56.8728, lng: 24.3180, address: "Baseina iela 4", hours: "7:00 - 21:00" },
  { id: 27, name: "Salaspils Dārzu bibliotēka", type: "Bibliotēka", lat: 56.8733, lng: 24.3140, address: "Grāmatu iela 6", hours: "10:00 - 18:00" },
  { id: 28, name: "Salaspils Lauku muzejs", type: "Muzejs", lat: 56.8742, lng: 24.3170, address: "Muzeja iela 12", hours: "9:00 - 17:00" },
  { id: 29, name: "Salaspils Skautu nams", type: "Kultūras centrs", lat: 56.8695, lng: 24.3100, address: "Skautu iela 3", hours: "9:00 - 20:00" },
  { id: 30, name: "Salaspils Veselības centrs", type: "Medicīnas iestāde", lat: 56.8750, lng: 24.3165, address: "Veselības iela 8", hours: "8:00 - 18:00" },
  { id: 31, name: "Salaspils Pasta stacija", type: "Pasta nodaļa", lat: 56.8710, lng: 24.3120, address: "Pasta iela 10", hours: "8:00 - 17:00" },
  { id: 32, name: "Salaspils Kafejnīca 'Zvaigzne'", type: "Kafejnīca", lat: 56.8700, lng: 24.3140, address: "Rīgas iela 20", hours: "9:00 - 22:00" },
  { id: 33, name: "Salaspils Mūzikas skola", type: "Skola", lat: 56.8720, lng: 24.3110, address: "Mūzikas iela 7", hours: "8:00 - 16:00" },
  { id: 34, name: "Salaspils Dārzu kafejnīca", type: "Kafejnīca", lat: 56.8740, lng: 24.3110, address: "Parka iela 4", hours: "9:00 - 21:00" },
  { id: 35, name: "Salaspils Pļavu parks", type: "Parks", lat: 56.8685, lng: 24.3170, address: "Pļavu iela", hours: "Atvērts visu diennakti" },
  { id: 36, name: "Salaspils Sporta centrs 2", type: "Sporta centrs", lat: 56.8690, lng: 24.3195, address: "Sporta iela 30", hours: "6:00 - 22:00" },
  { id: 37, name: "Salaspils Bērnu parks", type: "Parks", lat: 56.8718, lng: 24.3098, address: "Bērnu iela 5", hours: "Atvērts visu diennakti" },
  { id: 38, name: "Salaspils Auto serviss", type: "Veikals", lat: 56.8725, lng: 24.3185, address: "Auto iela 12", hours: "9:00 - 18:00" },
  { id: 39, name: "Salaspils Ziedu veikals", type: "Veikals", lat: 56.8732, lng: 24.3125, address: "Ziedu iela 3", hours: "8:00 - 19:00" },
  { id: 40, name: "Salaspils Dārzu kafejnīca 2", type: "Kafejnīca", lat: 56.8745, lng: 24.3105, address: "Parka iela 9", hours: "9:00 - 20:00" },
  { id: 41, name: "Salaspils Kultūras bibliotēka", type: "Bibliotēka", lat: 56.8713, lng: 24.3130, address: "Kultūras iela 5", hours: "10:00 - 19:00" },
  { id: 42, name: "Salaspils Dārzu veikals", type: "Veikals", lat: 56.8728, lng: 24.3175, address: "Dārza iela 18", hours: "8:00 - 20:00" },
  { id: 43, name: "Salaspils Jaunatnes bibliotēka", type: "Bibliotēka", lat: 56.8700, lng: 24.3080, address: "Jaunatnes iela 4", hours: "10:00 - 18:00" },
  { id: 44, name: "Salaspils Teātris", type: "Kultūras centrs", lat: 56.8698, lng: 24.3115, address: "Teātra iela 2", hours: "12:00 - 22:00" },
  { id: 45, name: "Salaspils Dzelzceļa stacija", type: "Sabiedriskais transports", lat: 56.8715, lng: 24.3145, address: "Stacijas iela 1", hours: "5:00 - 23:00" },
  { id: 46, name: "Salaspils Skolas parks", type: "Parks", lat: 56.8700, lng: 24.3200, address: "Skolas iela 12", hours: "Atvērts visu diennakti" },
  { id: 47, name: "Salaspils Mākslas galerija", type: "Muzejs", lat: 56.8737, lng: 24.3102, address: "Galerijas iela 3", hours: "10:00 - 18:00" },
  { id: 48, name: "Salaspils Jauniešu bibliotēka", type: "Bibliotēka", lat: 56.8719, lng: 24.3097, address: "Jaunatnes iela 7", hours: "10:00 - 18:00" },
  { id: 49, name: "Salaspils Sporta bāze", type: "Sporta centrs", lat: 56.8724, lng: 24.3175, address: "Sporta iela 15", hours: "6:00 - 22:00" },
  { id: 50, name: "Salaspils Bibliotēka 2", type: "Bibliotēka", lat: 56.8697, lng: 24.3123, address: "Rīgas iela 18", hours: "10:00 - 19:00" },
  { id: 51, name: "Salaspils Kafejnīca 'Saulīte'", type: "Kafejnīca", lat: 56.8712, lng: 24.3142, address: "Rīgas iela 25", hours: "9:00 - 22:00" },
  { id: 52, name: "Salaspils Pasts", type: "Pasta nodaļa", lat: 56.8720, lng: 24.3118, address: "Pasta iela 3", hours: "8:00 - 17:00" },
  { id: 53, name: "Salaspils Kultūras estrāde", type: "Estrāde", lat: 56.8740, lng: 24.3125, address: "Estrādes iela 9", hours: "Pasākumu laikā" },
  { id: 54, name: "Salaspils Sporta stadions", type: "Sporta laukums", lat: 56.8710, lng: 24.3165, address: "Sporta iela 18", hours: "6:00 - 21:00" },
  { id: 55, name: "Salaspils Tirgus", type: "Tirdzniecības centrs", lat: 56.8735, lng: 24.3152, address: "Centra iela 7", hours: "9:00 - 20:00" },
  { id: 56, name: "Salaspils Ziedu tirgus", type: "Veikals", lat: 56.8727, lng: 24.3135, address: "Ziedu iela 5", hours: "8:00 - 18:00" },
  { id: 57, name: "Salaspils Sporta klubs", type: "Sporta centrs", lat: 56.8719, lng: 24.3140, address: "Sporta iela 22", hours: "6:00 - 22:00" },
  { id: 58, name: "Salaspils Skolu bibliotēka", type: "Bibliotēka", lat: 56.8699, lng: 24.3090, address: "Skolas iela 10", hours: "10:00 - 18:00" },
  { id: 59, name: "Salaspils Lauku bibliotēka", type: "Bibliotēka", lat: 56.8704, lng: 24.3088, address: "Lauku iela 1", hours: "10:00 - 18:00" },
  { id: 60, name: "Salaspils Kino teātris", type: "Kultūras centrs", lat: 56.8732, lng: 24.3115, address: "Kultūras iela 8", hours: "10:00 - 22:00" }
];

const PlacesMap = () => {
  const [selectedType, setSelectedType] = useState("Visi");

  // Unikālās kategorijas filtrēšanai
  const types = ["Visi", ...Array.from(new Set(places.map(place => place.type)))];

  // Filtrētās vietas pēc izvēlētā tipa
  const filteredPlaces = selectedType === "Visi"
    ? places
    : places.filter(place => place.type === selectedType);

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Filtru panelis */}
      <div style={{
        width: 250,
        padding: 20,
        background: "#f9f9f9",
        borderRight: "1px solid #ddd",
        overflowY: "auto"
      }}>
        <h2>Izvēlies kategoriju</h2>
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          style={{ width: "100%", padding: 8, fontSize: 16 }}
        >
          {types.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>

        <h3 style={{ marginTop: 20 }}>Vietas saraksts:</h3>
        <ul style={{ listStyle: "none", paddingLeft: 0, maxHeight: 300, overflowY: "auto" }}>
          {filteredPlaces.map(place => (
            <li key={place.id} style={{ marginBottom: 8, borderBottom: "1px solid #ccc", paddingBottom: 6 }}>
              <strong>{place.name}</strong><br />
              <small>{place.address}</small><br />
              <small>{place.hours}</small>
            </li>
          ))}
        </ul>
      </div>

      {/* Karte */}
      <MapContainer
        center={[56.871, 24.313]}
        zoom={14}
        style={{ flex: 1 }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {filteredPlaces.map(place => (
          <Marker key={place.id} position={[place.lat, place.lng]}>
            <Popup>
              <div>
                <h3>{place.name}</h3>
                <p><strong>Adrese:</strong> {place.address}</p>
                <p><strong>Darba laiks:</strong> {place.hours}</p>
                <p><strong>Kategorija:</strong> {place.type}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default PlacesMap;
