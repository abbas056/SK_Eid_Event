import React, { useContext, useEffect, useState } from "react";
import { luckyUsersProgressBar } from "../../js/data";
import beanIcon from "../../assets/bean.png";
import filledBar from "../../assets/loading-bar-inner.png";
import { ApiContext } from "../../services/Api";
import { amount, currencySlang, noOfUsers } from "../../js/helpers";

function UsersProgressBar() {
  const { userInfo } = useContext(ApiContext);
  const partyCount = userInfo?.dancePartyUserCount;
  const configList = userInfo?.danceGameConfigList;

  const getRewardData = () => {
    const config = configList?.find((config) => partyCount <= config.userCount);
    return config ? (
      <div>
        Rewards for {config.luckyUserCount} lucky users ={" "}
        <img style={{ width: "4vw", height: "4vw", verticalAlign: "bottom" }} src={beanIcon} alt="" /> {config.beans}
      </div>
    ) : null;
  };

  const currentChunkIndex = configList?.findIndex((config) => partyCount <= config?.userCount);
  const progressPercentage = userInfo && currentChunkIndex * 20 + (partyCount / configList[currentChunkIndex]?.userCount) * 20;
  const progressBarStyle = {
    width: userInfo ? `${progressPercentage}%` : `${0}%`,
    backgroundColor: "blue",
    height: "20px",
  };
  return (
    <div className="lucky-bar w-80 m-auto d-flex fd-column al-center jc-center gap-2">
      <div className="rewards-lucky-users m-auto d-flex al-center jc-center">
        {getRewardData() ? (
          getRewardData()
        ) : (
          <span>
            Rewards for 4 lucky users = <img style={{ width: "4vw", height: "4vw", verticalAlign: "bottom" }} src={beanIcon} alt="" /> 700
          </span>
        )}
      </div>
      <div className="lucky-bar-top w-100 d-flex al-center jc-center">
        {configList?.map((item, i) => {
          return (
            <div className="w-100 progress d-flex al-center jc-center" key={i}>
              <span>{currencySlang(item.beans)}</span>
              <img src={beanIcon} alt="" />
            </div>
          );
        })}
      </div>
      <div className="lucky-bar-bottom d-flex al-center jc-start">
        <img src={filledBar} alt="" style={progressBarStyle} />
      </div>
      <div className="lucky-bar-top w-100 d-flex al-center jc-center">
        {configList?.map((item, i) => {
          return (
            <div className="w-100 progress d-flex al-center jc-center" key={i}>
              <span>{item.userCount}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default UsersProgressBar;
