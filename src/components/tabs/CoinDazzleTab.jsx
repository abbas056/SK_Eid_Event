import React, { useContext } from "react";
import LeaderBoard from "../leaderboard/LeaderBoad";
import CoinDazzleMainSection from "../coin-dazzle-components/CoinDazzleMainSection";
import { ApiContext } from "../../services/Api";
function CoinDazzleTab({ tab2, setMainTabs }) {
  const { userInfo, coinDazzle } = useContext(ApiContext);
  const gamePoints = userInfo?.gamePoints;
  const goldCoins = userInfo?.coinCount;
  const coinDazzleWInners = coinDazzle?.list;

  // console.log(coinDazzle);
  return (
    <>
      <CoinDazzleMainSection points={gamePoints} goldCoins={goldCoins} setMainTabs={setMainTabs} tab2={tab2} />
      <LeaderBoard tab2={tab2} restWinners={coinDazzleWInners} arrayData={coinDazzle} />
    </>
  );
}

export default CoinDazzleTab;
