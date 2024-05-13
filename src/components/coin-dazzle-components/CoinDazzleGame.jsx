import React, { useContext, useRef, useState } from "react";
import { ApiContext } from "../../services/Api";
import { callingApi, cross, overFlowAuto, overFlowHidden, rewardImages, success, unsuccess } from "../../js/helpers";
import { baserUrl } from "../../js/baserUrl";
import eidiPointsIcon from "../../assets/eidi-point-icon.png";
import coinPusherIcon from "../../assets/coin-pusher-icon.png";
import coinIcon from "../../assets/Coin.png";
import playBtn from "../../assets/play-btn.png";
import startSVGA from "../../assets/game-assets/coin-pusher/Coin-Pusher-Game-Idle.svga";
import playSVGA from "../../assets/game-assets/coin-pusher/Coin-Pusher-Game-Play.svga";
import Svga from "../Svga";

function CoinDazzleGame({ points }) {
  const playerRef = useRef(0);
  const playerRef2 = useRef(0);

  const { refreshApi, userId, userToken, setisFlag } = useContext(ApiContext);
  const [input, setInput] = useState(1);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [error, setError] = useState("Max value = 99");
  const [alert, setAlert] = useState(false);
  const [popup, setPopup] = useState([]);
  const [oops, setOops] = useState(false);
  const [animation, setAnimation] = useState(false);

  let myChances = Math.floor(points / 20000);

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
  const pushTheCoins = () => {
    setButtonDisabled(true);
    callingApi(`${baserUrl}api/activity/eid2024/coinDazzle?playCount=${input}`, userId, userToken)
      .then(function (response) {
        if (response.msg === "success") {
          setAnimation(true);
          const goldCoins = response?.data?.rewardDTOList.filter((item) => item.desc === "Coins");
          const coinsCount = goldCoins?.map((itm) => itm.count);
          setTimeout(() => {
            setOops(false);
            setAlert(true);
            setPopup(
              success(
                <div className="d-flex fd-column jc-center al-center gap-2">
                  <div className="head-text p-abs">Great Job!</div>
                  <span>
                    You've successfully played the Coin Pusher game{" "}
                    <img style={{ width: "4vw", verticalAlign: "bottom" }} src={coinPusherIcon} alt="" />. As the gold coins{" "}
                    <img style={{ width: "4vw", verticalAlign: "bottom" }} src={coinIcon} alt="" /> cascade down, you've earned{" "}
                    <span className="c-yellow"> {coinsCount}</span> gold coins & have won
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
                            {item?.desc == "Coins" ? (
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
                  <span>Keep the momentum going and collect even more gold coins for exciting rewards and bonuses.</span>
                </div>
              )
            );
            setisFlag(false);
            overFlowHidden();
            refreshApi();
          }, 3000);
        } else if (response.msg === "GAME_POINT_NOT_ENOUGH") {
          setOops(true);
          setAlert(true);
          setPopup(
            unsuccess(
              <div className="d-flex fd-column jc-center al-center gap-2">
                <div className="head-text p-abs">Oops!</div>
                <div>
                  You don’t have enough Eidi Points <img style={{ width: "4vw", verticalAlign: "bottom" }} src={eidiPointsIcon} alt="" /> to play the
                  coin pusher game <img style={{ width: "4vw", verticalAlign: "bottom" }} src={coinPusherIcon} alt="" /> right now. Send more event
                  gifts & come back again.
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
  };

  const close = () => {
    setAnimation(false);
    setisFlag(true);
    overFlowAuto();
    setAlert(false);
    setButtonDisabled(false);
    setInput(1);
    setOops(false);
  };
  return (
    <>
      <div className="dazzle-game m-auto d-flex al-center jc-center f-tangoItalic">
        <div className="dazzle-game-container fd-column d-flex al-center jc-center gap-4">
          <div className="animation p-rel">
            <div className="before" style={{ width: "100%", height: "100%" }}>
              <Svga src={startSVGA} playerRef={playerRef} id="gameRef" cssClass={`gameclas`} />
            </div>
            <div
              className="after p-abs"
              style={
                animation
                  ? { width: "100%", height: "100%", top: "0vw", display: "block" }
                  : { width: "100%", height: "100%", top: "0vw", display: "none" }
              }
            >
              <Svga src={playSVGA} playerRef={playerRef2} id="gameRef2" cssClass={`gameclas2`} />
            </div>
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
              pushTheCoins();
            }}
          >
            <img src={playBtn} alt="" />
          </button>

          <div className="chance d-flex al-center jc-center gap-1 c-white">1 Chance = 20k Eidi Points</div>
        </div>
      </div>

      <div className="overlay" style={{ visibility: alert ? "visible" : "hidden" }}>
        {alert ? (
          <div className="p-rel w-100 d-flex al-start jc-center" style={{ height: "100%" }}>
            <div className="game-popup d-flex al-center jc-center f-tangoItalic">
              {popup?.map((item) => {
                return (
                  <div className="container p-rel d-flex al-center jc-center " style={oops ? { height: "80vw" } : { height: "120vw" }}>
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

export default CoinDazzleGame;
