import React from "react";
import "./MonthlyRank.css";
import goldMedal from "../../assets/images/medal/gold.png";
import silverMedal from "../../assets/images/medal/silver.png";
import bronzeMedal from "../../assets/images/medal/dong.png";

function MonthlyRank({ topNGroups }) {
  let processedData;
  const dummyData = [
    {
      id: 0,
      alt: "1",
      groupName: "신투깐부",
      groupRate: "87%",
      src: getMedalImage(0),
    },
    {
      id: 1,
      alt: "2",
      groupName: "주식킹",
      groupRate: "98%",
      src: getMedalImage(1),
    },
    {
      id: 2,
      alt: "3",
      groupName: "우리가 최고",
      groupRate: "105%",
      src: getMedalImage(2),
    },
  ];
  if (topNGroups.length === 0) {
    processedData = dummyData;
  } else {
    processedData = processGroupData(topNGroups);
  }

  function processGroupData(data) {
    // data 배열을 받아와서 가공
    return data.map((item, index) => ({
      id: index + 1,
      alt: (index + 1).toString(),
      src: getMedalImage(index + 1), // 수정: getMedalImage(id + 1) 대신 getMedalImage(index + 1)
      groupName: item.name,
      groupRate: `${item.profitRate}%`,
    }));
  }

  function getMedalImage(index) {
    if (index === 0) {
      return goldMedal;
    } else if (index === 1) {
      return silverMedal;
    } else if (index === 2) {
      return bronzeMedal;
    }
  }

  return (
    <div className="containerForMonthlyRanking">
      <div className="headForRanking">이번달 전체 TOP3</div>
      <div className="headerForTitle">그룹별 / 2023.10.1-2023.10.31</div>
      <div className="medalList">
        {processedData.map((data, index) => (
          <div
            key={data.id}
            className={index === 1 ? "silver" : index === 0 ? "gold" : "bronze"}
          >
            <img alt={data.alt} src={data.src} />
            <div> {data.groupName} </div>
            <div> 수익률: {data.groupRate} </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MonthlyRank;
