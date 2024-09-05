import L, { Map, marker, tileLayer } from "leaflet";
import "leaflet/dist/leaflet.css";
import React, { useEffect, useRef, useState } from "react";

import "./MapRuido.css";

type Props = {
  id: string;
  tipo: string;
  locations: any[];
};

const MapRuido = ({ id, tipo, locations }: Props) => {
  const [map, setMap] = useState<Map>();
  const mapInit = useRef<boolean>(false);

  const initMap = () => {
    map &&
      tileLayer(
        "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
      ).addTo(map);
  };

  function colorMarker(color: any) {
    const svgTemplate = `
                  <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill=${color}>
                  <path d="M477-80q-83 0-156-31.5T194-197q-54-54-85.5-127T77-480q0-83 31.5-156T194-763q54-54 127-85.5T477-880q83 0 156 31.5T760-763q54 54 85.5 127T877-480q0 83-31.5 156T760-197q-54 54-127 85.5T477-80Zm91-93q78-23 135.5-80.5T784-389L568-173ZM171-574l212-212q-77 23-133 79t-79 133Zm-4 176 392-391q-12-3-24-5t-25-4L159-447q2 13 3.5 25t4.5 24Zm57 114 449-450q-8-6-16.5-12T639-757L200-318q5 9 11 17.5t13 16.5Zm91 81 438-439q-5-9-11-17.5T730-676L281-226q8 6 16.5 12t17.5 11Zm129 41 351-351q-2-13-4-25t-5-24L395-171q12 3 24 5t25 4Z"/>
                  </svg>`;
    const icon = L.divIcon({
      className: "marker",
      html: svgTemplate,
      iconSize: [20, 20],
      iconAnchor: [6, 16],
      popupAnchor: [7, -16],
    });

    return icon;
  }
  const color = ["#64C800", "#FFFF00", "#FFCD69", "#FF8000", "#FF0000"];

  const addMoreMarkers = () => {
    map &&
      locations.map((location) => {
        let valor;

        if (tipo === "ld") {
          valor = location[2];
        } else if (tipo === "le") {
          valor = location[3];
        } else if (tipo === "ln") {
          valor = location[4];
        } else {
          valor = location[5];
        }
        if (valor <= 55) {
          return marker([location[0], location[1]])
            .setIcon(colorMarker(color[0]))
            .addTo(map)
            .bindPopup(`Valor de ruido: ${valor}  <br/ > ${location[6]}`);
        }
        if (valor > 55 && valor <= 60) {
          return marker([location[0], location[1]])
            .setIcon(colorMarker(color[1]))
            .addTo(map)
            .bindPopup(`Valor de ruido: ${valor}  <br/ > ${location[6]}`);
        }
        if (valor > 60 && valor <= 65) {
          return marker([location[0], location[1]])
            .setIcon(colorMarker(color[2]))
            .addTo(map)
            .bindPopup(`Valor de ruido: ${valor}  <br/ > ${location[6]}`);
        }
        if (valor > 65 && valor <= 70) {
          return marker([location[0], location[1]])
            .setIcon(colorMarker(color[3]))
            .addTo(map)
            .bindPopup(`Valor de ruido: ${valor}  <br/ > ${location[6]}`);
        }
        if (valor > 70) {
          return marker([location[0], location[1]])
            .setIcon(colorMarker(color[4]))
            .addTo(map)
            .bindPopup(`Valor de ruido: ${valor}  <br/ > ${location[6]}`);
        }
      });
  };

  let lati = 0;
  let longi = 0;
  locations.map((marker) => {
    lati += marker[0];
    longi += marker[1];
  });
  useEffect(() => {
    if (!mapInit.current) {
      mapInit.current = true;
      setMap(
        new Map(id, {
          center: [lati / locations.length, longi / locations.length],
          zoom: 14,
        }).setView([lati / locations.length, longi / locations.length])
      );
    }
    if (map) {
      initMap();
      addMoreMarkers();
    }
  }, [mapInit, map]);
  return <div id={id} style={{ width: "33.333%", height: "400px" }}></div>;
};

export default MapRuido;
