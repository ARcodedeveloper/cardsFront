import React, { useState, useEffect } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useParams } from "react-router-dom";
import { Client } from "@googlemaps/google-maps-services-js";
import { useTheme } from '@mui/material/styles';


const client = new Client({});

export default function CardDetailsPage() {
  const [location, setLocation] = useState({ lat: 0, lng: 0 });
  const [data, setData] = useState(null); 
  const { id } = useParams();
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBfqePbYJs_djL3I_Xb_8FBxbhoVTWbjKs",
  });

  useEffect(() => {
    fetch(`http://localhost:8181/cards/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setData(data); 
        client
          .geocode({
            params: {
              address: `${data.address.street} ${data.address.houseNumber}, ${data.address.city}, ${data.address.country}`,
              key: "AIzaSyBfqePbYJs_djL3I_Xb_8FBxbhoVTWbjKs",
            },
          })
          .then((r) => {
            if (r.status === 200) {
              setLocation({
                lat: r.data.results[0].geometry.location.lat,
                lng: r.data.results[0].geometry.location.lng,
              });
            }
          })
          .catch((e) => {
            //console.log(e);
          });
      })
      .catch((error) => console.log(error));
  }, [id]);
  const theme = useTheme();

  if (loadError) return "map is not loaded";
  if (!isLoaded) return "loading map";
  if (!data) return "loading data";

  

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', position: 'relative' }}>
      <GoogleMap
        id="marker-example"
        mapContainerStyle={{
          height: "60vh",
          width: "60vw",
        }}
        zoom={14}
        center={location}
      >
        <Marker position={location} />
      </GoogleMap>
      <div style={{ 
      color: theme.typography.h2.color, 
      color: theme.typography.h3.color, 
      color: theme.typography.h4.color,  
      position: 'absolute', top: 10, left: 10 }}>
        <h2>Card Details</h2>
        <h3>{data.title}</h3>
        <h3>{data.subtitle}</h3>
        <h4>{data.description}</h4>
        <h4>{data.address.country}</h4>
        <h4>{data.address.city}</h4>
        <h4>{data.address.street}</h4>
        <h4>{data.address.houseNumber}</h4>
        <h4>{data.address.postalCode}</h4>
      </div>
    </div>
  );
}
