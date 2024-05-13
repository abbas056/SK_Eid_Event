import React from "react";
import { cross, rewardImages } from "../../js/helpers";
import Loader from "../common/Loader";

function RecordsPopup({ tab1, tab2, tab3, tab4, close, loadMore, isLoading, gameRecord }) {
  let rewardsList = gameRecord?.data?.list ? gameRecord?.data?.list : [];
  return (
    <div className="p-rel w-100 d-flex al-start jc-center" style={{ height: "100%" }}>
      <div className="records-popup p-rel">
        <div className="inner-content p-rel">
          <div className="title f-sweet m-auto d-flex al-center jc-center p-abs">Records</div>
          <div className="table m-auto d-flex jc-center al-start f-acme fd-column">
            <div className="heading d-flex f-bold">
              <div className="border-1 d-flex  al-center jc-center" style={tab1 || tab2 ? { width: "30%" } : { width: "40%" }}>
                Time (GMT)
              </div>
              {tab1 || tab2 ? <div className="w-30 border-1 d-flex  al-center jc-center">{tab1 ? "Toss Result" : "Coins Earned"}</div> : null}
              <div className="w-60 border-1 d-flex  al-center jc-center">Rewards</div>
            </div>
            {isLoading ? (
              <Loader />
            ) : (
              <div className={gameRecord?.data?.count === 0 ? "table-data d-flex al-center jc-center" : "table-data d-flex al-start jc-center"}>
                {gameRecord?.data?.count === 0 ? (
                  <p className="no-data f-acme w-100">No Records Found</p>
                ) : (
                  <div className="content d-flex fd-column">
                    {rewardsList?.map((array, index) => {
                      const apiDate = array.time;
                      const rewardDTOList = array?.rewardDTOList;
                      const formattedDate = new Date(apiDate).toLocaleString();
                      const score = array?.score;
                      const winScore = Math.floor(score / 1000);
                      const lossScore = Math.floor(score % 1000);
                      return (
                        <div key={index} className="d-flex w-100">
                          <div
                            className="bg-sky-blue border-1 d-flex al-center bg-light-blue jc-center"
                            style={tab1 || tab2 ? { width: "30%" } : { width: "40%" }}
                          >
                            {formattedDate}
                          </div>
                          {tab1 || tab2 ? (
                            <div className="w-30 bg-sky-blue border-1 d-flex  al-center jc-center" style={{ whiteSpace: "pre-line" }}>
                              {tab1
                                ? `${score === 1 ? "Loss" : score === 1000 ? "Win" : winScore + " " + "Wins" + "\n" + lossScore + " " + "Loss"}`
                                : `${score}`}
                            </div>
                          ) : null}
                          <div className=" w-60 bg-sky-blue border-1 d-flex f-wrap bg-light-blue jc-center al-start  gap-1">
                            {rewardDTOList?.map((obj, index) => {
                              return (
                                <div key={index} className="rews d-flex al-center jc-center fd-column gap-1" style={{ width: "10vw" }}>
                                  <div className="rew-img d-flex al-center jc-center">
                                    <img src={rewardImages(obj.desc)} alt="" />
                                  </div>
                                  <div className="desc">
                                    {obj.desc == "Coins" || obj.desc == "Beans" || obj.desc == "Gems" ? (
                                      <>
                                        {obj.desc} {obj.count}
                                      </>
                                    ) : (
                                      <>
                                        {obj.desc} x {obj.count}
                                      </>
                                    )}
                                    {obj.desc == "Coins" || obj.desc == "Beans" || obj.desc == "Gems" ? null : (
                                      <>{obj.count == 1 ? " day" : " days"}</>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
          {isLoading ? null : (
            <>
              {gameRecord?.data?.list?.length >= 10 ? (
                <div className="see-btn" onClick={loadMore}>
                  <button className="see-more f-acme">See More</button>
                </div>
              ) : null}
            </>
          )}
        </div>
        <div className="close p-abs" onClick={close}>
          <img style={{ width: "10vw" }} src={cross()} alt="" />
        </div>
      </div>
    </div>
  );
}

export default RecordsPopup;
