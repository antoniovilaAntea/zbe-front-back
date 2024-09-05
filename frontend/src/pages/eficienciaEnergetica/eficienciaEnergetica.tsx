import React from "react";

import "./eficienciaEnergetica.css";

const EficienciaEnergetica = () => {
  return (
    <div className="eficiencia">
      <div className="emisiones">
        <iframe
          height="350px"
          width="700px"
          frameBorder={0}
          title="Emisiones"
          src="http://localhost:8088/superset/explore/p/GOXpR0Rq4Wd/?standalone=3&height=350"
        ></iframe>
        <p>Emisiones (Tn CO²/hora)</p>
      </div>
      <div className="consumo">
        <iframe
          height="350px"
          width="700px"
          frameBorder={0}
          title="Consumo"
          src="http://localhost:8088/superset/explore/p/E7aN88PbN9y/?standalone=3&height=350"
        ></iframe>
        <p>Consumo (TEP/hora)</p>
      </div>
      <div className="combustible">
        <iframe
          height="350px"
          width="700px"
          title="Combustible"
          frameBorder={0}
          src="http://localhost:8088/superset/explore/p/zXVloWjvlZd/?standalone=3&height=350"
        ></iframe>
        <p>Combustible (litros)</p>
      </div>
      <div className="energia">
        <iframe
          height="350px"
          width="700px"
          frameBorder={0}
          title="Energia"
          src="http://localhost:8088/superset/explore/p/LgeN2mo7pxk/?standalone=3&height=350"
        ></iframe>
        <p>Energía consumida (MWh/hora)</p>
      </div>
    </div>
  );
};

export default EficienciaEnergetica;
