import React, { useState, useEffect } from "react";
import "./ViewScoreComponent.css";
import ViewMyScore from "./ViewMyScore";
import ViewRivalScore from "./ViewRivalScore";
import axios from "axios";

function ViewScoreComponent({ memberId, guestId }) {
  const [memberTotalProfitRate, setMemberTotalProfitRate] = useState(null);
  const [guestTotalProfitRate, setGuestTotalProfitRate] = useState(null);

  useEffect(() => {
    axios
      .get(
        `http://service.team-4.svc.cluster.local:8080/api/v1/portfolios/profits/${memberId}`
      )
      .then((response) => {
        const data = response.data;
        if (data) {
          setMemberTotalProfitRate(data);
        } else {
          setMemberTotalProfitRate("확인 불가");
        }
      })
      .catch((error) => {
        console.error("Error fetching member data:", error);
        setMemberTotalProfitRate("확인 불가");
      });

    if (guestId) {
      axios
        .get(
          `http://service.team-4.svc.cluster.local:8080/api/v1/portfolios/profits/${guestId}`
        )
        .then((response) => {
          const data = response.data;
          if (data) {
            setGuestTotalProfitRate(data);
          } else {
            setGuestTotalProfitRate("확인 불가");
          }
        })
        .catch((error) => {
          console.error("Error fetching guest data:", error);
          setGuestTotalProfitRate("확인 불가");
        });
    }
  }, [memberId, guestId]);

  let memberMatchResult = 0;
  let guestMatchResult = 0;
  if (
    memberTotalProfitRate !== "확인 불가" &&
    memberTotalProfitRate &&
    guestTotalProfitRate !== "확인 불가" &&
    guestTotalProfitRate
  ) {
    if (memberTotalProfitRate > guestTotalProfitRate) {
      memberMatchResult = "win";
      guestMatchResult = "loss";
      console.log("memberTotalProfitRate win");
    } else if (memberTotalProfitRate < guestTotalProfitRate) {
      memberMatchResult = "loss";
      guestMatchResult = "win";
      console.log("guestTotalProfitRate");
    } else {
      memberMatchResult = 0;
      guestMatchResult = 0;
    }
  }

  return (
    <div className="ViewScoreComponentWrap">
      <div className="RivalPageTitle">🔥깐부끼리, 수익률 내기 한판 할까?🔥</div>

      <div className="scoreComponent">
        <ViewMyScore
          memberId={memberId}
          totalProfitRate={memberTotalProfitRate}
          matchResult={memberMatchResult}
        />
        <div className="versusCircle"></div>
        <ViewRivalScore
          guestId={guestId}
          totalProfitRate={guestTotalProfitRate}
          matchResult={guestMatchResult}
        />
      </div>
    </div>
  );
}

export default ViewScoreComponent;
