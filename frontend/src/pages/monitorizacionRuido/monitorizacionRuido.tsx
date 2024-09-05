import React from "react";
import MapRuido from "../../components/Map/MapRuido";

import "./monitorizacionRuido.css";

const MonitorizacionRuido = () => {
  const locations: any[] = [
    [
      43.36933215423054,
      -8.394225144275454,
      56.5,
      58.5,
      52.6,
      60.2,
      "Plaza Acárraga",
    ],
    [
      43.36959515342127,
      -8.399702765128755,
      65.4,
      0,
      55.2,
      64.9,
      "Avda. Marina",
    ],
    [43.37140449029051, -8.397882805793941, 0, 0, 0, 0, "Plaza del Humor"],
    [
      43.37183175226144,
      -8.40208765544876,
      63.9,
      64.2,
      54.8,
      65,
      "Orzan Calle Sol Esq Calle Socorro",
    ],
    [
      43.36908238907953,
      -8.404965844706524,
      59.7,
      64.6,
      57.3,
      64.9,
      "Plaza Josep Sellier Loup",
    ],
    [
      43.36780330400627,
      -8.403151655930689,
      69.3,
      0,
      58.9,
      68.7,
      "Cantón Grande",
    ],
    [
      43.36719376036105,
      -8.408884503050039,
      69.4,
      70.8,
      62.5,
      71.5,
      "Juan Flórez",
    ],
    [
      43.35569730673706,
      -8.405849393636199,
      75.4,
      77.3,
      68,
      77.5,
      "Alfonso Molina",
    ],
  ];

  return (
    <div className="monitorizacion">
      <div className="monitorizacion__row">
        <MapRuido id="map1" tipo="ld" locations={locations}></MapRuido>
        <MapRuido id="map2" tipo="le" locations={locations}></MapRuido>
        <div className="estaciones">
          <ul>
            <li>Zona 1:</li>
            <ul>
              <li>Plaza Acárraga</li>
              <li>Avda. Marina</li>
              <li>Plaza del Humor</li>
              <li>Orzan Calle Sol Esq Calle Socorro</li>
              <li>Plaza Josep Sellier Loup</li>
              <li>Cantón Grande</li>
              <li>Juan Flórez</li>
            </ul>
            <li>Zona 2:</li>
            <ul>
              <li>Alfonso Molina</li>
            </ul>
          </ul>
        </div>
      </div>
      <div className="monitorizacion__texto">
        <p>Ruido Ld</p>
        <p>Ruido Le</p>
        <p></p>
      </div>
      <div className="monitorizacion__row">
        <MapRuido id="map3" tipo="ln" locations={locations}></MapRuido>
        <MapRuido id="map4" tipo="all" locations={locations}></MapRuido>
        <div>
          <img
            src="https://i.ibb.co/ygCg6PC/ruido.png"
            alt="Leyenda de colores y valores comprendidos: Verde entre 50 y 55db, amarillo entre 55 y 60db, naranja claro entre 60 y 65db, naranja oscuro entre 65 y 70 db y rojo mas de 70db"
          ></img>
        </div>
      </div>
      <div className="monitorizacion__texto">
        <p>Ruido Ln</p>
        <p>Ruido Lden</p>
        <p></p>
      </div>
    </div>
  );
};

export default MonitorizacionRuido;
