import React, { useContext } from "react";
import TalentTreeMainSection from "../talent-tree-components/TalentTreeMainSection";
import LeaderBoard from "../leaderboard/LeaderBoad";
import { ApiContext } from "../../services/Api";
function TalentTreeTab({ tab4 }) {
  const { userInfo, talentTree } = useContext(ApiContext);
  const talentPoints = userInfo?.talentPoints;
  const talentTreeWinners = talentTree?.list;
  return (
    <>
      <TalentTreeMainSection points={talentPoints} />
      <LeaderBoard tab4={tab4} restWinners={talentTreeWinners} arrayData={talentTree} />
    </>
  );
}

export default TalentTreeTab;
