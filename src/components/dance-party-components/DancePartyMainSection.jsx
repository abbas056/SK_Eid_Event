import React from "react";
import eidiPointsIcon from "../../assets/eidi-point-icon.png";
import MyPoints from "../common/MyPoints";
import LuckyWinners from "./LuckyWinners";
import Base from "../common/Base";
import mascot1 from "../../assets/Mascot1.png";
import DanceFloor from "./DanceFloor";

function DancePartyMainSection({ points }) {
  return (
    <div className="danceParty-mainSection p-rel m-auto">
      <MyPoints text="My Eidi Points" icon={eidiPointsIcon} points={points} />
      <LuckyWinners />
      <DanceFloor points={points} icon={eidiPointsIcon} />
      <Base img1={mascot1} />
    </div>
  );
}

export default DancePartyMainSection;
