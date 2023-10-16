import React, { useEffect, useState } from "react";
import "./MainPage.css";
import Header from "../../components/Header/Header";
import MainPoint from "../../components/MainPoint/MainPoint.js";
import MonthlyRank from "../../components/MonthlyRank/MonthlyRank";
import MyGRoupRanking from "../../components/MyGroupRanking/MyGroupRanking";
import TopLayout from "../../components/MainPage/layout/top.layout";
import BottomLayout from "../../components/MainPage/layout/bottom.layout";
import OnceLayout from "../../components/MainPage/layout/once.layout";
import InfiniteScroll from "react-infinite-scroll-component";
import SecondTop from "../../components/MainPage/layout/secondtop.layout";

function Main() {
  // 유저 로그인 상태를 관리하는 상태 변수
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  // 유저 로그인 여부를 확인하는 함수
  const checkLoginStatus = () => {
    // 실제 로그인 상태 확인 로직을 구현할 예정
    // 여기에서는 간단히 false를 반환하는 예시를 사용합니다.
    return true;
  };

  const fetchMoreData = () => {
    // 데이터를 추가로 불러올 비동기 작업을 수행합니다.
    // 예를 들어, API 호출을 통해 새로운 데이터를 가져올 수 있습니다.
    // 가져온 데이터를 items 배열에 추가하고 hasMore 상태를 업데이트합니다.
    // 만약 더 이상 데이터가 없다면 hasMore를 false로 설정합니다.

    // 예제: 가상으로 데이터를 추가하는 방법
    const newData = [...items, ...Array.from({ length: 10 }, (_, i) => i + 1)];
    setItems(newData);
    setPage(page + 1);
  };

  useEffect(() => {
    // 컴포넌트가 마운트될 때 로그인 상태 확인
    setIsLoggedIn(checkLoginStatus());
    fetchMoreData();
  }, []);

  return (
    <div>
      <MainPoint />
      <div className="titleForMain">'깐부 내기 랭킹'</div>
      <div className="rankingSection">
        <MonthlyRank />
        {isLoggedIn && <MyGRoupRanking />}
      </div>
      <div className="titleForMain">'당신을 위한 오늘의 증권 소식'</div>

      <div className="cardSection">
        <TopLayout />
        <OnceLayout />
        <BottomLayout />
      </div>

      <InfiniteScroll
        dataLength={items.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
      >
        {items.map((item, index) => (
          <div key={index} className="cardSection">
            <SecondTop />
            <BottomLayout />
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
}

export default Main;
