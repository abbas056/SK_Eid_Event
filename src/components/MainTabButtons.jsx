import React from "react";
import EidTossTab from "./tabs/EidTossTab";
import CoinDazzleTab from "./tabs/CoinDazzleTab";
import DancePartyTab from "./tabs/DancePartyTab";
import TalentTreeTab from "./tabs/TalentTreeTab";

function MainTabButtons({ mainTabs, setMainTabs }) {
  const tabSwitch = (id) => {
    let newCat = {
      tab1: false,
      tab2: false,
      tab3: false,
      tab4: false,
    };
    setMainTabs({ ...newCat, [id]: true });
  };

  const renderingTabs = () => {
    switch (true) {
      case mainTabs.tab1:
        return <EidTossTab tab1={mainTabs.tab1} />;
      case mainTabs.tab2:
        return <CoinDazzleTab tab2={mainTabs.tab2} setMainTabs={setMainTabs} />;
      case mainTabs.tab3:
        return <DancePartyTab tab3={mainTabs.tab3} />;
      case mainTabs.tab4:
        return <TalentTreeTab tab4={mainTabs.tab4} />;
    }
  };
  return (
    <>
      <div className="tab-buttons d-flex jc-s-even ">
        <button onClick={() => tabSwitch("tab1")} className={mainTabs.tab1 ? "gray-0" : "gray-1"}>
          Eidi Toss
        </button>
        <button onClick={() => tabSwitch("tab2")} className={mainTabs.tab2 ? "gray-0" : "gray-1"}>
          Coin Dazzle
        </button>
        <button onClick={() => tabSwitch("tab3")} className={mainTabs.tab3 ? "gray-0" : "gray-1"}>
          Dance Party
        </button>
        <button onClick={() => tabSwitch("tab4")} className={mainTabs.tab4 ? "gray-0" : "gray-1"}>
          Talent Tree
        </button>
      </div>
      <div>{renderingTabs()}</div>
    </>
  );
}

export default MainTabButtons;
