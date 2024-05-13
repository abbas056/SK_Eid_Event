import React, { useState, useRef, useContext } from "react";
import TopWinners from "./rankings/TopWinners";
import RestWinners from "./rankings/RestWinners";
import Loader from "./../common/Loader";
import SeeButton from "./../common/SeeButton";
import { ApiContext } from "../../services/Api";
import { slicePlease } from "../../js/helpers";
import SubButtons from "../sub-tabs/SubButtons";

function GifitngLeaderboard({ eventGifting }) {
  const { isLoading, totalBeansSend, totalBeansReceived } = useContext(ApiContext);
  const [active, setActive] = useState(true);
  const restBoard = useRef(null);

  const [subButtons, setsubButtons] = useState({
    Gifters: true,
    Talents: false,
  });
  const handleChangeActive = () => {
    setActive((previous) => {
      return !previous;
    });
    if (!active) {
      restBoard.current.scrollTop = 0;
    }
  };
  let winners;
  if (subButtons.Gifters) {
    winners = totalBeansSend?.list;
  } else if (subButtons.Talents) {
    winners = totalBeansReceived?.list;
  }
  const topData = slicePlease(winners, 0, 3);
  const restData = slicePlease(winners, 3, winners?.length);

  return (
    <>
      <div className="gifitng-leaderboard p-rel m-auto">
        <div className="leaderboard-title m-auto p-abs d-flex al-center jc-center c-white f-sweet" style={{ top: "-6vw" }}>
          Leaderboard
        </div>
        <SubButtons subTabs={subButtons} setSubTabs={setsubButtons} subBtn1name={"Gifters"} subBtn2name={"Talents"} />
        {isLoading ? (
          <Loader />
        ) : (
          <div className="rank-section">
            {winners?.length == 0 ? (
              <p className="no-data f-acme">No Data Found</p>
            ) : (
              <div className="rank-section-inner">
                <div className="top-position-holders d-flex jc-center al-center m-auto">
                  {topData?.map(({ nickname, userScore, userLevel, actorLevel, portrait, userId, expectBeans }, index) => {
                    return (
                      <div className="user-container p-rel" key={index}>
                        <TopWinners
                          userName={nickname}
                          userScore={userScore}
                          userAvatar={portrait}
                          userId={userId}
                          index={index}
                          userLevel={userLevel}
                          actorLevel={actorLevel}
                          expectBeans={expectBeans}
                          gifting={eventGifting}
                          talent={subButtons.Talents}
                          gifter={subButtons.Gifters}
                        />
                      </div>
                    );
                  })}
                </div>
                <div
                  ref={restBoard}
                  className={active ? "rest-position-holders " : "rest-position-holders rest-position-holders-max"}
                  style={{ maxHeight: "120vw" }}
                >
                  {restData &&
                    restData?.map(({ nickname, userScore, userLevel, actorLevel, portrait, userId, expectBeans }, index) => (
                      <div key={index}>
                        <RestWinners
                          userName={nickname}
                          userScore={userScore}
                          userAvatar={portrait}
                          index={index}
                          userId={userId}
                          listNumber={index + 4}
                          userLevel={userLevel}
                          actorLevel={actorLevel}
                          expectBeans={expectBeans}
                          gifting={eventGifting}
                          talent={subButtons.Talents}
                          gifter={subButtons.Gifters}
                        />
                      </div>
                    ))}
                </div>
              </div>
            )}
            {winners?.length > 10 || restData?.length > 10 ? <SeeButton active={active} handleChangeActive={handleChangeActive} /> : null}
          </div>
        )}
      </div>
    </>
  );
}

export default GifitngLeaderboard;
