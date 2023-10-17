import React, { useEffect, useState } from "react";
import "./MainPage.css";
import Header from "../../components/Header/Header";
import MainPoint from "../../components/MainPoint/MainPoint.js";
import MonthlyRank from "../../components/MonthlyRank/MonthlyRank";
import MyGroupRanking from "../../components/MyGroupRanking/MyGroupRanking";
import TopLayout from "../../components/MainPage/layout/top.layout";
import BottomLayout from "../../components/MainPage/layout/bottom.layout";
import OnceLayout from "../../components/MainPage/layout/once.layout";
import InfiniteScroll from "react-infinite-scroll-component";
import SecondTop from "../../components/MainPage/layout/secondtop.layout";
import axios from "axios";

function Main() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [dictionaryContents, setDictionaryContents] = useState([]); // API에서 가져온 데이터를 저장하는 상태
  const [currentIndex, setCurrentIndex] = useState(
    () => Math.floor(Math.random() * 34) + 1
  );
  const [topNGroups, setTopNGroups] = useState([]); // 추가: Top N 그룹 데이터를 저장하는 상태
  const [topNMyGroups, setTopNMyGroups] = useState([]); // 추가: Top N 그룹 데이터를 저장하는 상태
  const [newsData, setNewsData] = useState([]); // 뉴스 데이터를 저장하는 상태
  const page1 = 0; // 페이지 번호 (0부터 시작)
  const size = 8; // 한 페이지당 뉴스 아이템 수

  const memberId = "choi";

  // API에서 뉴스 데이터 가져오기
  const fetchNewsData = async () => {
    try {
      const response = await axios.get("/api/v1/news", {
        params: {
          page1,
          size,
        },
      });
      const newNewsData = response.data;
      setNewsData((prevNewsData) => [...prevNewsData, ...newNewsData]); // Append new news to the existing news data
      setPage(page + 1);
    } catch (error) {
      console.error("뉴스 데이터를 불러오는 데 실패했습니다", error);
    }
  };

  const fetchTopNGroups = async () => {
    try {
      const response2 = await axios.get("/api/v1/groups/top-n-groups", {
        params: {
          n: 3,
        },
      });
      setTopNGroups(response2.data); // API에서 받은 그룹 데이터를 상태에 저장
      console.log("Top N 그룹 데이터 불러오기 성공");
      console.log(response2.data);
    } catch (error) {
      console.error("Top N 그룹 데이터 불러오기 실패", error);
    }
  };

  const fetchTopNMyGroups = async () => {
    try {
      const response3 = await axios.get(
        "/api/v1/groups/my-groups-profit-rate",
        {
          params: {
            n: 5,
            memberId: memberId,
          },
        }
      );
      setTopNMyGroups(response3.data); // API에서 받은 그룹 데이터를 상태에 저장
      console.log("Top N 마이 그룹 데이터 불러오기 성공");
      console.log(response3.data);
    } catch (error) {
      console.error("Top N 마이 그룹 데이터 불러오기 실패", error);
      // 실패한 경우에 대한 처리를 추가할 수 있습니다.
    }
  };

  function calculateDictIndex(currentIndex, index, dictionaryLength) {
    if (isNaN(currentIndex)) {
      setCurrentIndex(Math.floor(Math.random() * 34) + 1);
    }
    if (isNaN(currentIndex)) {
      setCurrentIndex(1);
    }
    currentIndex += 1;
    return (currentIndex + index) % dictionaryLength;
  }

  let dictIndex = currentIndex + 2;
  const checkLoginStatus = () => {
    return true;
  };

  const fetchMoreData = () => {
    const newData = [...items, ...Array.from({ length: 10 }, (_, i) => i + 1)];
    setItems(newData);
    setPage(page + 1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % dictionaryContents.length); // 1씩 증가
  };

  // 사전 데이터를 가져오는 함수
  const fetchDictionaryData = async () => {
    try {
      const response = await axios.get("/api/v1/dictionary"); // API 엔드포인트가 필요에 따라 수정되어야 할 수 있습니다.
      return response.data;
    } catch (error) {
      console.error("사전 데이터 가져오기 실패", error);
      return [
        {
          id: 1,
          word: "사전 데이터 가져오기 실패:(",
          explanation: "데이터를 불러오지 못했습니다....:(",
        },
      ];
    }
  };

  const fetchMoreNewsData = async () => {
    try {
      const response = await axios.get("/api/v1/news", {
        params: {
          page1: page,
          size,
        },
      });
      const newNewsData = response.data;
      if (newNewsData.length > 0) {
        setNewsData((prevNewsData) => [...prevNewsData, ...newNewsData]);
        setPage(page + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("추가 뉴스 데이터를 불러오는 데 실패했습니다", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchDictionaryData();
      setDictionaryContents(data);
    };
    fetchNewsData(); // 초기에 10개의 뉴스를 가져옵니다.
    fetchData();
    fetchTopNGroups();
    fetchTopNMyGroups();
    fetchMoreNewsData();
    setIsLoggedIn(checkLoginStatus());
  }, []);

  // 예시 분배 - 컴포넌트 구조에 따라 조정하세요
  const topNews = newsData.slice(0, 3); // TopLayout에는 3개의 뉴스 아이템이 필요합니다
  const onceNews = newsData.slice(3, 4); // OnceLayout에는 1개의 뉴스 아이템이 필요합니다
  const bottomNews = newsData.slice(4, 8); // BottomLayout에는 4개의 뉴스 아이템이 필요합니다
  const secondTopNews = newsData.slice(8, 11); // SecondTop에는 3개의 뉴스 아이템이 필요합니다
  const secondBottomNews = newsData.slice(11, 15); // SecondBottom에는 4개의 뉴스 아이템이 필요합니다

  return (
    <div>
      <MainPoint />
      <div className="titleForMain">'깐부 내기 랭킹'</div>
      <div className="rankingSection">
        <MonthlyRank topNGroups={topNGroups} />
        {isLoggedIn && <MyGroupRanking topNMyGroups={topNMyGroups} />}
      </div>
      <div className="titleForMain">'당신을 위한 오늘의 증권 소식'</div>
      <div className="cardSection">
        <TopLayout
          news={topNews}
          dict={
            dictionaryContents[
              calculateDictIndex(currentIndex, 0, dictionaryContents.length)
            ]
          }
        />
        <OnceLayout news={onceNews} />
        <BottomLayout
          news={bottomNews}
          dict={
            dictionaryContents[
              calculateDictIndex(currentIndex, 1, dictionaryContents.length)
            ]
          }
        />
      </div>

      <InfiniteScroll
        dataLength={items.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
      >
        {" "}
        {items.map((item, index) => {
          dictIndex = dictIndex + 1;
          return (
            <div key={index} className="cardSection">
              <SecondTop
                news={secondTopNews}
                dict={
                  dictionaryContents[
                    (dictIndex + index) % dictionaryContents.length
                  ]
                }
              />
              <BottomLayout
                news={secondBottomNews}
                dict={
                  dictionaryContents[
                    ((dictIndex + index) % dictionaryContents.length) + 1
                  ]
                }
              />
            </div>
          );
        })}
      </InfiniteScroll>
    </div>
  );
}

export default Main;
