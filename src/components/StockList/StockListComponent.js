import React, { useState, useEffect } from "react";
import "./StockListComponent.css";
import StockListCover from "./StockListCover";
import StockListItem from "./StockListItem";
import WhiteContentBtn from "./../ButtonComponent/WhiteContentBtn";
import axios from "axios";

function StockListComponent({
  width,
  height,
  userName = "dd",
  memberId = "dd",
}) {
  const [stockDataList, setStockDataList] = useState([]);
  const [manyStockName, setManyStockName] = useState(""); // 가장 많이 투자한 종목을 저장할 상태

  useEffect(() => {
    axios
      .get(
        `http://service.team-4.svc.cluster.local:8080
      /api/v1/portfolios/${memberId}`
      )
      .then((response) => {
        const data = response.data;
        setStockDataList(data);

        // 가장 많이 투자한 종목 찾기
        if (data.length > 0) {
          const maxEquitiesValueItem = data.reduce((max, item) =>
            item.purchaseAmount > max.purchaseAmount ? item : max
          );
          setManyStockName(maxEquitiesValueItem.itmsNm);
        } else {
          setManyStockName("투자한 주식이 없습니다");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
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
    <div className="StockListComponentWrap" style={{ width: width }}>
      <div className="stockListContentTitle" style={{ width: width }}>
        {userName}의 포트폴리오
      </div>
      <div className="stockListContent" style={{ width: width }}>
        <StockListCover>{stockListItems}</StockListCover>
      </div>
      <WhiteContentBtn width={width} height={height}>
        <div className="manyStockContent">
          <div className="manyStockTitle">
            {memberId}가 가장 많이 투자한 종목
          </div>
          <div className="manyStockName">{manyStockName}</div>
        </div>
      </WhiteContentBtn>
    </div>
  );
}

export default StockListComponent;
