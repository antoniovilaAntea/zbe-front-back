import { Tab, Tabs } from "@mui/material";
import React, { useState } from "react";

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
