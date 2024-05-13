import React from "react";
import unknown from "../../../assets/unknown.png";
import { captureImageError, formatData } from "../../../js/helpers";
import { baserUrl } from "../../../js/baserUrl";
import coinIcon from "../../../assets/Coin.png";
import beanIcon from "../../../assets/bean.png";
import gemIcon from "../../../assets/gems.png";
import LeaderBoardSlider from "./../../leaderboard-slider/LeaderBoardSlider";

function RestWinners({
  userName,
  userScore,
  userAvatar,
  index,
  userId,
  listNumber,
  userLevel,
  actorLevel,
  tab1,
  tab2,
  tab3,
  tab4,
  desc,
  gifting,
  talent,
  gifter,
}) {
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
  } else if (tab4) {
    levelUrl = `${baserUrl}streamkar/common/img/tlv/`;
    level = actorLevel;
    icon = beanIcon;
  } else {
    levelUrl = `${baserUrl}streamkar/common/img/ulv/`;
    level = userLevel;
    icon = beanIcon;
  }
  let arrayDesc = desc && JSON.parse(desc);

  return (
    <>
      {tab1 || tab3 || gifting ? (
        <div className="users-details-onward f-tangoItalic" key={index}>
          <div className="d-flex gap-2 al-center p-rel jc-center">
            <div className="rank-id d-flex al-center jc-center">{listNumber}.</div>
            <div className="d-flex al-center gap-2">
              <div className={"frame d-flex al-center jc-center"}>
                <a className="d-flex jc-center al-center" href={`http://www.kktv1.com/m/?roomid=${userId}`}>
                  <img onError={captureImageError} className="user-image" src={userAvatar ? userAvatar : unknown} alt="" />
                </a>
              </div>
              <div className="user-info d-flex fd-column gap-1">
                <span className="username">{userName && userName.slice(0, 8)}</span>
                <img style={talent ? { width: "7vw" } : { width: "10vw" }} src={levelUrl + level + ".png"} alt="" />
              </div>
            </div>
          </div>
          <div className="est-rew d-flex al-center jc-start gap-1">
            <img style={{ width: "5vw", height: "5vw" }} src={icon} alt="" />
            <span>{userScore}</span>
          </div>
        </div>
      ) : (
        <div className="users-details-onward f-tangoItalic" key={index}>
          <div className="d-flex gap-2 al-center p-rel jc-center">
            <div className="rank-id d-flex al-center jc-center">{listNumber}.</div>
            <div className="d-flex al-center gap-2">
              <div className={"frame d-flex al-center jc-center"}>
                <a className="d-flex jc-center al-center" href={`http://www.kktv1.com/m/?roomid=${userId}`}>
                  <img onError={captureImageError} className="user-image" src={userAvatar ? userAvatar : unknown} alt="" />
                </a>
              </div>
              <div className="user-info d-flex fd-column gap-1">
                <span className="username">{userName && userName.slice(0, 8)}</span>
                <img style={tab4 ? { width: "7vw" } : { width: "10vw" }} src={levelUrl + level + ".png"} alt="" />
              </div>
            </div>
          </div>
          <LeaderBoardSlider description={formatData(arrayDesc)} tab2={tab2} tab3={tab3} />
        </div>
      )}
    </>
  );
}

export default RestWinners;
