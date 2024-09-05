import React, { useState } from "react";
import Mapa from "../../components/Map/Map.tsx";

import "./superficieContaminada.css";

const SuperficieContaminada = () => {
  const [zona, setZona] = useState("");
  const numpobZona1 = 8870;
  const numpobZona2 = 23365;
  const numsupZona1 = 2.2;
  const numsupZona2 = 2.7;
  const pobZona1 = "< " + numpobZona1.toString();
  const supZona1 = "< " + numsupZona1.toString();
  const pobZona2 = "< " + numpobZona2.toString();
  const supZona2 = "< " + numsupZona2.toString();
  const pobTotal = "< " + (numpobZona1 + numpobZona2).toString();
  const supTotal = "< " + (numsupZona1 + numsupZona2).toString();
  return (
    <div className="superficie">
      <Mapa zona={zona}></Mapa>
      <table id="tablaSuperficie">
        <thead>
          <tr>
            <th>SECCIÓN </th>
            <th>
              SUPERFICIE CONTAMINADA (km<sup>2</sup>)
            </th>
            <th>POBLACIÓN</th>
          </tr>
        </thead>
        <tbody>
          <tr
            id="seccion1"
            onMouseEnter={() => setZona("Zona 1")}
            onMouseLeave={() => setZona("")}
          >
            <td>
              <label id="sectionC" />
              Zona 1
            </td>
            <td>
              <label id="periodInteresC" />
              {supZona1}
            </td>
            <td>
              <label id="superficieContaminadaC" />
              {pobZona1}
            </td>
          </tr>
          <tr
            onMouseEnter={() => setZona("Zona 2")}
            onMouseLeave={() => setZona("")}
          >
            <td>
              <label id="sectionC" />
              Zona 2
            </td>
            <td>
              <label id="periodInteresC" />
              {supZona2}
            </td>
            <td>
              <label id="superficieContaminadaC" />
              {pobZona2}
            </td>
          </tr>
          <tr>
            <td>
              <label id="sectionC" />
              Total
            </td>
            <td>
              <label id="periodInteresC" />
              {supTotal}
            </td>
            <td>
              <label id="superficieContaminadaC" />
              {pobTotal}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default SuperficieContaminada;
