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
  const [stockData, setStockData] = useState([]); // Added this state for stock data
  const [dictionaryContents, setDictionaryContents] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(
    () => Math.floor(Math.random() * 34) + 1
  );
  const [topNGroups, setTopNGroups] = useState([]);
  const [topNMyGroups, setTopNMyGroups] = useState([]);
  const [newsData, setNewsData] = useState([]);
  const page1 = 0;
  const size = 8;
  const memberId = "choi";

  const fetchNewsData = async () => {
    try {
      const response = await axios.get(
        "/api/v1/news",
        {
          params: {
            page1,
            size,
          },
        }
      );
      const newNewsData = response.data;
      setNewsData((prevNewsData) => [...prevNewsData, ...newNewsData]);
      setPage(page + 1);
    } catch (error) {
      console.error("뉴스 데이터를 불러오는 데 실패했습니다", error);
    }
  };

  const fetchTopNGroups = async () => {
    try {
      const response2 = await axios.get(
        "/api/v1/groups/top-n-groups",
        {
          params: {
            n: 3,
          },
        }
      );
      setTopNGroups(response2.data);
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
      setTopNMyGroups(response3.data);
    } catch (error) {
      console.error("Top N 마이 그룹 데이터 불러오기 실패", error);
    }
  };

  const calculateDictIndex = (currentIndex, index, dictionaryLength) => {
    currentIndex += 1;
    return (currentIndex + index) % dictionaryLength;
  };

  const checkLoginStatus = () => {
    return true; // Modify this based on your login logic
  };

  const fetchMoreData = () => {
    const newData = [...items, ...Array.from({ length: 10 }, (_, i) => i + 1)];
    setItems(newData);
    setPage(page + 1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % dictionaryContents.length);
  };

  const fetchDictionaryData = async () => {
    try {
      const response5 = await axios.get(
        "/api/v1/dictionary"
      );
      return response5.data;
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

  const fetchStockRecommendations = async () => {
    try {
      const response = await axios.get(
        "/api/v1/recommends",
        {
          params: {
            page: 1,
            size: 100,
          },
        }
      );
      const newStockData = response.data.content;
      setStockData(newStockData);
    } catch (error) {
      console.error("주식 데이터 가져오기 실패", error);
    }
  };

  const fetchMoreNewsData = async () => {
    try {
      const response7 = await axios.get(
        "/api/v1/news",
        {
          params: {
            page1: page,
            size,
          },
        }
      );
      const newNewsData = response7.data;
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
      const dictionaryData = await fetchDictionaryData();
      setDictionaryContents(dictionaryData);
      fetchStockRecommendations();
    };

    fetchNewsData();
    fetchData();
    fetchTopNGroups();
    fetchTopNMyGroups();
    fetchMoreNewsData();
    setIsLoggedIn(checkLoginStatus());
  }, []);

  const topNews = newsData.slice(0, 3);
  const onceNews = newsData.slice(3, 4);
  const bottomNews = newsData.slice(4, 8);
  const secondTopNews = newsData.slice(8, 11);
  const secondBottomNews = newsData.slice(11, 15);

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
        {items.map((item, index) => {
          const dictIndex = index + 2; // Modify as needed
          const stockIndex = index + 2; // Modify as needed
          const stockItem = stockData[stockIndex];

          return (
            <div key={index} className="cardSection">
              <SecondTop
                news={secondTopNews}
                dict={dictionaryContents[dictIndex]}
                stockData={stockItem}
              />
              <BottomLayout
                news={secondBottomNews}
                dict={dictionaryContents[dictIndex + 1]}
              />
            </div>
          );
        })}
      </InfiniteScroll>
    </div>
  );
}

export default Main;
