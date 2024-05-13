import React from "react";

function MyPoints({ text, icon, points }) {
  return (
    <div className="my-points d-flex al-center jc-center gap-1 m-auto f-tangoItalic" style={{ width: "60%" }}>
      <img src={icon} alt="" />
      <span>
        {text}: {points ? points : 0}
      </span>
    </div>
  );
}

export default MyPoints;
