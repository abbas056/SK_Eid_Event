import React, { useContext, useRef, useState } from "react";
import tree from "../../assets/game-assets/shake-tree/Tree.png";
import shakeTree from "../../assets/game-assets/tree-animation/tree-game.svga";
import { baserUrl } from "../../js/baserUrl";
import { callingApi, cross, overFlowAuto, overFlowHidden, rewardImages, success, unsuccess } from "../../js/helpers";
import { ApiContext } from "../../services/Api";
import Svga from "../Svga";

function ShakeTreeGame({ points }) {
  const playerRef = useRef(0);

  const { refreshApi, userId, userToken, setisFlag } = useContext(ApiContext);
  const [animation, setAnimation] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [alert, setAlert] = useState(false);
  const [popup, setPopup] = useState([]);
  const [oops, setOops] = useState(false);

  let myChances = Math.floor(points / 30000);

  const handleClick = (boxIndex) => {
    setSpeed(boxIndex);
  };

  const shakeTheTree = () => {
    setBtnDisabled(true);
    if (!speed) {
      setOops(true);
      setAlert(true);
      setPopup(
        unsuccess(
          <div className="d-flex fd-column jc-center al-center gap-2">
            <div className="head-text p-abs">Select Combo!</div>
            <div>You need to select a combo first in order to play.</div>
          </div>
        )
      );
      overFlowHidden();
    } else {
      callingApi(`${baserUrl}api/activity/eid2024/shakeTree?playCount=${speed}`, userId, userToken)
        .then(function (response) {
          if (response.msg === "success") {
            setAnimation(true);
            setTimeout(() => {
              setOops(false);
              setAlert(true);
              setPopup(
                success(
                  <div className="d-flex fd-column jc-center al-center gap-2">
                    <div className="head-text p-abs">Congratulations!</div>
                    <span>You have successfully shaked this tree & have won</span>
                    <div
                      className={
                        response?.data?.rewardDTOList.length > 8
                          ? "rews-box rews-box-max d-flex al-start jc-center"
                          : "rews-box d-flex al-start jc-center"
                      }
                    >
                      {response?.data?.rewardDTOList.map((item, index) => {
                        return (
                          <div className="d-flex al-center jc-center fd-column gap-1" style={{ width: "25%" }} key={index}>
                            <div className="reward-img d-flex al-center jc-center">
                              <img src={rewardImages(item?.desc)} alt="" />
                            </div>
                            <div className="name c-yellow">
                              <div className="c-yellow">{item.desc}</div>x{" "}
                              {item?.desc == "Coins" || item?.desc == "Gems" || item?.desc == "Beans" ? (
                                item?.count
                              ) : (
                                <>
                                  {item.count} {item.count === 1 ? "day" : "days"}
                                </>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )
              );
              overFlowHidden();
              setisFlag(false);
              refreshApi();
            }, 4000);
          } else if (response.msg === "GAME_POINT_NOT_ENOUGH") {
            setOops(true);
            setAlert(true);
            setPopup(
              unsuccess(
                <div className="d-flex fd-column jc-center al-center gap-2">
                  <div className="head-text p-abs">Oops!</div>
                  <div>You don’t have enough talent points right now, get more event gifts to get talent points and come back again.</div>
                </div>
              )
            );
            overFlowHidden();
          } else {
            setOops(true);
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
          setOops(true);
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
    }
  };

  const close = () => {
    setisFlag(true);
    overFlowAuto();
    setAlert(false);
    setBtnDisabled(false);
    setSpeed(1);
    setOops(false);
    setAnimation(false);
  };
  return (
    <>
      <div className="shake-tree d-flex fd-column al-center jc-center m-auto f-tangoItalic gap-4">
        <div className="animation d-flex al-center jc-center p-rel">
          <img src={tree} alt="" />
          <div
            className="svga-animation p-abs"
            style={
              animation
                ? { width: "95vw", height: "100%", top: "-2vw", display: "block" }
                : { width: "95vw", height: "100%", top: "-2vw", display: "none" }
            }
          >
            <Svga src={shakeTree} playerRef={playerRef} id="gameRef" cssClass={`gameclas-tree`} />
          </div>
          {animation ? animation : null}
        </div>
        <div className="chances d-flex jc-s-between al-center">
          <button className={speed === 1 ? "select-speed gray-0" : "select-speed gray-1"} onClick={() => handleClick(1)}>
            x1
          </button>
          <button className={speed === 10 ? "select-speed gray-0" : "select-speed gray-1"} onClick={() => handleClick(10)}>
            x10
          </button>
          <button className={speed === 100 ? "select-speed gray-0" : "select-speed gray-1"} onClick={() => handleClick(100)}>
            x100
          </button>
        </div>
        <button
          className={btnDisabled ? "toss-btn gray-1" : "toss-btn gray-0"}
          disabled={btnDisabled}
          onClick={() => {
            shakeTheTree();
          }}
        >
          Shake <br /> Tree
        </button>
        <div className="chance d-flex al-center jc-center gap-1 c-white">30k Talent Pts Req</div>
      </div>

      <div className="overlay" style={{ visibility: alert ? "visible" : "hidden" }}>
        {alert ? (
          <div className="p-rel w-100 d-flex al-start jc-center" style={{ height: "100%" }}>
            <div className="game-popup d-flex al-center jc-center f-tangoItalic">
              {popup?.map((item) => {
                return (
                  <div className="container p-rel d-flex al-center jc-center " style={oops ? { height: "75vw" } : { height: "120vw" }}>
                    <div className="content m-auto p-abs d-flex al-center jc-center" style={oops ? { height: "60vw" } : { height: "100vw" }}>
                      <div className="body-text d-flex al-center jc-center fd-column">{item.data}</div>
                    </div>
                    <div className="modal-close p-abs" onClick={close}>
                      <img src={cross()} alt="" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}

export default ShakeTreeGame;
