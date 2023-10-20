import "./MainRivalPage.css";
import ViewScoreComponent from "./../../components/ViewScore/ViewScoreComponent";
import StockListComponent from "./../../components/StockList/StockListComponent";
import MyGroupComponent from "./../../components/MyGroup/MyGroupComponent.js";
import BlueLargeBtn from "../../components/ButtonComponent/BlueLargeBtn";
import React, { useState, useEffect } from 'react';


let hostName="";
let guestName="";
let guestId ="";
const memberId = "dd";

const stockDataList = []; // 실제 데이터로 설정하세요

function RivalPage() {
  const [navHeight, setNavHeight] = useState(0);
  const [viewOurStock, setViewOurStock] = useState(false); // 렌더링 제어를 위한 상태

  useEffect(() => {
    // Nav의 높이 측정
    const navElement = document.querySelector(".nav");
    if (navElement) {
      const height = navElement.clientHeight;
      setNavHeight(height);
    }
  }, []);

  useEffect(() => {
    // stockDataList가 비어있는지 확인하고 그에 따라 상태 설정
    if (stockDataList && stockDataList.length > 0) {
      setViewOurStock(true);
    } else {
      setViewOurStock(false);
    }
  }, [stockDataList]);

  const rivalPageStyle = {
    marginTop: `${navHeight}px`,
  };

  const handleGroupItemClick = (group) => {
    // 그룹 정보 처리
    console.log("그룹을 클릭했습니다:", group);
    guestId = group.guestId;
    hostName = group.hostName;
    guestName = group.guestName;
    setViewOurStock(true);
  };


  return (
      <div>
        <div className="RivalPageWrap" style={rivalPageStyle}>

          <ViewScoreComponent memberId={memberId} guestId={guestId}></ViewScoreComponent>
          {viewOurStock ? (
              <div className="ViewOurStockSection">
                <StockListComponent memberId={memberId} userName={hostName}  width="500px" height="100%"></StockListComponent>
                <StockListComponent memberId={guestId}  userName={guestName} width="500px" height="100%"></StockListComponent>
              </div>
          ) : (
              <div className="ViewMyStockSection">
                <StockListComponent memberId={memberId}  width="800px" height="100%"></StockListComponent>
              </div>
          )}
          <BlueLargeBtn title="투자하러 가기"></BlueLargeBtn>
          <MyGroupComponent memberId={memberId} onGroupItemClick={handleGroupItemClick} />
        </div>
      </div>
  )
}

export default RivalPage;