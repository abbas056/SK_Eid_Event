import React from "react";
import MyPoints from "../common/MyPoints";
import eidiPointsIcon from "../../assets/game-assets/shake-tree/Talent-Point-Icon.png";
import ShakeTreeGame from "./ShakeTreeGame";
import Base from "../common/Base";
import mascot1 from "../../assets/Mascot1.png";

function TalentTreeMainSection({ points }) {
  return (
    <div className="talentTree-mainSection p-rel m-auto">
      <MyPoints text="My Talent Points" icon={eidiPointsIcon} points={points} />
      <ShakeTreeGame points={points} />
      <Base img1={mascot1} />
    </div>
  );
}

export default TalentTreeMainSection;
