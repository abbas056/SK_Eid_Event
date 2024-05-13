import React from "react";
import RewardSlider, { CarouselItem } from "./RewardSlider";
import { eidiTossRewards } from "../../js/data";
import Base from "../common/Base";
import mascot2 from "../../assets/Mascot-2.png";
function SliderItems({ eventGifting, rewards }) {
  return (
    <>
      <div className={eventGifting ? "rewards-slider m-auto" : "rewards-slider m-auto mt-15"}>
        {eventGifting ? (
          <div className="gifting-rewards d-flex fd-column m-auto p-rel">
            <RewardSlider>
              {rewards &&
                rewards?.map((item, i) => {
                  let index = i + 1;
                  return (
                    <CarouselItem key={i}>
                      <div className="rank d-flex fd-column al-center jc-center p-abs">
                        <span>
                          Top {index}
                          {index === 1 ? <sup>st</sup> : index === 2 ? <sup>nd</sup> : <sup>rd</sup>}
                        </span>
                      </div>
                      <div className="inner-box d-flex fd-column al-center jc-center f-tangoItalic">
                        <div className="target p-abs">{item.target}</div>
                        <div className="rewardImg d-flex al-center jc-center">
                          {item?.frame?.map((_items, index) => (
                            <div className="d-flex fd-column" key={index}>
                              <div className="img-box d-flex al-center jc-center">
                                <img src={_items.pic} alt="" />
                              </div>
                              <div className="desc">{_items.desc}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CarouselItem>
                  );
                })}
            </RewardSlider>
          </div>
        ) : (
          <div className="sliderItem d-flex fd-column m-auto p-rel">
            <div className="title p-abs d-flex al-center jc-center c-white f-sweet">Rewards</div>
            <RewardSlider>
              {eidiTossRewards &&
                eidiTossRewards?.map((item, i) => {
                  let index = i + 1;
                  return (
                    <CarouselItem key={i}>
                      <div className="inner-box d-flex fd-column al-center jc-center f-tangoItalic">
                        <div className="rank d-flex fd-column al-center jc-center p-abs">
                          <span>
                            Top {index} {index === 1 ? <sup>st</sup> : index === 2 ? <sup>nd</sup> : <sup>rd</sup>}
                          </span>
                        </div>
                        <div className="rewardImg d-flex al-center jc-center">
                          {item?.frame?.map((_items, index) => (
                            <div className="img-box d-flex al-center jc-center" key={index}>
                              <img src={_items.pic} alt="" key={index} />
                            </div>
                          ))}
                        </div>
                        <div className="desc d-flex fd-column jc-center al-center">{item.desc}</div>
                      </div>
                    </CarouselItem>
                  );
                })}
            </RewardSlider>
            <Base img1={mascot2} />
          </div>
        )}
      </div>
    </>
  );
}

export default SliderItems;
