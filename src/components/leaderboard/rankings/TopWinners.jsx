import React from "react";
import unknown from "../../../assets/unknown.png";
import frame1 from "../../../assets/1st-User-Frame.png";
import frame2 from "../../../assets/2nd-user-Frame.png";
import frame3 from "../../../assets/3rd-User-Frame.png";
import { captureImageError, currencySlang, estBeans } from "../../../js/helpers";
import { baserUrl } from "../../../js/baserUrl";
import beanIcon from "../../../assets/bean.png";
import coinIcon from "../../../assets/Coin.png";
import gemIcon from "../../../assets/gems.png";

function TopWinners({ userName, userScore, userAvatar, userId, index, userLevel, actorLevel, tab1, potValue, gifting, talent, gifter, subTabs }) {
  let levelUrl;
  let level;
  let icon;
  if (tab1) {
    levelUrl = `${baserUrl}streamkar/common/img/ulv/`;
    level = userLevel;
    icon = coinIcon;
  } else if (gifting) {
    if (talent) {
      levelUrl = `${baserUrl}streamkar/common/img/tlv/`;
      level = actorLevel;
      icon = `${baserUrl}streamkar/rewards/gems.png`;
    } else if (gifter) {
      levelUrl = `${baserUrl}streamkar/common/img/ulv/`;
      level = userLevel;
      icon = beanIcon;
    }
  } else {
    levelUrl = `${baserUrl}streamkar/common/img/ulv/`;
    level = userLevel;
    icon = beanIcon;
  }
  let rank = index + 1;

  return (
    <div className="innerData p-rel f-tangoItalic">
      <div className={rank == 1 ? "first-user" : "runner-user"}>
        <img onError={captureImageError} className="rank-user-image" src={userAvatar ? userAvatar : unknown} alt="" />
        <a href={`http://www.kktv1.com/m/?roomid=${userId}`}>
          <img className="rank-border-image p-rel" src={rank === 1 ? frame1 : rank === 2 ? frame2 : frame3} alt="" />
        </a>
      </div>
      <div className={rank === 1 ? "bottom-data-1" : rank === 2 ? "bottom-data-2" : "bottom-data-3"}>
        <div className="bottom-info">
          <div className="username">{userName && userName.slice(0, 10)}</div>
          <img style={talent ? { width: "7vw" } : { width: "10vw" }} src={levelUrl + level + ".png"} alt="" />
        </div>
        <div className="score-box d-flex fd-column al-center">
          <div className="points d-flex al-center jc-center gap-1">
            <img style={{ width: "5vw", height: "5vw" }} src={icon} alt="" />
            <span> {userScore}</span>
          </div>
          {gifting ? null : (
            <div className="score d-flex al-center fd-column">
              <span>{subTabs.Today ? "Estimated beans" : "Beans Won"}</span>
              <div className="d-flex al-center jc-center">
                <img style={{ width: "3vw" }} src={beanIcon} alt="" />
                <span> {estBeans(potValue, rank)}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TopWinners;
