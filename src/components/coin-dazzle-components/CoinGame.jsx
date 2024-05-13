import React, { useContext, useRef, useState } from "react";
import eidiPointsIcon from "../../assets/eidi-point-icon.png";
import coinIcon from "../../assets/coinIcon.png";
import mascot1 from "../../assets/Mascot1.png";
import backImgGame from "../../assets/game-assets/Toss-Game-Animation/background.png";
import coin1 from "../../assets/Streamkar-coin.png";
import coin2 from "../../assets/Eid-Mubarak-Coin.png";
import MyPoints from "../common/MyPoints";
import Base from "../common/Base";
import { callingApi, cross, overFlowAuto, overFlowHidden, rewardImages, success, unsuccess } from "../../js/helpers";
import { ApiContext } from "../../services/Api";
import { baserUrl } from "../../js/baserUrl";
import startSVGA from "../../assets/game-assets/Toss-Game-Animation/Idle-State.svga";
import eidSVGA from "../../assets/game-assets/Toss-Game-Animation/Eid-State.svga";
import skStateSVGA from "../../assets/game-assets/Toss-Game-Animation/SK-State.svga";
import Svga from "./../Svga";

function CoinGame({ points, dailyToss }) {
  const playerRef = useRef(0);
  const [selectCoin, setselectCoin] = useState();
  const { refreshApi, userId, userToken, setisFlag } = useContext(ApiContext);
  const [input, setInput] = useState(1);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [error, setError] = useState("Max value = 99");
  const [alert, setAlert] = useState(false);
  const [popup, setPopup] = useState([]);
  const [oops, setOops] = useState(false);
  const [animation, setAnimation] = useState(<Svga src={startSVGA} playerRef={playerRef} id="gameRef" cssClass={`gameclas`} />);

  const handleClick = (boxIndex) => {
    setselectCoin(boxIndex);
  };
  let myChances = Math.floor(points / 15000);

  const handleInput = (event) => {
    let value = event.target.value;
    let max = myChances < 99 ? myChances : 99;
    let val = value.replace(/[^0-9]/g, "");
    let number = parseInt(val) > max ? max : parseInt(val) <= 0 ? 1 : parseInt(val);
    setInput(number);
    if (event.target.value === "") {
      setError("Enter some value");
      setButtonDisabled(true);
    } else if (
      value === `${max}.0` ||
      value === `${max}.00` ||
      value === `${max}.000` ||
      value === `${max}.0000` ||
      value === `${max}.00000` ||
      value === `${max}.000000` ||
      value === `${max}.0000000` ||
      value === `${max}.00000000` ||
      value === `${max}.000000000` ||
      value === `${max}.0000000000`
    ) {
      setInput(number);
      setError("Wrong input value");
      setButtonDisabled(true);
    } else {
      setError("Max value = 99");
      setButtonDisabled(false);
    }
  };

  const tossCoin = () => {
    setButtonDisabled(true);
    if (!selectCoin) {
      setOops(true);
      setAlert(true);
      setPopup(
        unsuccess(
          <div className="d-flex fd-column jc-center al-center gap-2">
            <div className="head-text p-abs">Select Coin Side First!</div>
            <div>
              You have to select one of the coin sides <img style={{ width: "4vw", verticalAlign: "bottom" }} src={coin1} alt="" /> first in order to
              play the coin toss.
            </div>
          </div>
        )
      );
      overFlowHidden();
    } else {
      callingApi(`${baserUrl}api/activity/eid2024/toss?playCount=${input}`, userId, userToken)
        .then(function (response) {
          if (response.msg === "success") {
            const win = response?.data?.winCount;
            const loss = response?.data?.loseCount;
            let animation;
            if ((selectCoin === 1 && win === 1) || (selectCoin === 2 && loss === 1)) {
              animation = skStateSVGA;
            } else if ((selectCoin === 1 && loss === 1) || (selectCoin === 2 && win === 1)) {
              animation = eidSVGA;
            } else {
              animation = skStateSVGA;
            }
            setAnimation(<Svga src={animation} playerRef={playerRef} id="gameRef" cssClass={`gameclas`} />);
            setTimeout(() => {
              setAlert(true);
              setPopup(
                success(
                  <div className="d-flex fd-column jc-center al-center gap-2">
                    <div className="head-text p-abs">
                      {win >= 1 && loss === 0 ? "Hooray!" : win === 0 && loss >= 1 ? "Better Luck Next Time!" : "Congratulations!"}
                    </div>
                    <span>
                      {win >= 1 && loss === 0 ? (
                        <>
                          You've Won the Toss <img style={{ width: "4vw", verticalAlign: "bottom" }} src={coin1} alt="" />! You have been rewarded
                          with
                        </>
                      ) : win === 0 && loss >= 1 ? (
                        <>
                          Unfortunately, the coin <img style={{ width: "4vw", verticalAlign: "bottom" }} src={coin1} alt="" /> didn't land in your
                          favour this time. But don't worry, you still scored a reward! You've earned
                        </>
                      ) : (
                        <>
                          Those were some amazing toss <img style={{ width: "4vw", verticalAlign: "bottom" }} src={coin1} alt="" /> you have scored{" "}
                          {win} wins & {loss} losses, you’ve earned
                        </>
                      )}
                    </span>
                    <div
                      className={
                        response?.data?.rewardDTOList.length > 8
                          ? "rews-box rews-box-max d-flex al-start jc-center"
                          : "rews-box d-flex al-start jc-center"
                      }
                    >
                      {response?.data?.rewardDTOList.map((item, index) => {
                        return (
                          <div className="d-flex al-center jc-center fd-column gap-1" key={index} style={{ width: "25%" }}>
                            <div className="reward-img d-flex al-center jc-center">
                              <img src={rewardImages(item?.desc)} alt="" />
                            </div>
                            <div className="name c-yellow">
                              <div className="c-yellow">{item.desc}</div>x{" "}
                              {item?.desc == "Beans" ? (
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
                    <span>
                      {win >= 1 && loss === 0 ? (
                        <>Keep the winning streak going! Enjoy your rewards and try your luck again!</>
                      ) : win === 0 && loss >= 1 ? (
                        <>Every toss is a new opportunity, toss again to win & get more rewards.</>
                      ) : (
                        <>Every toss is a new opportunity, toss again to win & get more rewards.</>
                      )}
                    </span>
                  </div>
                )
              );
              overFlowHidden();
              setOops(false);
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
                  <div>
                    You don't have enough Eidi Points <img style={{ width: "4vw", verticalAlign: "bottom" }} src={eidiPointsIcon} alt="" /> to toss
                    the coin <img style={{ width: "4vw", verticalAlign: "bottom" }} src={coinIcon} alt="" /> right now. Send more event gifts & toss
                    the coin again.
                  </div>
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
    setButtonDisabled(false);
    setselectCoin();
    setInput(1);
    setOops(false);
    setAnimation(<Svga src={startSVGA} playerRef={playerRef} id="gameRef" cssClass={`gameclas`} />);
  };
  return (
    <>
      <div className="coin-game m-auto d-flex fd-column al-center jc-center c-white f-tangoItalic p-rel gap-4">
        <MyPoints text="My Eidi Points" icon={eidiPointsIcon} points={points} />
        <div className="coin-game-container fd-column d-flex al-center jc-center gap-4">
          <div className="animation" id="game-background" style={{ backgroundImage: `url(${backImgGame})`, backgroundSize: "100% 100%" }}>
            {animation}
          </div>
          <div className="text">Choose coin side for Toss</div>
          <div className="coins d-flex jc-s-between al-center">
            <button disabled={buttonDisabled}>
              <img src={coin1} alt="" className={selectCoin === 1 ? "gray-0" : "gray-1"} onClick={() => handleClick(1)} />
            </button>
            <button disabled={buttonDisabled}>
              <img src={coin2} alt="" className={selectCoin === 2 ? "gray-0" : "gray-1"} onClick={() => handleClick(2)} />
            </button>
          </div>
          <div className="chances d-flex jc-center al-center">
            <div className="x1 d-flex al-center jc-center">x1</div>
            <input
              className="input-field"
              placeholder="Enter value"
              name="NumInput"
              type="number"
              value={input}
              min={0}
              max={99}
              onChange={handleInput}
            />
          </div>
          <div className="error">{error}</div>
          <button
            className={buttonDisabled ? "toss-btn gray-1" : "toss-btn gray-0"}
            disabled={buttonDisabled}
            onClick={() => {
              tossCoin();
            }}
          >
            Toss
          </button>

          <div className="daily-toss-won d-flex al-center jc-center gap-1 c-white">
            <img src={coin1} alt="" />
            <span>Daily Toss Won : {dailyToss ? dailyToss : 0}</span>
          </div>
          <div className="chance d-flex al-center jc-center gap-1 c-white">1 Chance = 15k Eidi Points</div>
        </div>
        <Base img1={mascot1} />
      </div>

      <div className="overlay" style={{ visibility: alert ? "visible" : "hidden" }}>
        {alert ? (
          <div className="p-rel w-100 d-flex al-start jc-center" style={{ height: "100%" }}>
            <div className="game-popup d-flex al-center jc-center f-tangoItalic">
              {popup?.map((item, i) => {
                return (
                  <div className="container p-rel d-flex al-center jc-center " key={i} style={oops ? { height: "80vw" } : { height: "120vw" }}>
                    <div className="content m-auto p-abs d-flex al-center jc-center" style={oops ? { height: "60vw" } : { height: "105vw" }}>
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

export default CoinGame;
