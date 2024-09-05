import React, { useEffect, useState } from "react";
import { PickerDay } from "../../components/DayPicker";
import GraficasCamaras from "../../components/GraficasCamaras/GraficasCamaras";
import MapCamaras from "../../components/Map/MapCamaras";
import { Camera } from "../../types/camera";

import "./camaraszbe.css";

const Camaraszbe = () => {
  const [cameraList, setCameraList] = useState<Camera[]>();
  const [cameraData, setCameraData] = useState<CameraData[]>();
  const [date, setDate] = useState<Date | string>();
  const [graficas, setGraficas] = useState(false);

  const filteredCameras = cameraList?.filter((camera) =>
    cameraData?.some((data) => data.id_camara === camera.id)
  );

  const combinedData = filteredCameras?.map((camera) => {
    const relatedData = cameraData?.filter(
      (data) =>
        data.id_camara === camera.id &&
        data.fecha.toString().split("T")[0] === date?.toString().split("T")[0]
    );
    return {
      ...camera,
      contaminacion: relatedData,
    };
  });

  const camerasWithContamination = combinedData?.filter(
    (camera) => camera.contaminacion && camera.contaminacion.length > 0
  );
  const contaminationData = camerasWithContamination?.flatMap((camera) =>
    camera.contaminacion?.map((data) => ({
      calle: camera.calle,
      contaminante: data.contaminante,
      valor: data.valor,
      fecha: data.fecha,
    }))
  );

  function ajustarFecha(fechaConHora: string): string {
    let fecha = new Date(fechaConHora);
    fecha.setHours(fecha.getHours() + 2);
    return fecha.toISOString().split("T")[0];
  }

  const handleDateChange = (date: Date | string) => {
    setDate(date);
  };

  const handleCallCameras = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/camaras", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setCameraList(data);
      } else {
        console.error("Error en la solicitud:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
    try {
      const response = await fetch(
        "http://localhost:3001/api/contaminacioncamaras",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const result = await response.json();
        const adjustedResult = result.map((item: CameraData) => ({
          ...item,
          fecha: ajustarFecha(item.fecha),
        }));

        setCameraData(adjustedResult);
      } else {
        console.error("Failed to save data:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    handleCallCameras();
  }, []);

  return (
    <div className="page">
      <h4 style={{ marginTop: "0em" }}>
        Mapa de las cámaras de control de la Zona de Bajas Emisiones
      </h4>
      <PickerDay fecha={handleDateChange}></PickerDay>
      <div className="mapa">
        {cameraList !== undefined && cameraList.length > 0 ? (
          <MapCamaras
            datos={cameraList}
            contaminacionData={contaminationData}
          />
        ) : (
          <p>Cargando cámaras...</p>
        )}
      </div>
      <div className="graficas">
        <button type="button" onClick={() => setGraficas(!graficas)}>
          {!graficas ? "Ver gráficas por cámara" : "Ocultar gráficas"}
        </button>
        <div>
          {graficas && (
            <GraficasCamaras data={contaminationData} estilo></GraficasCamaras>
          )}
        </div>
      </div>
    </div>
  );
};

export default Camaraszbe;
