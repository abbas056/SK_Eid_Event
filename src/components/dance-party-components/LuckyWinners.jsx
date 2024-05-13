import React from "react";
import beansIcon from "../../assets/bean.png";
import UsersProgressBar from "./UsersProgressBar";

function LuckyWinners() {
  return (
    <div className="lucky-winners m-auto f-tangoItalic d-flex fd-column al-center jc-center gap-2">
      <div className="top-text c-white">
        Hurry Up! Join the Dance Floor & get a chance <br /> to win the Lucky Beans Rewards upto{" "}
        <span>
          70k <img src={beansIcon} alt="" />
        </span>
      </div>
      <UsersProgressBar />
    </div>
  );
}

export default LuckyWinners;
