import React from "react";
import giftBox from "../../assets/Gift-Box.png";
function Base({ img1 }) {
  return (
    <div className="base p-abs d-flex jc-s-between al-end">
      <img src={img1} alt="" />
      <img src={giftBox} alt="" />
    </div>
  );
}

export default Base;
