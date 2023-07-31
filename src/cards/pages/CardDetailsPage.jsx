import React, { useState, useEffect } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useParams } from "react-router-dom";
import { Client } from "@googlemaps/google-maps-services-js";

const client = new Client({});

export default function CardDetailsPage() {
  const [location, setLocation] = useState({ lat: 0, lng: 0 });
  const { id } = useParams();
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBfqePbYJs_djL3I_Xb_8FBxbhoVTWbjKs", 
  });

  useEffect(() => {
    fetch(`http://localhost:8181/cards/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
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

  if (loadError) return "map is not loaded";
  if (!isLoaded) return "loading map";
  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}> 
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
    </div>
  );
}

