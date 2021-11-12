import React from "react";
import { useEffect, useState } from "react";
import tw from "tailwind-styled-components";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken =
  "pk.eyJ1IjoiYWRpb24iLCJhIjoiY2t2aWJ3MmZqNGhsNDJybHVwY2ZiZXRtaSJ9.FUhkRv84vCMJcyHgOeB7Dw";

const Map = ({ pickup, dropoff }) => {
  // longitude and latitude of India

  const addToMap = (map, coordinates) => {
    const marker1 = new mapboxgl.Marker({ color: "black" })
      .setLngLat(coordinates)
      .addTo(map);
  };

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: "map",
      // style: "mapbox://styles/mapbox/light-v10",
      style: "mapbox://styles/drakosi/ckvcwq3rwdw4314o3i2ho8tph",
      center: [-99.29011, 34.39172],
      zoom: 3,
    });

    if (pickup) {
      console.log(pickup);
      addToMap(map, pickup);
    }
    if (dropoff) {
      addToMap(map, dropoff);
    }

    if (pickup && dropoff) {
      map.fitBounds([pickup, dropoff], {
        padding: 60,
      });
    }
  }, [pickup, dropoff]);

  console.log(pickup);

  return <MapBro id="map"></MapBro>;
};

const MapBro = tw.div`
  flex-1
`;

export default Map;
