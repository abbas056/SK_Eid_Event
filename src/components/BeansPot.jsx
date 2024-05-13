import React from "react";
import beansPot from "../assets/Beans-Pot.png";
import Base from "./common/Base";
import mascot3 from "../assets/Mascot-3.png";
import beanIcon from "../assets/bean.png";
function BeansPot({ potValue }) {
  return (
    <div className="beans-pot m-auto d-flex fd-column al-center jc-end c-white p-rel" style={{ marginTop: "-7vw" }}>
      <div className="beans-pot-title p-abs d-flex al-center jc-center c-white f-sweet">Beans Pot</div>
      <img className="beans-pot-img" src={beansPot} alt="" />
      <div className="beans-pot-value d-flex al-center jc-center f-tangoItalic">
        <img src={beanIcon} alt="" />
        <span>{potValue ? potValue : 0}</span>
      </div>
      <Base img1={mascot3} />
    </div>
  );
}

export default BeansPot;
