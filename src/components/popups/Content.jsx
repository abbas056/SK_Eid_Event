import React from "react";
import { guideContent } from "../../js/data";

function Content({ eidiToss, coinDazzle, danceParty, talentTree, eventGifitng, language }) {
  let current;
  language === "Urdu/Hindi" ? (current = guideContent.Urdu) : (current = guideContent.English);
  return (
    <div className="text-data">
      {eidiToss ? (
        <>{current.eidiToss}</>
      ) : coinDazzle ? (
        current.CoinDazzle
      ) : danceParty ? (
        <>
          {current.danceParty1}
          <table className=" table w-100 m-auto b-collapse">
            <thead>
              <th className="border-1 p-1 bg-brown t-center">Party user number (Threshold)</th>
              <th className="border-1 p-1 bg-brown t-center">Lucky random user number</th>
              <th className="border-1 p-1 bg-brown t-center">Each user rewards</th>
            </thead>
            <tbody>
              <tr>
                <td className="border-1 p-1 bg-orange c-yellow t-center ">100 users</td>
                <td className="border-1 p-1 bg-orange c-yellow t-center ">4</td>
                <td className="border-1 p-1 bg-orange c-yellow t-center ">700 Beans</td>
              </tr>{" "}
              <tr>
                <td className="border-1 p-1 bg-orange c-yellow t-center ">500 users</td>
                <td className="border-1 p-1 bg-orange c-yellow t-center ">3</td>
                <td className="border-1 p-1 bg-orange c-yellow t-center ">3000 Beans</td>
              </tr>{" "}
              <tr>
                <td className="border-1 p-1 bg-orange c-yellow t-center ">1000 users</td>
                <td className="border-1 p-1 bg-orange c-yellow t-center ">3</td>
                <td className="border-1 p-1 bg-orange c-yellow t-center ">5000 Beans</td>
              </tr>{" "}
              <tr>
                <td className="border-1 p-1 bg-orange c-yellow t-center ">2000 users</td>
                <td className="border-1 p-1 bg-orange c-yellow t-center ">2</td>
                <td className="border-1 p-1 bg-orange c-yellow t-center ">30000 Beans</td>
              </tr>{" "}
              <tr>
                <td className="border-1 p-1 bg-orange c-yellow t-center ">5000 users</td>
                <td className="border-1 p-1 bg-orange c-yellow t-center ">1</td>
                <td className="border-1 p-1 bg-orange c-yellow t-center ">70000 Beans</td>
              </tr>
            </tbody>
          </table>{" "}
          {current.danceParty2}
        </>
      ) : talentTree ? (
        current.talentTree
      ) : (
        <>
          {current.h1}
          {current.desc1}
          {current.h2}
          {current.desc2}
        </>
      )}
    </div>
  );
}

export default Content;
