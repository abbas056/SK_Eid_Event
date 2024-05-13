import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { baserUrl, kktvrUrl } from "./../js/baserUrl";
import { PrevDate, nowDate } from "../js/helpers";

const ApiContext = createContext();
function EventProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [userInfo, setUserInfo] = useState([]);
  const [eidiToday, setEidiToday] = useState([]);
  const [eidiPrevious, setEidiPrevious] = useState([]);
  const [totalBeansSend, setTotalBeansSend] = useState([]);
  const [totalBeansReceived, setTotalBeansReceived] = useState([]);
  const [coinDazzle, setCoinDazzle] = useState([]);
  const [dancePartyWinners, setDancePartyWinners] = useState([]);
  const [dancePartyLeaderboard, setDancePartyLeaderboard] = useState([]);
  const [talentTree, setTalentTree] = useState([]);
  const [stream, setStream] = useState([]);

  const [isFlag, setisFlag] = useState(true);

  const [user, setUser] = useState({
    uid: 0,
    token: undefined,
  });
  const dancePartyRound = userInfo && userInfo?.data?.dancePartyRound;
  const refreshApi = () => {
    setRefresh(!refresh);
  };

  useEffect(() => {
    try {
      // window.phone.getUserInfo(function (userInfo) {
      //   setUser({
      //     uid: userInfo.userId > 0 ? userInfo.userId : 0,
      //     token: userInfo.token !== "" ? userInfo.token : null,
      //   });
      // });
      setUser({
        uid: 596492376,
        token: "A11958C6C6D6FB409B8B06180E4E315A53",
      });
    } catch (_error) {
      setUser({
        uid: 0,
        token: "",
      });

      console.error("Can't get userInfo by window.phone.getUserInfo");
    }
  }, []);

  useEffect(() => {
    setIsLoading(true);
    if (user.uid > 0) {
      axios
        .get(`${baserUrl}api/activity/eid2024/getUserEventInfo?userId=${user.uid}`)
        .then((response) => {
          setUserInfo(response.data);
          setIsLoading(false);
        })
        .catch((err) => console.log(err));
    }
  }, [user, refresh]);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${baserUrl}api/activity/eidF/getLeaderboardInfoV2?eventDesc=20240412_eid&rankIndex=13&pageNum=1&pageSize=20&dayIndex=${nowDate}`)
      .then((response) => {
        setEidiToday(response.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [refresh]);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${baserUrl}api/activity/eidF/getLeaderboardInfoV2?eventDesc=20240412_eid&rankIndex=13&pageNum=1&pageSize=20&dayIndex=${PrevDate}`)
      .then((response) => {
        setEidiPrevious(response.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [refresh]);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${baserUrl}api/activity/eidF/getLeaderboardInfoV2?eventDesc=20240412_eid&rankIndex=11&pageNum=1&pageSize=20`)
      .then((response) => {
        setTotalBeansSend(response.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [refresh]);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${baserUrl}api/activity/eidF/getLeaderboardInfoV2?eventDesc=20240412_eid&rankIndex=12&pageNum=1&pageSize=20`)
      .then((response) => {
        setTotalBeansReceived(response.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [refresh]);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${baserUrl}api/activity/eidF/getWinnerRankInfo?eventDesc=20240412_eid&rankIndex=1&pageNum=1&pageSize=20`)
      .then((response) => {
        setCoinDazzle(response.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [refresh]);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${baserUrl}api/activity/eidF/getLeaderboardInfoV2?eventDesc=20240412_eid&rankIndex=14&pageNum=1&pageSize=20&dayIndex=${dancePartyRound}`)
      .then((response) => {
        setDancePartyWinners(response.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [userInfo, refresh]);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${baserUrl}api/activity/eidF/getWinnerRankInfo?eventDesc=20240412_eid&rankIndex=3&pageNum=1&pageSize=20`)
      .then((response) => {
        setTalentTree(response.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [refresh]);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `${baserUrl}meShow/entrance?parameter=%7B%22platform%22%3A2%2C%22a%22%3A1%2C%22c%22%3A12002%2C%22v%22%3A1224%2C%22l%22%3A%22en%22%2C%22FuncTag%22%3A20010302%2C%22cataId%22%3A1275%2C%22area%22%3A0%2C%22start%22%3A0%2C%22offset%22%3A2%7D`
      )
      .then((response) => {
        setStream(response.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [refresh]);
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${baserUrl}api/activity/eidF/getWinnerRankInfo?eventDesc=20240412_eid&rankIndex=2&pageNum=1&pageSize=20`)
      .then((response) => {
        setDancePartyLeaderboard(response.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [refresh]);
  return (
    <div>
      <ApiContext.Provider
        value={{
          isLoading,
          setIsLoading,
          refreshApi,
          userId: user.uid,
          userToken: user.token,
          userInfo: userInfo.data,
          eidiToday: eidiToday?.data,
          eidiPrevious: eidiPrevious?.data,
          coinDazzle: coinDazzle?.data,
          talentTree: talentTree?.data,
          totalBeansSend: totalBeansSend?.data,
          totalBeansReceived: totalBeansReceived?.data,
          dancePartyWinners: dancePartyWinners?.data,
          dancePartyLeaderboard: dancePartyLeaderboard?.data,
          stream: stream?.roomList,
          isFlag,
          setisFlag,
        }}
      >
        {children}
      </ApiContext.Provider>
    </div>
  );
}

export { ApiContext, EventProvider };
