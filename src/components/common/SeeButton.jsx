import React from "react";

function SeeButton({ active, handleChangeActive }) {
  return (
    <div className="see-buttons ">
      {active ? (
        <button className="m-auto" onClick={handleChangeActive}>
          See More
        </button>
      ) : (
        <button className="m-auto" onClick={handleChangeActive}>
          See Less
        </button>
      )}
    </div>
  );
}

export default SeeButton;
