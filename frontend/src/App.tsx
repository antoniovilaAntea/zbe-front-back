import { Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import Favicon from "react-favicon";

import { CalculadoraParticulas } from "./pages/calculadoraParticulas/calculadoraParticulas.tsx";
import CalculoDeEmisiones from "./pages/calculoDeEmisiones/calculoDeEmisiones.tsx";
import Camaraszbe from "./pages/camaras/camaraszbe.tsx";
import EficienciaEnergetica from "./pages/eficienciaEnergetica/eficienciaEnergetica.tsx";
import ImpactoContaminacion from "./pages/impactoContaminacion/impactoContaminacion.tsx";
import MonitorizacionRuido from "./pages/monitorizacionRuido/monitorizacionRuido.tsx";
import NaturalezaContaminacion from "./pages/naturalezaContaminacion/naturalezaContaminacion.tsx";
import PrincipalesContaminantes from "./pages/principalesContaminates/PrincipalesContaminantes.tsx";
import SuperficieContaminada from "./pages/superficieContaminada/superficieContaminada.tsx";
//@ts-ignore
import pdfFile from "./resources/Emisiones contaminantes ZBE.pdf";

import "./App.css";

function App() {
  const [value, setValue] = React.useState("contaminantes");
  const [particulas, setParticulas] = useState<number>(0);
  const cogerDatosParticulas = (datos: number) => {
    setParticulas(datos);
  };
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <div className="App">
      <Favicon
        url={
          "data:image/png;base64,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"
        }
      ></Favicon>
      <header className="App-header">
        <h4>Zona de bajas emisiones - A Coruña</h4>
        <div className="ayuda">
          <button className="admin" onClick={() => setValue("Admin")}>
            Administrador
          </button>

          <a href={pdfFile} target="_blank" rel={"noreferrer"}>
            Ayuda
          </a>
        </div>
      </header>
      <div className="App-body">
        <Tabs className="tabs" value={value} onChange={handleChange}>
          <Tab
            value="contaminantes"
            label="Principales contaminantes"
            wrapped
          ></Tab>
          <Tab
            value="calculo"
            label="Cálculo de emisiones de CO2"
            wrapped
          ></Tab>
          <Tab value="superficie" label="Superficie contaminada" wrapped></Tab>
          <Tab
            value="naturaleza"
            label="Naturaleza y origen de la contaminación"
            wrapped
          ></Tab>
          <Tab
            value="impacto"
            label="Impacto de la contaminación"
            wrapped
          ></Tab>
          <Tab value="eficiencia" label="Eficiencia energética" wrapped></Tab>
          <Tab
            value="monitorizacion"
            label="Monitorización del ruido"
            wrapped
          ></Tab>
          <Tab value="camaras" label="Mapa de las cámaras" wrapped></Tab>
        </Tabs>
        {value === "contaminantes" && <PrincipalesContaminantes />}
        {value === "calculo" && (
          <CalculoDeEmisiones funcion={cogerDatosParticulas} />
        )}
        {value === "superficie" && <SuperficieContaminada />}
        {value === "naturaleza" && <NaturalezaContaminacion />}
        {value === "impacto" && <ImpactoContaminacion />}
        {value === "eficiencia" && <EficienciaEnergetica />}
        {value === "monitorizacion" && <MonitorizacionRuido />}
        {value === "camaras" && <Camaraszbe />}
        {value === "Admin" && <CalculadoraParticulas particulas={particulas} />}
      </div>
    </div>
  );
}

export default App;
