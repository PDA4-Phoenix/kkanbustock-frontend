import React from "react";
import "./MyGroupRanking.css";
import rank1 from "../../assets/images/character/rank1.png";
import rank2 from "../../assets/images/character/rank2.png";
import rank3 from "../../assets/images/character/rank3.png";
import rank4 from "../../assets/images/character/rank4.png";
import rank5 from "../../assets/images/character/rank5.png";

function MyGroupRanking({ topNMyGroups }) {
  const processedData = processMyGroupData(topNMyGroups);

  function processMyGroupData(data) {
    // data 배열을 받아와서 가공
    return data.map((item, index) => ({
      id: index + 1,
      alt: `그룹 이미지 ${index + 1}`,
      src: getMedalImage(index),
      groupName: item.name,
      groupRate: `${item.profitRate}%`,
    }));
  }

  function getMedalImage(index) {
    if (index === 0) {
      return rank1;
    } else if (index === 1) {
      return rank2;
    } else if (index === 2) {
      return rank3;
    } else if (index === 3) {
      return rank4;
    } else if (index === 4) {
      return rank5;
    }
  }

  return (
    <div className="containerForGroupRanking">
      <div className="headForRanking">나의 깐부들 TOP5</div>
      <div className="medalList2">
        {processedData.length === 0 ? (
          <p>아직 그룹이 없습니다</p>
        ) : (
          processedData.map((data, index) => (
            <div key={data.id} className={`top${index + 1}`}>
              <img alt={data.alt} src={data.src} />
              <div> {data.groupName} </div>
              <div> 수익률: {data.groupRate} </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default MyGroupRanking;
