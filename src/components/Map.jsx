import React, { useEffect, useState } from 'react';
import styles from './Map.module.css';
import {useNavigate} from 'react-router-dom';
import { MapContainer,TileLayer,Marker,Popup, useMap, useMapEvents } from 'react-leaflet';
import { useCities } from '../context/CitiesContext';
import PropTypes from "prop-types";
import { useGeolocation } from '../hooks/useGeoLocation';
import Button from './Button';
import { useUrlPosition } from '../hooks/useUrlPosition';

ChangeCenter.propTypes={
  position : PropTypes.array
}

export default function Map() {
  const [mapPosition,setMapPosition]=useState([40,50])
  const {isLoading:isloadingPosition,
    position:geoPosition,
    getPosition}=useGeolocation();
    
    const {cities}=useCities();
  const [lat,lng]=useUrlPosition();


  useEffect(function(){
    if(lat && lng) setMapPosition([lat,lng])
  },[lat,lng])

    useEffect(function(){
      if(geoPosition)setMapPosition([geoPosition.lat,geoPosition.lng])
    },[geoPosition])


  return (
    <div className={styles.mapContainer}>
{!geoPosition &&  <Button type="position" onClick={getPosition}>{isloadingPosition ? "Loading...":"Use your location"}</Button>}
     <MapContainer center={mapPosition} zoom={6} scrollWheelZoom={true} className={styles.map}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
    />
    {cities.map(city =>
      <Marker position={[city.position.lat,city.position.lng]} key={city.id}>
      <Popup>
        <span>{city.emoji} {city.cityName}</span>
      </Popup>
    </Marker>
    )
    }
    <ChangeCenter position={mapPosition}/>
    <DetectClick />
    </MapContainer>
    </div>
  )
}

function ChangeCenter({position}){
  const map = useMap();
  map.setView(position);
  return null
}

function DetectClick(){
  const navigate = useNavigate();
  useMapEvents({
    click : e => {navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)}
  })
}