import React, { useEffect } from 'react'; // useEffect 추가
import NewsBox from "../news-box";
import { useHistory } from 'react-router-dom';
import styles from '../styles/main-page.module.css';
import TodayQuizBox from "../today-quiz-box";
import DictionaryBox from "../dictionary-box";
import DailyQuiz from '../../Quiz/DailyQuiz/DailyQuiz';
import axios from 'axios';

const TopLayout = () => {

  const StockQuiz = [
    {
      id: 1,
      content: "매수란 주식을 파는 것을 의미한다.",
      explanation: "주식을 파는 행위는 매도입니다.",
      answer: "x",
      isSolved: true,
    },
  ];

  const getNews = async (query) => {
    try {
      const response = await axios.get(`https://e715-123-254-143-22.ngrok-free.app/new?query=${query}`);
      const news = response.data;
      console.log(news);
    } catch (error) {
      console.error("API 요청 오류:", error);
    }
  } 

  useEffect(() => {
    const query = "주식"; // 뉴스 쿼리를 설정
    getNews(query); // 뉴스를 가져오는 함수 호출
  }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때 한 번만 호출

  return (
    <div className={styles.container}>
      <div className={styles.child_container}>
        <section className={styles.row_container}>
          <TodayQuizBox stockQuiz={StockQuiz}/>
          <NewsBox />
          <NewsBox />
          <NewsBox />
          <DictionaryBox />
        </section>
      </div>
    </div>
  );
};

export default TopLayout;
