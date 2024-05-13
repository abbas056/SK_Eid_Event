import React, { useContext, useState } from "react";
import CoinGame from "../coin-dazzle-components/CoinGame";
import SliderItems from "../rewards-slider/SliderItems";
import BeansPot from "../BeansPot";
import LeaderBoard from "../leaderboard/LeaderBoad";
import { ApiContext } from "../../services/Api";
import { PrevDate, nowDate, slicePlease } from "../../js/helpers";

function EidTossTab({ tab1 }) {
  const { userInfo, eidiToday, eidiPrevious } = useContext(ApiContext);
  const [subTabs, setSubTabs] = useState({
    Today: true,
    Previous: false,
  });

  let arrayData;
  let date;

  if (subTabs.Today) {
    arrayData = eidiToday;
    date = nowDate;
  } else if (subTabs.Previous) {
    arrayData = eidiPrevious;
    date = PrevDate;
  }
  const gamePoints = userInfo?.gamePoints;
  const dailyToss = userInfo?.dailyToss;
  const beansPotVal = userInfo?.beansPotInfo;
  const key = "Daily_User_" + date;
  const potValue = userInfo && beansPotVal[key] ? userInfo && beansPotVal[key] : 0;
  const topWinners = slicePlease(arrayData?.list, 0, 3);
  const restWinners = slicePlease(arrayData?.list, 3, arrayData?.list?.length);

  return (
    <>
      <CoinGame points={gamePoints} dailyToss={dailyToss} />
      <SliderItems />
      <BeansPot potValue={potValue} />
      <LeaderBoard
        tab1={tab1}
        subTabs={subTabs}
        setSubTabs={setSubTabs}
        subBtn1name={"Today"}
        subBtn2name={"Previous"}
        topWinners={topWinners}
        restWinners={restWinners}
        arrayData={arrayData}
        potValue={potValue}
      />
    </>
  );
}

export default EidTossTab;
