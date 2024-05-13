import React from "react";
import { rewardImages } from "../../js/helpers";

const SliderItem = ({ item, tab2, tab3 }) => {
  return (
    <div
      className="slider-item d-flex fd-column al-center jc-center gap-1"
      style={tab2 ? { width: "12vw" } : tab3 ? { width: "15vw" } : { width: "12vw" }}
    >
      <img style={{ width: "5vw" }} src={rewardImages(item.desc)} />
      {
        <span className="desc" style={{ fontSize: "2vw", fontWeight: "700", color: "#0c58a9" }}>
          x
          {item.desc === "Coins" || item.desc === "Beans" || item.desc === "Gems" ? (
            <>{item.count}</>
          ) : (
            <>
              {item.count} {item.count === 1 ? "day" : "days"}
            </>
          )}
        </span>
      }
    </div>
  );
};

export default SliderItem;
