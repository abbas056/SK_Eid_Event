import React, { useState } from "react";
import { cross } from "../../js/helpers";
import EventGifts from "../common/EventGifts";
import Content from "./Content";
import down from "../../assets/Popups/Guide/down.png";
import right from "../../assets/Popups/Guide/right.png";
import { guideContent } from "../../js/data";

function GuidePopup({ close, language }) {
  let current;
  language === "Urdu/Hindi" ? (current = guideContent.Urdu) : (current = guideContent.English);
  const [collapsible, setcollapsible] = useState({
    eidiToss: true,
    coinDazzle: false,
    danceParty: false,
    talentTree: false,
    eventGifitng: false,
  });
  const collapsibleSwitch = (id) => {
    let newCat = {
      eidiToss: false,
      coinDazzle: false,
      danceParty: false,
      talentTree: false,
      eventGifitng: false,
    };
    setcollapsible(collapsible ? { ...newCat, [id]: true } : { ...newCat, [id]: false });
  };
  return (
    <div className="p-rel w-100 d-flex al-start jc-center" style={{ height: "100%" }}>
      <div className="guide-popup">
        <div className="title f-sweet m-auto d-flex al-center jc-center p-abs">Guide</div>
        <div className="container fd-column d-flex al-center jc-center gap-4">
          <EventGifts />
          <div className="guide-popup-content fd-column d-flex al-center jc-center f-tangoItalic">
            <div className="heading">How to play</div>
            <div className="top-text">{current.topText}</div>
            <div className="how-to-play d-flex fd-column jc-center gap-2 m-auto">
              <div className="love-dare">
                <div className="toggle-btn p-rel jc-center al-center d-flex">
                  <div className=" title-text f-tangoItalic d-flex al-center jc-center">Eidi Toss</div>
                  <img className="arrow" onClick={() => collapsibleSwitch("eidiToss")} src={collapsible.eidiToss ? down : right} alt="" />
                </div>
                {collapsible.eidiToss && <Content eidiToss={collapsible.eidiToss} language={language} />}
              </div>
              <div className="love-connection">
                <div className="toggle-btn p-rel jc-center al-center d-flex">
                  <div className=" title-text f-tangoItalic d-flex al-center jc-center">Coin Dazzle</div>
                  <img className="arrow" onClick={() => collapsibleSwitch("coinDazzle")} src={collapsible.coinDazzle ? down : right} alt="" />
                </div>
                {collapsible.coinDazzle && <Content coinDazzle={collapsible.coinDazzle} language={language} />}
              </div>
              <div className="true-love">
                <div className="toggle-btn p-rel jc-center al-center d-flex">
                  <div className=" title-text f-tangoItalic d-flex al-center jc-center">Dance Party</div>
                  <img className="arrow" onClick={() => collapsibleSwitch("danceParty")} src={collapsible.danceParty ? down : right} alt="" />
                </div>
                {collapsible.danceParty && <Content danceParty={collapsible.danceParty} language={language} />}
              </div>
              <div className="talent-tree">
                <div className="toggle-btn p-rel jc-center al-center d-flex">
                  <div className=" title-text f-tangoItalic d-flex al-center jc-center">Talent Tree</div>
                  <img className="arrow" onClick={() => collapsibleSwitch("talentTree")} src={collapsible.talentTree ? down : right} alt="" />
                </div>
                {collapsible.talentTree && <Content talentTree={collapsible.talentTree} language={language} />}
              </div>
              <div className="event-gifitng">
                <div className="toggle-btn p-rel jc-center al-center d-flex">
                  <div className=" title-text f-tangoItalic d-flex al-center jc-center">Event Gifting</div>
                  <img className="arrow" onClick={() => collapsibleSwitch("eventGifitng")} src={collapsible.eventGifitng ? down : right} alt="" />
                </div>
                {collapsible.eventGifitng && <Content eventGifitng={collapsible.eventGifitng} language={language} />}
              </div>
            </div>
          </div>
        </div>
        <div className="close p-abs" onClick={close}>
          <img style={{ width: "10vw" }} src={cross()} alt="" />
        </div>
      </div>
    </div>
  );
}

export default GuidePopup;
