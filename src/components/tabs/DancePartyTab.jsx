import React, { useContext } from "react";
import DancePartyMainSection from "../dance-party-components/DancePartyMainSection";
import LeaderBoard from "../leaderboard/LeaderBoad";
import { ApiContext } from "../../services/Api";
function DancePartyTab({ tab3 }) {
  const { userInfo, dancePartyLeaderboard } = useContext(ApiContext);
  const eidiPoints = userInfo?.gamePoints;
  const danceParty = dancePartyLeaderboard?.list;
  return (
    <div className="d-flex fd-column al-center jc-center">
      <DancePartyMainSection points={eidiPoints} />
      <LeaderBoard tab3={tab3} restWinners={danceParty} arrayData={dancePartyLeaderboard} />
    </div>
  );
}

export default DancePartyTab;
