import React from 'react';
import NewsBox from "../news-box";
import { useHistory } from 'react-router-dom';
import styles from '../styles/main-page.module.css';
import TodayQuizBox from "../today-quiz-box";
import DictionaryBox from "../dictionary-box";
import DailyQuiz from '../../Quiz/DailyQuiz/DailyQuiz';

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
