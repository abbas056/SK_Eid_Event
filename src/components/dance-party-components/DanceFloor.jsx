import React, { useContext, useEffect, useRef, useState } from "react";
import joinBtn from "../../assets/Join-Button.png";
import { callingApi, cross, overFlowAuto, overFlowHidden, rewardImages, success, unsuccess } from "../../js/helpers";
import { baserUrl } from "../../js/baserUrl";
import { ApiContext } from "../../services/Api";
import ExtraGame from "./ExtraGame";
import bg1 from "../../assets/game-assets/dance-party/DancePartyGame-State-1.svga";
import bg2 from "../../assets/game-assets/dance-party/DancePartyGame-State-2.svga";
import floorIcon from "../../assets/dance-floor-icon.png";
import Svga from "../Svga";

function DanceFloor({ points, icon }) {
  const playerRef = useRef(0);
  const { userInfo, refreshApi, userId, userToken, setisFlag } = useContext(ApiContext);
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [alert, setAlert] = useState(false);
  const [popup, setPopup] = useState([]);
  const [oops, setOops] = useState(false);
  const [background, setBackground] = useState(bg1);
  const partyCount = userInfo?.dancePartyUserCount;
  const configList = userInfo?.danceGameConfigList;
  const haveJoinParty = userInfo?.haveJoinParty;

  const JoinTheFloor = () => {
    setBtnDisabled(true);
    callingApi(`${baserUrl}api/activity/eid2024/joinParty`, userId, userToken)
      .then(function (response) {
        if (response.msg === "success") {
          setTimeout(() => {
            setAlert(true);
            setPopup(
              success(
                <div className="d-flex fd-column jc-center al-center gap-2">
                  <div className="head-text p-abs">Party Joined!</div>
                  <span>
                    Congratulations! You have successfully joined the Dance Floor{" "}
                    <img style={{ width: "4vw", verticalAlign: "bottom" }} src={floorIcon} alt="" /> & have won
                  </span>
                  <div className="rews-box d-flex al-start jc-center">
                    {response?.data?.rewardDTOList.map((item, index) => {
                      return (
                        <div className="d-flex al-center jc-center fd-column gap-1" style={{ width: "25%" }} key={index}>
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
                  <span>Best of luck for being among the Lucky winners.</span>
                </div>
              )
            );
            overFlowHidden();
            setOops(false);
            setisFlag(false);
            refreshApi();
          }, 1200);
        } else if (response.msg === "GAME_POINT_NOT_ENOUGH") {
          setOops(true);
          setAlert(true);
          setPopup(
            unsuccess(
              <div className="d-flex fd-column jc-center al-center gap-2">
                <div className="head-text p-abs">Oops!</div>
                <div>
                  You don’t have enough Eidi points <img style={{ width: "4vw", verticalAlign: "bottom" }} src={icon} alt="" /> right now to join the
                  Dance Floor. Send more event gifts & come back again.
                </div>
              </div>
            )
          );
          overFlowHidden();
        } else if (response.msg === "REPEAT_JOIN") {
          setOops(true);
          setAlert(true);
          setPopup(
            unsuccess(
              <div className="d-flex fd-column jc-center al-center gap-2">
                <div className="head-text p-abs">Oops!</div>
                <div>You've already Joined the Party.</div>
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
              <div className="head-text p-abs">Oops</div>
              <div>{error.message}</div>
            </div>
          )
        );
        overFlowHidden();
      });
  };

  const close = () => {
    setisFlag(true);
    overFlowAuto();
    setAlert(false);
    setBtnDisabled(false);
    setOops(false);
  };

  useEffect(() => {
    for (let i = 0; i < configList?.length; i++) {
      const config = configList[i];
      if (partyCount === config?.userCount) {
        setBackground(bg2);
        break;
      } else if (partyCount > config?.userCount) {
        setBackground(bg1);
      }
    }
  }, [partyCount, configList]);
  return (
    <>
      <div className="d-flex fd-column al-center jc-center gap-4">
        <div className="dance-floor d-flex al-center jc-center m-auto">
          <div className="background p-rel">
            <Svga src={background} playerRef={playerRef} id="gameRef" cssClass={`gameclas-dance`} />
          </div>
          <div className="dancers d-flex al-center jc-center p-abs">
            <ExtraGame />
          </div>
        </div>
        <button
          disabled={btnDisabled}
          className={btnDisabled || haveJoinParty ? "join-btn gray-1" : "join-btn gray-0"}
          onClick={() => {
            if (!haveJoinParty) {
              JoinTheFloor();
            }
          }}
        >
          <img src={joinBtn} alt="" />
        </button>
      </div>

      <div className="overlay" style={{ visibility: alert ? "visible" : "hidden" }}>
        {alert ? (
          <div className="p-rel w-100 d-flex al-start jc-center" style={{ height: "100%" }}>
            <div className="game-popup d-flex al-center jc-center f-tangoItalic">
              {popup?.map((item) => {
                return (
                  <div className="container p-rel d-flex al-center jc-center" style={oops ? { height: "80vw" } : { height: "120vw" }}>
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

export default DanceFloor;
