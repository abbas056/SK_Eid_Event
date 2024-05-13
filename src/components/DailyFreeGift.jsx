import React, { useContext, useState } from "react";
import { ApiContext } from "../services/Api";
import openGift from "../assets/Popups/free-gift/gift-box-open.png";
import closeGift from "../assets/Popups/free-gift/gift-box.png";
import handIcon from "../assets/Popups/free-gift/hand-icon.png";
import { claimFreeGiftApi, cross, rewardImages } from "../js/helpers";
import { baserUrl } from "../js/baserUrl";

function DailyFreeGift({ dailyFreeGift, dailyGift, setDailyGift, close }) {
  const { refreshApi, userId, userToken } = useContext(ApiContext);
  const [freeGift, setFreeGift] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [btnDisable, setBtnDisable] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState();

  const claimFreeGift = () => {
    setBtnDisable(true);
    setIsLoading(true);
    claimFreeGiftApi(`${baserUrl}api/activity/eid2024/claimFreeGift?state=1`, userId, userToken)
      .then(function (response) {
        if (response.errorCode === 0) {
          setFreeGift(response?.data);
          setDailyGift(true);
          setError(false);
          setBtnDisable(false);
        } else {
          setError(true);
          setErrorMsg(response.msg);
        }
      })
      .catch(function (error) {
        console.log(error.message);
      });
  };
  return (
    <div className="overlay" style={{ visibility: dailyFreeGift ? "visible" : "hidden" }}>
      {dailyFreeGift ? (
        <div className="p-rel w-100 d-flex al-start jc-center" style={{ height: "100%" }}>
          <div
            className={
              dailyGift || error ? "daily-free-gift-claim d-flex al-center jc-center p-rel" : "daily-free-gift d-flex al-center jc-center p-rel"
            }
          >
            <div className="title f-sweet m-auto d-flex al-center jc-center p-abs">
              {error ? "Oops!" : dailyGift ? "StreamKar’s Eidi!" : "Eid Mubarak!"}
            </div>
            <div className="container p-rel f-tangoItalic d-flex fd-column al-center jc-center gap-4">
              {error ? (
                <div className="d-flex fd-column al-center jc-center">{errorMsg}</div>
              ) : dailyGift ? (
                <>
                  {freeGift?.map((data, i) => (
                    <div className="d-flex fd-column al-center jc-center gap-2" key={i}>
                      <span>
                        Embrace the Joy <br /> with this exclusive gift
                      </span>
                      <div className="reward d-flex fd-column al-center jc-center gap-2">
                        <div className="reward-img">
                          <img src={rewardImages(data.desc)} />
                        </div>
                        <div className="desc">
                          {data.desc == "Beans" ? (
                            <>
                              {data.desc} {data.count}
                            </>
                          ) : (
                            <>
                              {data.desc} x {data.count}
                            </>
                          )}
                          {data.desc == "Beans" ? null : <>{data.count == 1 ? " day" : " days"}</>}
                        </div>
                      </div>
                      <span>
                        just for you. Your reward <br />
                        has been added in your id.
                      </span>
                    </div>
                  ))}
                </>
              ) : (
                <>
                  <div className="text">
                    Unlock a world of joy with StreamKar's <br />
                    special Eidi gift, just for you! Tap on the <br /> Gift Box below to get your Eidi.
                  </div>
                  <button onClick={claimFreeGift} disabled={btnDisable}>
                    <img style={{ width: "45vw" }} src={isLoading ? openGift : closeGift} alt="" />
                    <img className="p-abs handIcon" src={handIcon} />
                  </button>
                </>
              )}
            </div>
            <div className="close p-abs" onClick={close}>
              <img style={{ width: "10vw" }} src={cross()} alt="" />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default DailyFreeGift;
