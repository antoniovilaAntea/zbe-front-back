import React from "react";

const ImpactoContaminacion = () => {
  return (
    <div className="impactoContaminacion">
      <iframe
        title="Contaminacion"
        width="1200"
        height="900"
        seamless
        frameBorder="0"
        scrolling="no"
        src="http://localhost:8088/superset/explore/p/LgWNYPEpajq/?standalone=1&height=400"
      ></iframe>
    </div>
  );
};

export default ImpactoContaminacion;
