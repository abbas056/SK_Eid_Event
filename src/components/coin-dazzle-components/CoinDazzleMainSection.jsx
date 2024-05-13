import React from "react";
import MyPoints from "../common/MyPoints";
import eidiPointsIcon from "../../assets/eidi-point-icon.png";
import Tab2ProgressBar from "./Tab2ProgressBar";
import CoinDazzleGame from "./CoinDazzleGame";
import Tab2DailyTasks from "./Tab2DailyTasks";
import Base from "../common/Base";
import mascot1 from "../../assets/Mascot1.png";

function CoinDazzleMainSection({ points, goldCoins, setMainTabs, tab2 }) {
  return (
    <div className="coinaDazzle-main-section m-auto p-rel">
      <MyPoints text="My Eidi Points" icon={eidiPointsIcon} points={points} />
      <Tab2ProgressBar goldCoins={goldCoins} />
      <CoinDazzleGame points={points} />
      <Tab2DailyTasks setMainTabs={setMainTabs} tab2={tab2} />
      <Base img1={mascot1} />
    </div>
  );
}

export default CoinDazzleMainSection;
