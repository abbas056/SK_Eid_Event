import React, { useContext, useEffect, useState } from "react";
import coinIcon from "../../assets/coin-icon.png";
import barInner from "../../assets/filled-bar.png";
import beanIcon from "../../assets/bean.png";
import openBeanBag from "../../assets/Open-bean-bag.png";
import closeBeanBag from "../../assets/close-bean-bag.png";
import { barWidth, currencySlang } from "../../js/helpers";
import { ApiContext } from "../../services/Api";
function Tab2ProgressBar({ goldCoins }) {
  const { userInfo } = useContext(ApiContext);
  const [sumOfRewards, setSumOfRewards] = useState(0);
  const coinRewardConfigList = userInfo?.coinRewardConfigList;
  const coinCount = userInfo?.coinCount;
  const totalBeans = userInfo?.coinCount;

  useEffect(() => {
    let sum = 0;
    coinRewardConfigList?.forEach((item) => {
      if (item.isComplete) {
        sum += item.rewards;
      }
    });
    setSumOfRewards(sum);
  }, [coinRewardConfigList]);

  return (
    <div className="tab2-progressBar m-auto d-flex fd-column al-center jc-center gap-1 f-tangoItalic">
      <div className="my-gold-coins d-flex al-center jc-center gap-1 c-white">
        <img src={coinIcon} alt="" />
        <span>My Gold Coins: {goldCoins ? goldCoins : 0}</span>
      </div>
      <div className="text">
        Collect Certain Gold Coins to get <br />
        <span style={{ color: "#0151aa" }}>Beans Bonus Rewards</span>
      </div>
      <div className="progress-bar m-auto d-flex al-center jc-center p-rel">
        <div className="bean-bags p-abs w-100 d-flex jc-s-even">
          {coinRewardConfigList?.map((item, i) => {
            const isComplete = item.isComplete;
            return (
              <div className="box d-flex fd-column al-center jc-center" key={i}>
                <div className="d-flex al-center jc-center" style={{ gap: "0.3vw" }}>
                  <span> {item.target}</span> <img className="icon" src={coinIcon} alt="" />
                </div>
                <img src={isComplete === true ? openBeanBag : closeBeanBag} alt="" />
                <div className="d-flex al-center jc-center" style={{ gap: "0.3vw" }}>
                  <span> {currencySlang(item.rewards)}</span> <img className="icon" src={beanIcon} alt="" />
                </div>
              </div>
            );
          })}
        </div>
        <div className="bar-filled m-auto d-flex al-center">
          <img style={{ width: `${barWidth(coinCount)}%`, height: "3vw" }} src={barInner} alt="" />
        </div>
      </div>
      <div className="total-beans d-flex al-center jc-center gap-1 c-white">
        <span>Total Beans Rewards:</span> <img src={openBeanBag} alt="" /> <span>{sumOfRewards ? sumOfRewards : 0}</span>{" "}
        <img src={beanIcon} alt="" />
      </div>
    </div>
  );
}

export default Tab2ProgressBar;
