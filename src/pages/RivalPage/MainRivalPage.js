// RivalPage.js
import React, { useState, useEffect } from 'react';
import MolyTip from "../../components/MolyComponent/MolyTip";
import { useMemberId } from './../../MemberIdContext';
import StockListComponent from '../../components/StockList/StockListComponent';
import ViewScoreComponent from '../../components/ViewScore/ViewScoreComponent';
import MyGroupComponent from '../../components/MyGroup/MyGroupComponent';
import BlueLargeBtn from '../../components/ButtonComponent/BlueLargeBtn';
import { axiosF } from '../../apis';
import './MainRivalPage.css'

let hostName = '';
let guestName = '';
let guestId = '';

const stockDataList = []; // 실제 데이터로 설정하세요

function RivalPage() {
  const memberId = useMemberId();

  const [navHeight, setNavHeight] = useState(0);
  const [viewOurStock, setViewOurStock] = useState(false);

  useEffect(() => {
    const navElement = document.querySelector('.nav');
    if (navElement) {
      const height = navElement.clientHeight;
      setNavHeight(height);
    }
  }, []);

  useEffect(() => {
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
    console.log('그룹을 클릭했습니다:', group);
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
            <StockListComponent memberId={memberId} userName={hostName} width="500px" height="100%"></StockListComponent>
            <StockListComponent memberId={guestId} userName={guestName} width="500px" height="100%"></StockListComponent>
          </div>
        ) : (
          <div className="ViewMyStockSection">
            <StockListComponent memberId={memberId} width="800px" height="100%"></StockListComponent>
          </div>
        )}
        <BlueLargeBtn title="투자하러 가기" link="https://www.shinhansec.com/" />
        <MyGroupComponent memberId={memberId} onGroupItemClick={handleGroupItemClick} />
      </div>
    </div>
  );
}

export default RivalPage;
