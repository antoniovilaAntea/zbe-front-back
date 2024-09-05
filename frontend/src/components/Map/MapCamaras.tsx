import { DivIcon, LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Camera } from "../../types/camera";
import GraficasCamaras from "../GraficasCamaras/GraficasCamaras";

type Props = {
  datos: Camera[] | undefined;
  contaminacionData:
    | (
        | { calle: string; contaminante: string; valor: string; fecha: string }
        | undefined
      )[]
    | undefined;
};

const MapCamaras = (props: Props) => {
  const { datos, contaminacionData } = props;

  const contaminacionMap = new Map<string, boolean>();
  contaminacionData?.forEach((item) => {
    item !== undefined && contaminacionMap.set(item.calle, true);
  });

  const array = datos?.map((camaras) => [
    camaras.calle,
    camaras.coords.x,
    camaras.coords.y,
    camaras.id_zona,
  ]);

  const getIconColor = (calle: string) => {
    return contaminacionMap.has(calle) ? "#53a5dc" : "black";
  };

  return (
    <MapContainer
      center={calculateCentroid(array?.map((item) => [item[1], item[2]]))}
      zoom={14.25}
      style={{ height: "550px", width: "950px" }}
    >
      <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"></TileLayer>
      {array?.map((location, index) => {
        const calle = String(location[0]);
        const iconColor = getIconColor(calle);

        const icono = new DivIcon({
          html: `<i class='fa fa-video-camera' aria-hidden='true' style='font-size: 24px; color: ${iconColor};'></i>`,
          className: "custom-div-icon",
          iconSize: [7, 10],
          iconAnchor: [7, 10],
        });

        const dataFiltrada = contaminacionData?.filter(
          (item) => item?.calle === calle
        );

        return (
          <Marker
            key={parseFloat(location[1].toString())}
            position={[
              parseFloat(location[1].toString()),
              parseFloat(location[2].toString()),
            ]}
            icon={icono}
          >
            <Popup>
              <GraficasCamaras
                data={dataFiltrada}
                estilo={false}
                calle={calle}
              ></GraficasCamaras>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

function calculateCentroid(coords: any) {
  let x = 0;
  let y = 0;
  let z = 0;

  coords.forEach((coord: any) => {
    let latitude = (parseFloat(coord[0]) * Math.PI) / 180;
    let longitude = (parseFloat(coord[1]) * Math.PI) / 180;

    x += Math.cos(latitude) * Math.cos(longitude);
    y += Math.cos(latitude) * Math.sin(longitude);
    z += Math.sin(latitude);
  });

  let total = coords.length;

  x = x / total;
  y = y / total;
  z = z / total;

  let centralLongitude = Math.atan2(y, x);
  let centralSquareRoot = Math.sqrt(x * x + y * y);
  let centralLatitude = Math.atan2(z, centralSquareRoot);

  const centro: LatLngExpression = [
    (centralLatitude * 180) / Math.PI,
    (centralLongitude * 180) / Math.PI,
  ];
  return centro;
}

export default MapCamaras;
