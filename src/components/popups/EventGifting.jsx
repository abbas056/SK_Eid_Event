import React, { useContext, useState } from "react";
import { cross } from "../../js/helpers";
import EventGifts from "../common/EventGifts";
import SubButtons from "../sub-tabs/SubButtons";
import SliderItems from "../rewards-slider/SliderItems";
import GifitngLeaderboard from "../leaderboard/GifitngLeaderboard";
import { giftingGifterrewards, giftingTalnetrewards } from "../../js/data";
import { ApiContext } from "../../services/Api";

function EventGifting({ close, eventGifting }) {
  const [subButtons, setsubButtons] = useState({
    Gifters: true,
    Talents: false,
  });

  let rewards;
  if (subButtons.Gifters) {
    rewards = giftingGifterrewards;
  } else if (subButtons.Talents) {
    rewards = giftingTalnetrewards;
  }
  return (
    <div className="p-rel w-100 d-flex al-start jc-center" style={{ height: "100%" }}>
      <div className="event-gifting">
        <div className="title f-sweet m-auto d-flex al-center jc-center p-abs">Event Gifitng</div>
        <div className="container f-tangoItalic">
          <EventGifts />
          <div className="gift-content d-flex fd-column al-center jc-center gap-4">
            <div className="heading">Gifting Rewards</div>

            <div className="topText d-flex al-center jc-center">Rewards for Talents and Gifters</div>
            <SubButtons subTabs={subButtons} setSubTabs={setsubButtons} subBtn1name={"Gifters"} subBtn2name={"Talents"} />
            <SliderItems eventGifting={eventGifting} rewards={rewards} />
          </div>
          <GifitngLeaderboard eventGifting={eventGifting} />
        </div>
        <div className="close p-abs" onClick={close}>
          <img style={{ width: "10vw" }} src={cross()} alt="" />
        </div>
      </div>
    </div>
  );
}

export default EventGifting;
