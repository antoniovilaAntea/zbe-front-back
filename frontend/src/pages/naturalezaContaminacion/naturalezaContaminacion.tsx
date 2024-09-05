import React from "react";

import "./naturalezaContaminacion.css";

const NaturalezaContaminacion = () => {
  return (
    <>
      <div style={{ color: "#53a5dc" }}>
        Sectores y fuentes de emisión responsables de la contaminación
      </div>
      <div className="naturaleza">
        <div id="divImagen">
          <img
            src="https://i.ibb.co/KK8J4rV/Coru-a.png"
            alt="Coru-a"
            width="100%"
            height="100%"
          />
        </div>
        <div className="naturaleza__graphs">
          <div className="naturaleza__graphs__first">
            <div className="naturaleza__graphs__first__one">
              <p>Actividad industrial</p>
              <iframe
                title="industria"
                width="600"
                height="400"
                seamless
                frameBorder="0"
                scrolling="no"
                src="http://localhost:8088/superset/explore/p/DJy45zGlVdM/?standalone=1&height=400"
              ></iframe>
            </div>
            <div className="naturaleza__graphs__first__two">
              <p>Trafico rodado</p>
              <iframe
                title="trafico"
                width="600"
                height="400"
                seamless
                frameBorder="0"
                scrolling="no"
                src="http://localhost:8088/superset/explore/p/OGZl38zpw3q/?standalone=1&height=400"
              ></iframe>
            </div>
          </div>
          <div className="naturaleza__graphs__second">
            <p>Actividad portuaria</p>
            <iframe
              title="puertos"
              width="600"
              height="400"
              seamless
              frameBorder="0"
              scrolling="no"
              src="http://localhost:8088/superset/explore/p/39ZldqvpJO2/?standalone=1&height=400"
            ></iframe>
          </div>
        </div>
      </div>
    </>
  );
};

export default NaturalezaContaminacion;
