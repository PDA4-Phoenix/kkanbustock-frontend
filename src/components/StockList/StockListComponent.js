import React, { useState, useEffect } from 'react';
import "./StockListComponent.css";
import StockListCover from "./StockListCover";
import StockListItem from "./StockListItem";
import WhiteContentBtn from "./../ButtonComponent/WhiteContentBtn";
import axios from 'axios'; // 이 부분은 API 호출을 위해 남겨두세요.

function StockListComponent({ width, height, userName = "나", memberId = "나" }) {
  const [stockDataList, setStockDataList] = useState([]);
  const [manyStockName, setManyStockName] = useState("");

  // 더미 데이터를 정의합니다.
  const ddDummyData = [
    {
      memberId: "dd",
      stockId: "1",
      itmsNm: "조흥",
      purchasePrice: 173600,
      quantity: 10,
      purchaseAmount: 1736000,
      equitiesValue: 13.2,
      profitRate: 1.023,
      gainsLosses: 1,
    },
    {
      memberId: "dd",
      stockId: "2",
      itmsNm: "CJ 제일 제당",
      purchasePrice: 282500,
      quantity: 10,
      purchaseAmount: 2825000,
      equitiesValue: 13,
      profitRate: 12.32,
      gainsLosses: 10,
    },
    {
      memberId: "dd",
      stockId: "5",
      itmsNm: "오뚜기",
      purchasePrice: 369500,
      quantity: 10,
      purchaseAmount: 3695000,
      equitiesValue: 13,
      profitRate: -4.22,
      gainsLosses: 10,
    },
  ];

  const eeDummyData = [
    {
      memberId: "ee",
      stockId: "3",
      itmsNm: "삼양 식품",
      purchasePrice: 191700,
      quantity: 10,
      purchaseAmount: 191700,
      equitiesValue: 90,
      profitRate: 0.8541044,
      gainsLosses: 10,
    },
  ];

  useEffect(() => {
    // memberId에 따라 더미 데이터를 설정합니다.
    const dummyData = memberId === "dd" ? ddDummyData : eeDummyData;
    setStockDataList(dummyData);

    // 가장 많이 투자한 종목 찾기
    if (dummyData.length > 0) {
      const maxEquitiesValueItem = dummyData.reduce((max, item) =>
          item.purchaseAmount > max.purchaseAmount ? item : max
      );
      setManyStockName(maxEquitiesValueItem.itmsNm);
    } else {
      setManyStockName("투자한 주식이 없습니다");
    }
  }, [memberId]);

  const stockListItems = stockDataList.map((data, index) => (
      <StockListItem
          key={index}
          profitRate={data.profitRate}
          stockName={data.itmsNm}
          quantity={data.quantity}
          purchasePrice={data.purchasePrice}
      />
  ));

  return (
      <div className='StockListComponentWrap' style={{ width: width }}>
        <div className='stockListContentTitle' style={{ width: width }}>
          {userName}의 포트폴리오
        </div>
        <div className="stockListContent" style={{ width: width }}>
          <StockListCover>{stockListItems}</StockListCover>
        </div>
        <WhiteContentBtn width={width} height={height}>
          <div className='manyStockContent'>
            <div className='manyStockTitle'>{memberId}가 가장 많이 투자한 종목</div>
            <div className='manyStockName'>{manyStockName}</div>
          </div>
        </WhiteContentBtn>
      </div>
  );
}

export default StockListComponent;