import React from "react";

function Loader({ className, tab2 }) {
  return (
    <div className={tab2 ? className : "loader"}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

export default Loader;
