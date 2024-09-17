import { addDays } from "date-fns";
import React, { useCallback, useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { PickerDay } from "../../components/DayPicker";
import { Camera } from "../../types/camera";
import { ContaminacionCamaras } from "../../types/contaminacioncamaras";
import { ContaminacionTotal } from "../../types/contaminaciontotal";

import "./calculadoraParticulas.css";

type Props = {
  particulas: number;
};

export const CalculadoraParticulas = ({ particulas }: Props) => {
  const [valoresCamara, setValores] = useState({
    co: 0,
    no2: 0,
    pm25: 0,
    pm10: 0,
    hc: 0,
    combustible: 0,
    tep: 0,
    energia: 0,
    co2: 0,
  });

  const factor1 = 2.68;
  const factor2 = 2.31;

  const [valLitros, setValLitros] = useState(0);
  const [valTEP, setValTEP] = useState(0);
  const [valEnergia, setValEnergia] = useState(0);
  const [co2, setCo2] = useState(0);
  const [excelData, setExcelData] = useState<any[]>([]);
  const [fechaData, setFechaData] = useState<any>([]);
  const [archivo, setArchivo] = useState<boolean>(false);

  const [contB, setcontB] = useState(0);
  const [contC, setcontC] = useState(0);
  const [contNoFigura, setcontNoFigura] = useState(0);
  const [contEco, setcontEco] = useState(0);
  const [contCero, setcontCero] = useState(0);

  const [cameraList, setCameraList] = useState<Camera[]>();

  const [contaminacionTotal, setContaminacionTotal] =
    useState<ContaminacionTotal>();
  const [contaminacionCamaras, setContaminacionCamaras] =
    useState<ContaminacionCamaras>();
  const [selectedZone, setSelectedZone] = useState<number>(0);
  const [selectedCameraId, setSelectedCameraId] = useState<number>(0);
  const [date, setDate] = useState<Date | string>("");
  const [cantidadContaminante, setCantidadContaminante] = useState<
    Array<{ contaminante: string; valor: number; fecha: Date; id_zona: number }>
  >([]);

  const handleDateChange = (date: Date | string) => {
    setDate(date);
    totalcontaminacion();
  };

  const [valUpdate, setValUpdate] = useState<
    Array<{
      id_zona: number;
      contaminante: string;
      fecha: Date | string;
      valor: number;
      id_camara: number;
    }>
  >([]);

  useEffect(() => {
    const newValUpdate = [
      {
        id_zona: selectedZone,
        contaminante: "co",
        fecha: date,
        valor: valoresCamara.co,
        id_camara: selectedCameraId,
      },
      {
        id_zona: selectedZone,
        contaminante: "no2",
        fecha: date,
        valor: valoresCamara.no2,
        id_camara: selectedCameraId,
      },
      {
        id_zona: selectedZone,
        contaminante: "pm25",
        fecha: date,
        valor: valoresCamara.pm25,
        id_camara: selectedCameraId,
      },
      {
        id_zona: selectedZone,
        contaminante: "pm10",
        fecha: date,
        valor: valoresCamara.pm10,
        id_camara: selectedCameraId,
      },
      {
        id_zona: selectedZone,
        contaminante: "hc",
        fecha: date,
        valor: valoresCamara.hc,
        id_camara: selectedCameraId,
      },
      {
        id_zona: selectedZone,
        contaminante: "combustible",
        fecha: date,
        valor: valoresCamara.combustible,
        id_camara: selectedCameraId,
      },
      {
        id_zona: selectedZone,
        contaminante: "tep",
        fecha: date,
        valor: valoresCamara.tep,
        id_camara: selectedCameraId,
      },
      {
        id_zona: selectedZone,
        contaminante: "energia",
        fecha: date,
        valor: valoresCamara.energia,
        id_camara: selectedCameraId,
      },
      {
        id_zona: selectedZone,
        contaminante: "co2",
        fecha: date,
        valor: valoresCamara.co2,
        id_camara: selectedCameraId,
      },
    ];
    setValUpdate(newValUpdate);
  }, [valoresCamara, selectedZone, selectedCameraId, date]);

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setArchivo(true);
      exportToExcel(Array.from(e.target.files));
    }
  };

  const totalcontaminacion = useCallback(async () => {
    try {
      const response = await fetch(
        "https://web-zbe-backend2.vercel.app/api/contaminacionzona",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const result = await response.json();
        setContaminacionTotal(result);
      } else {
        console.error("Failed to save data:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }, []);

  const createContaminacionCamara = async (valor: {
    id_zona: number;
    contaminante: string;
    fecha: Date | string;
    valor: number;
    id_camara: number;
  }) => {
    try {
      const response = await fetch(
        "https://web-zbe-backend2.vercel.app/api/contaminacioncamaras",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(valor),
        }
      );

      if (response.ok) {
        const result = await response.json();
      } else {
        console.error("Failed to save data:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const exportToExcel = async (selectFile: File[]) => {
    if (selectFile.length === 0) {
      alert("Por favor seleccione archivos y/o ingrese celdas.");
      return;
    }

    const readFile = (file: File) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const workbook = XLSX.read(event.target?.result as string, {
              type: "binary",
            });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const data: any[][] = XLSX.utils.sheet_to_json(sheet, {
              header: 1,
            });
            resolve(data);
          } catch (error) {
            reject(error);
          }
        };
        reader.readAsBinaryString(file);
      });
    };

    try {
      const allData = await Promise.all(
        selectFile.map((file) => readFile(file))
      );
      const combinedData = allData.flat().map((row: any) => [row[5]]);
      setExcelData(combinedData);
      const fechaCombinedData = allData.flat().map((row: any) => [row[9]]);
      var fechaGrande = new Date(
        fechaCombinedData[fechaCombinedData.length - 1].toString()
      ).getTime();
      var fechaPeque = new Date(fechaCombinedData[2].toString()).getTime();
      const diferencia = Math.round((fechaGrande - fechaPeque) / 86400000);

      setFechaData(diferencia);
      setArchivo(false);
    } catch (error) {
      console.error("Error reading file:", error);
    }
  };

  useEffect(() => {
    const contadores: { [key: string]: number } = {};
    for (const valor of excelData) {
      const key = JSON.stringify(valor);
      if (contadores[key]) {
        contadores[key]++;
      } else {
        contadores[key] = 1;
      }
    }
    setcontB(Math.round(contadores['["B"]'] / fechaData / 24 || 0));
    setcontC(Math.round(contadores['["C"]'] / fechaData / 24 || 0));
    setcontNoFigura(
      Math.round(
        (contadores['["NO FIGURA EN BBDD DGT"]'] / fechaData / 24 || 0) +
          (contadores['["SIN DISTINTIVO"]'] / fechaData / 24 || 0)
      )
    );
    setcontEco(Math.round(contadores['["ECO"]'] / fechaData / 24 || 0));
    setcontCero(Math.round(contadores['["0"]'] / fechaData / 24 || 0));
  }, [excelData, fechaData]);

  const handleChange = (e: any) => {
    let zone = 0;
    if (groupedCameras) {
      for (const cameras of Object.values(groupedCameras)) {
        const selectedCamera = cameras.find(
          (cam) => cam.id === parseInt(e.target.value)
        );
        if (selectedCamera) {
          zone = selectedCamera.id_zona;
          break;
        }
      }
    }

    setSelectedCameraId(parseInt(e.target.value));
    setSelectedZone(zone);
  };

  const handleCalculate = useCallback(() => {
    const valorFactor1 =
      particulas > 0
        ? particulas / 2 / factor1
        : Math.round(
            contCero * 0.6 +
              contEco * 0.72 +
              contC * 0.9 +
              contB * 1.02 +
              contNoFigura * 1.14
          ) /
          2 /
          factor1;
    const valorFactor2 =
      particulas > 0
        ? particulas / 2 / factor1
        : Math.round(
            contCero * 0.6 +
              contEco * 0.72 +
              contC * 0.9 +
              contB * 1.02 +
              contNoFigura * 1.14
          ) /
          2 /
          factor2;

    const nuevosValores = {
      no2:
        Math.round(
          (contB +
            contC * 0.75 +
            contCero * 0.25 +
            contEco * 0.5 +
            contNoFigura * 1.25) *
            0.0296894247647815 *
            100
        ) / 100,
      pm25:
        Math.round(
          (contB +
            contC * 0.75 +
            contCero * 0.25 +
            contEco * 0.5 +
            contNoFigura * 1.25) *
            0.0121975681735219 *
            100
        ) / 100,
      pm10:
        Math.round(
          (contB +
            contC * 0.75 +
            contCero * 0.25 +
            contEco * 0.5 +
            contNoFigura * 1.25) *
            0.0218523754575835 *
            100
        ) / 100,
      co:
        Math.round(
          (contB +
            contC * 0.75 +
            contCero * 0.25 +
            contEco * 0.5 +
            contNoFigura * 1.25) *
            0.000257082275077134 *
            100
        ) / 100,
      hc:
        Math.round(
          (contB +
            contC * 0.75 +
            contCero * 0.25 +
            contEco * 0.5 +
            contNoFigura * 1.25) *
            0.00148690555398458 *
            100
        ) / 100,
      combustible: Math.round(valorFactor1 + valorFactor2),
      tep: Math.round(0.84 * valorFactor1 + 0.74 * valorFactor2),
      energia: Math.round((0.84 * valorFactor1 + 0.74 * valorFactor2) * 11.63),
      co2: Math.round(
        Math.round(contCero * 0.6) +
          Math.round(contEco * 0.72) +
          Math.round(contC * 0.9) +
          Math.round(contB * 1.02) +
          Math.round(contNoFigura * 1.14)
      ),
    };

    setValores(nuevosValores);
    setValLitros(Math.round(valorFactor1 + valorFactor2));
    setValTEP(Math.round(0.84 * valorFactor1 + 0.74 * valorFactor2));
    setValEnergia(
      Math.round((0.84 * valorFactor1 + 0.74 * valorFactor2) * 11.63)
    );
    setCo2(
      Math.round(
        Math.round(contCero * 0.6) +
          Math.round(contEco * 0.72) +
          Math.round(contC * 0.9) +
          Math.round(contB * 1.02) +
          Math.round(contNoFigura * 1.14)
      )
    );
  }, [
    particulas,
    factor1,
    factor2,
    contCero,
    contEco,
    contC,
    contB,
    contNoFigura,
  ]);
  const handleCallCameras = async () => {
    try {
      const response = await fetch(
        "https://web-zbe-backend2.vercel.app/api/camaras",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setCameraList(data);
      } else {
        console.error("Error en la solicitud:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    handleCallCameras();
  }, []);

  const actualizarDatosCamaras = () => {
    valUpdate.forEach((e) => {
      createContaminacionCamara(e);
    });
  };

  const groupedCameras: { [id_zona: string]: Camera[] } = cameraList
    ? cameraList.reduce((acc: { [key: string]: Camera[] }, cam: Camera) => {
        const key = cam.id_zona.toString();
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(cam);
        return acc;
      }, {})
    : {};

  useEffect(() => {
    if (Array.isArray(contaminacionTotal)) {
      const contaminantesArray = contaminacionTotal.map((item) => ({
        contaminante: item.contaminante,
        valor: item.valor,
        fecha: item.fecha,
        id_zona: item.id_zona,
      }));

      setCantidadContaminante(contaminantesArray);
    }
  }, [contaminacionTotal]);

  useEffect(() => {}, [cantidadContaminante]);

  const filteredData = cantidadContaminante.filter((item) => {
    const itemDate = new Date(item.fecha);
    const itemDateString = itemDate.toISOString().split("T")[0];

    return (
      addDays(itemDateString, 1).toISOString().split("T")[0] ===
      date.toString().split("T")[0]
    );
  });

  useEffect(() => {
    if (excelData.length > 0) {
      handleCalculate();
      totalcontaminacion();
    }
  }, [excelData, handleCalculate, totalcontaminacion]);

  return (
    <div style={{ color: "#53a5dc", width: "60%" }}>
      Subir datos de contaminantes
      <form className="formulario" onSubmit={(e) => e.preventDefault()}>
        <PickerDay fecha={handleDateChange}></PickerDay>
        <div className="tipo">
          <select id="id_zona" name="id_zona" onChange={handleChange}>
            {Object.entries(groupedCameras).map(([id_zona, cameras]) => (
              <optgroup key={id_zona} label={`Zona ${id_zona}`}>
                {cameras.map((cam: Camera) => (
                  <option key={cam.id} value={cam.id}>
                    {cam.calle}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>
        <div className="archivo">
          <input
            type="file"
            className="form-control"
            id="inputGroupFile"
            placeholder="Ningún archivo seleccionado"
            accept=".xlsb"
            onChange={handleFileInputChange}
          />
        </div>
        {archivo && (
          <div style={{ marginBottom: "2em" }}>Leyendo archivo...</div>
        )}
        {excelData.length > 0 && (
          <div className="tablas">
            <table className="resultados">
              <thead>
                <tr>
                  <th>Contaminante</th>
                  <th>Contaminación cámara</th>
                  <th>Contaminación total Zona</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>NO2 (µg/m3/hora)</td>
                  <td className="val">
                    {valoresCamara.no2 === undefined
                      ? "CARGANDO"
                      : valoresCamara.no2}
                  </td>
                  <td className="val">
                    {filteredData
                      .filter(
                        (item) =>
                          item.contaminante === "no2" &&
                          item.id_zona === selectedZone
                      )
                      .map((item) => `${item.valor}`)}
                  </td>
                </tr>
                <tr>
                  <td>PM25 (µg/m3/hora)</td>
                  <td className="val">
                    {valoresCamara.pm25 === undefined
                      ? "CARGANDO"
                      : valoresCamara.pm25}
                  </td>
                  <td className="val">
                    {filteredData
                      .filter(
                        (item) =>
                          item.contaminante === "pm25" &&
                          item.id_zona === selectedZone
                      )
                      .map((item) => `${item.valor}`)}
                  </td>
                </tr>
                <tr>
                  <td>PM10 (µg/m3/hora)</td>
                  <td className="val">
                    {valoresCamara.pm10 === undefined
                      ? "CARGANDO"
                      : valoresCamara.pm10}
                  </td>
                  <td className="val">
                    {filteredData
                      .filter(
                        (item) =>
                          item.contaminante === "pm10" &&
                          item.id_zona === selectedZone
                      )
                      .map((item) => `${item.valor}`)}
                  </td>
                </tr>
                <tr>
                  <td>CO (mg/m3/hora)</td>
                  <td className="val">
                    {valoresCamara.co === undefined
                      ? "CARGANDO"
                      : valoresCamara.co}
                  </td>
                  <td className="val">
                    {filteredData
                      .filter(
                        (item) =>
                          item.contaminante === "co" &&
                          item.id_zona === selectedZone
                      )
                      .map((item) => `${item.valor}`)}
                  </td>
                </tr>
                <tr>
                  <td>HC (µg/m3/hora)</td>
                  <td className="val">
                    {valoresCamara.hc === undefined
                      ? "CARGANDO"
                      : valoresCamara.hc}
                  </td>
                  <td className="val">
                    {filteredData
                      .filter(
                        (item) =>
                          item.contaminante === "hc" &&
                          item.id_zona === selectedZone
                      )
                      .map((item) => `${item.valor}`)}
                  </td>
                </tr>
              </tbody>
            </table>

            <table className="consumo">
              <thead>
                <tr>
                  <th>Consumo</th>
                  <th>Consumo cámara</th>
                  <th>Consumo total Zona</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Litros combustible</td>
                  <td className="val">{valLitros}</td>
                  <td className="val">
                    {filteredData
                      .filter(
                        (item) =>
                          item.contaminante === "combustible" &&
                          item.id_zona === selectedZone
                      )
                      .map((item) => `${item.valor}`)}
                  </td>
                </tr>
                <tr>
                  <td>TEP</td>
                  <td className="val">{valTEP}</td>
                  <td className="val">
                    {filteredData
                      .filter(
                        (item) =>
                          item.contaminante === "tep" &&
                          item.id_zona === selectedZone
                      )
                      .map((item) => `${item.valor}`)}
                  </td>
                </tr>
                <tr>
                  <td>Energía (MWh)</td>
                  <td className="val">{valEnergia}</td>
                  <td className="val">
                    {filteredData
                      .filter(
                        (item) =>
                          item.contaminante === "energia" &&
                          item.id_zona === selectedZone
                      )
                      .map((item) => `${item.valor}`)}
                  </td>
                </tr>
                <tr>
                  <td>Kg/Co2/h</td>
                  <td className="val">{co2}</td>
                  <td className="val">
                    {filteredData
                      .filter(
                        (item) =>
                          item.contaminante === "co2" &&
                          item.id_zona === selectedZone
                      )
                      .map((item) => `${item.valor}`)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        <div className="botones">
          <button
            type="button"
            onClick={() => {
              actualizarDatosCamaras();
            }}
          >
            Subir a base de datos
          </button>
        </div>
      </form>
    </div>
  );
};
