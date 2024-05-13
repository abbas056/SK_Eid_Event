import React, { useContext, useState } from "react";
import { ApiContext } from "../../services/Api";
import goldCoinIcon from "../../assets/coinIcon.png";
import {
  callingApi,
  coinIcon,
  cross,
  goTo,
  goToStreaming,
  gotToTopUp,
  overFlowAuto,
  overFlowHidden,
  success,
  taskBtnImg,
  unsuccess,
} from "../../js/helpers";
import { baserUrl } from "../../js/baserUrl";
import Loader from "../common/Loader";

function Tab2DailyTasks({ setMainTabs, tab2 }) {
  const { userInfo, stream, userId, userToken, refreshApi } = useContext(ApiContext);
  const taskInfoList = userInfo?.taskInfoList;
  const streamId = stream && stream[1]?.userId;
  const [alert, setAlert] = useState(false);
  const [disbabled, setDisbabled] = useState(false);
  const [param, setParam] = useState();
  const [popup, setPopup] = useState([]);
  const isLive = false;

  const redirectTo = (index) => {
    if (index === 1 || index === 5) {
      goTo(isLive, streamId, streamId);
    } else if (index === 2) {
      setMainTabs({ tab2: true });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (index === 3) {
      setMainTabs({ tab3: true });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (index === 4) {
      goToStreaming();
    } else if (index === 6) {
      gotToTopUp();
    }
  };

  const collectCoins = (taskId) => {
    setParam(taskId);
    let target;
    if (taskId <= 4) {
      target = 2;
    } else if (taskId === 5) {
      target = 3;
    } else {
      target = 4;
    }
    setDisbabled(true);
    callingApi(`${baserUrl}api/activity/eid2024/claimReward?taskId=${taskId}`, userId, userToken)
      .then(function (response) {
        if (response.msg === "success") {
          setParam();
          setTimeout(() => {
            setAlert(true);
            setPopup(
              success(
                <div className="d-flex fd-column jc-center al-center gap-2">
                  <div className="head-text p-abs">Task completed!</div>
                  <span>
                    Congratulations on completing the task of Coin Dazzle, You have earned {target} Gold Coins{" "}
                    <img style={{ width: "4vw", verticalAlign: "bottom" }} src={goldCoinIcon} alt="" />.
                  </span>
                </div>
              )
            );
            overFlowHidden();
            refreshApi();
          }, 4000);
        } else {
          setAlert(true);
          setPopup(
            unsuccess(
              <div className="d-flex fd-column jc-center al-center gap-2">
                <div className="head-text p-abs">Oops!</div>
                <div>{response.msg}</div>
              </div>
            )
          );
          overFlowHidden();
        }
      })
      .catch(function (error) {
        setAlert(true);
        setPopup(
          unsuccess(
            <div className="d-flex fd-column jc-center al-center gap-2">
              <div className="head-text p-abs">Oops!</div>
              <div>{error.message}</div>
            </div>
          )
        );
        overFlowHidden();
      });
  };

  const close = () => {
    overFlowAuto();
    setAlert(false);
    setDisbabled(false);
  };
  return (
    <>
      <div className="tab2-dailyTasks m-auto d-flex fd-column al-center jc-center f-tangoItalic gap-2">
        <div className="text">
          Complete Tasks to <br />
          earn Gold Coins
        </div>
        <div className="tasks-box d-flex al-center jc-center p-rel">
          <div className="task d-flex fd-column a;-center jc-center gap-1">
            {taskInfoList?.map((data, i) => {
              const isClaim = data?.isClaim;
              const isComplete = data?.isComplete;
              const index = i + 1;
              const taskId = data?.taskId;
              return (
                <div className="d-flex jc-s-even al-center" key={i}>
                  <div className="task-desc d-flex jc-start al-center">{data.desc}</div>
                  <button className="go-btn" disabled={disbabled}>
                    {param === taskId ? (
                      <div className="load p-abs">
                        <Loader className={`coin-loader`} tab2={tab2} />
                      </div>
                    ) : (
                      <img
                        src={taskBtnImg(isClaim, isComplete)}
                        alt=""
                        onClick={() => {
                          if (isClaim === false && isComplete === false) {
                            redirectTo(index);
                          } else if (isClaim === false && isComplete === true) {
                            collectCoins(taskId);
                          }
                        }}
                      />
                    )}
                  </button>
                  {data?.rewardList?.map((items, i) => {
                    return (
                      <div className="task-coins d-flex jc-center al-center c-white gap-1" key={i}>
                        <img
                          style={isClaim === false && isComplete === true ? { width: "20vw", left: "-5vw" } : { width: "6vw", left: "2vw" }}
                          className={isClaim === true && isComplete === true ? "gray-1" : "gray-0"}
                          src={coinIcon(isClaim, isComplete)}
                          alt=""
                        />
                        <span>x{items.count}</span>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="overlay" style={{ visibility: alert ? "visible" : "hidden" }}>
        {alert ? (
          <div className="game-popup d-flex al-center jc-center f-tangoItalic">
            {popup?.map((item, i) => {
              return (
                <div className="container p-rel d-flex al-center jc-center " key={i} style={{ height: "80vw" }}>
                  <div className="content m-auto p-abs d-flex al-center jc-center" style={{ height: "60vw" }}>
                    <div className="body-text d-flex al-center jc-center fd-column">{item.data}</div>
                  </div>
                  <div className="modal-close p-abs" onClick={close}>
                    <img src={cross()} alt="" />
                  </div>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
    </>
  );
}

export default Tab2DailyTasks;
