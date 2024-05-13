import React from "react";
import { cross } from "../../js/helpers";
import { coinDazzleRewsDetails, dancepartyRewsDetails, eidiTossRewsDetails, talentTreeRewsDetails } from "../../js/data";

function DetailsPopup({ close, tab1, tab2, tab3, tab4 }) {
  let rewDetails;
  let title;
  let pointsReq;
  let buttonName;
  if (tab1) {
    rewDetails = eidiTossRewsDetails;
    title = "Eidi Points Required";
    pointsReq = "15000";
    buttonName = "Toss";
  } else if (tab2) {
    rewDetails = coinDazzleRewsDetails;
    title = "Eidi Points Required";
    pointsReq = "20000";
    buttonName = "Play";
  } else if (tab3) {
    rewDetails = dancepartyRewsDetails;
    title = "Eidi Points Required";
    pointsReq = "10000";
    buttonName = "Join";
  } else {
    rewDetails = talentTreeRewsDetails;
    title = "Talent Points Required";
    pointsReq = "30000";
    buttonName = "Shake Tree";
  }
  return (
    <div className="p-rel w-100 d-flex al-start jc-center" style={{ height: "100%" }}>
      <div className="details-popup">
        <div className="title f-sweet m-auto d-flex al-center jc-center p-abs">Details</div>
        <div className="inner-content m-auto">
          <div className="table m-auto d-flex jc-center al-center">
            <table className="b-collapse w-100">
              <tbody>
                <tr className="f-bold c-blue">
                  <td className="w-20 bg-light-blue">Button Name</td>
                  <td className="w-20 bg-light-blue">{title}</td>
                  <td className="w-100 bg-light-blue">Rewards</td>
                </tr>
                <tr>
                  <td className="w-20 bg-sky-blue">{buttonName}</td>
                  <td className="w-20 bg-sky-blue">{pointsReq}</td>
                  <td className="rewards-box d-flex f-wrap jc-center bg-sky-blue gap-1" style={{ width: "99.3%" }}>
                    {rewDetails.map((items, i) => {
                      return (
                        <div className="w-30 d-flex jc-sEven f-wrap" key={i}>
                          {items?.rewards?.map((data, i) => (
                            <div className="w-100 d-flex fd-column al-center jc-start gap-1" key={i}>
                              <div className="rew-img d-flex al-center jc-center">
                                <img src={data.pic} alt="" />
                              </div>
                              <span className="details">{data.text}</span>
                            </div>
                          ))}
                        </div>
                      );
                    })}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="close p-abs" onClick={close}>
          <img style={{ width: "10vw" }} src={cross()} alt="" />
        </div>
      </div>
    </div>
  );
}

export default DetailsPopup;
