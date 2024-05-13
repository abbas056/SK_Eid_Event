import React, { useState, useRef, useContext } from "react";
import TopWinners from "./rankings/TopWinners";
import RestWinners from "./rankings/RestWinners";
import Loader from "./../common/Loader";
import SeeButton from "./../common/SeeButton";
import { ApiContext } from "../../services/Api";
import { slicePlease } from "../../js/helpers";
import SubButtons from "../sub-tabs/SubButtons";
import mascot2 from "../../assets/Mascot-2.png";
import mascot from "../../assets/Mascot.png";
import Base from "../common/Base";

function LeaderBoard({ tab1, tab2, tab3, tab4, subTabs, setSubTabs, subBtn1name, subBtn2name, topWinners, restWinners, arrayData, potValue }) {
  const { isLoading } = useContext(ApiContext);
  const [active, setActive] = useState(true);
  const restBoard = useRef(null);
  const handleChangeActive = () => {
    setActive((previous) => {
      return !previous;
    });
    if (!active) {
      restBoard.current.scrollTop = 0;
    }
  };
  return (
    <>
      {tab1 ? (
        <div className="leaderboard p-rel m-auto" style={{ padding: "30vw 0" }}>
          <div className="leaderboard-title m-auto p-abs d-flex al-center jc-center c-white f-sweet" style={{ top: "5vw" }}>
            Leaderboard
          </div>
          <SubButtons subTabs={subTabs} setSubTabs={setSubTabs} subBtn1name={subBtn1name} subBtn2name={subBtn2name} />
          {isLoading ? (
            <Loader />
          ) : (
            <div className="rank-section">
              {arrayData?.count === 0 ? (
                <p className="no-data f-acme">No Data Found</p>
              ) : (
                <div className="rank-section-inner">
                  <div className="top-position-holders d-flex jc-center al-center m-auto">
                    {topWinners?.map(({ nickname, userScore, userLevel, actorLevel, portrait, userId, expectBeans }, index) => {
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
                            tab1={tab1}
                            tab2={tab2}
                            tab3={tab3}
                            potValue={potValue}
                            subTabs={subTabs}
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
                    {restWinners &&
                      restWinners?.map(({ nickname, userScore, userLevel, actorLevel, portrait, userId, expectBeans }, index) => (
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
                            tab1={tab1}
                            tab2={tab2}
                            tab3={tab3}
                            subTabs={subTabs}
                          />
                        </div>
                      ))}
                  </div>
                </div>
              )}
              {arrayData?.count > 10 ? <SeeButton active={active} handleChangeActive={handleChangeActive} /> : null}
            </div>
          )}
          <Base img1={mascot2} />
        </div>
      ) : (
        <div
          className="leaderboard p-rel m-auto"
          style={
            tab3
              ? { padding: "50vw  0 30vw 0", marginTop: "-10vw" }
              : tab4
              ? { padding: "30vw 0", marginTop: "-10vw" }
              : { padding: "30vw 0", marginTop: "-5vw" }
          }
        >
          <div
            className="leaderboard-title m-auto p-abs d-flex al-center jc-center c-white f-sweet"
            style={tab3 ? { top: "15vw" } : tab2 ? { top: "10vw" } : { top: "10vw" }}
          >
            {tab2 ? "Winners" : tab3 ? "Lucky Winners" : "Leaderboard"}
          </div>
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {tab3 && arrayData?.count === 0 ? (
                <div className="announcement d-flex fd-column al-center jc-center c-white f-tangoItalic gap-2">
                  <img src={mascot} alt="" />
                  <div className="info">
                    The dance Party is yet <br />
                    to commence
                  </div>
                </div>
              ) : (
                <>
                  {tab3 ? (
                    <div className="announcement d-flex fd-column al-center jc-center c-white f-tangoItalic gap-2">
                      <div className="last-lucky-winner d-flex al-center jc-center">Last Lucky winners</div>
                    </div>
                  ) : null}
                  <div className="rank-section">
                    {arrayData?.count === 0 ? (
                      <p className="no-data f-acme">No Data Found</p>
                    ) : (
                      <div className="rank-section-inner">
                        <div
                          ref={restBoard}
                          className={active ? "rest-position-holders " : "rest-position-holders rest-position-holders-max"}
                          style={{ maxHeight: "175vw" }}
                        >
                          {restWinners &&
                            restWinners?.map(({ nickname, userScore, userLevel, actorLevel, portrait, userId, expectBeans, desc }, index) => (
                              <div key={index}>
                                <RestWinners
                                  userName={nickname}
                                  userScore={userScore}
                                  userAvatar={portrait}
                                  index={index}
                                  userId={userId}
                                  listNumber={index + 1}
                                  userLevel={userLevel}
                                  actorLevel={actorLevel}
                                  expectBeans={expectBeans}
                                  tab2={tab2}
                                  tab3={tab3}
                                  tab4={tab4}
                                  desc={desc}
                                />
                              </div>
                            ))}
                        </div>
                      </div>
                    )}
                    {arrayData?.count > 10 ? <SeeButton active={active} handleChangeActive={handleChangeActive} /> : null}
                  </div>
                </>
              )}
            </>
          )}
          <Base img1={mascot2} />
        </div>
      )}
    </>
  );
}

export default LeaderBoard;
