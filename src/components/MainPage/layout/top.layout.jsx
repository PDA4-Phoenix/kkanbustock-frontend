import React, { useEffect, useState } from "react";
import NewsBox from "../news-box";
import styles from "../styles/main-page.module.css";
import TodayQuizBox from "../today-quiz-box";
import DictionaryBox from "../dictionary-box";
import { axiosF } from "../../../apis";

const TopLayout = ({ dict, news }) => {
  const userId = "choi"; // 예를 들어 userId를 하드코딩하거나 props로 가져옵니다.
  function formatPubDate(pubDate) {
    const date = new Date(pubDate); // 문자열을 Date 객체로 변환
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1 해주고 2자리로 포맷
    const day = String(date.getDate()).padStart(2, "0"); // 일을 2자리로 포맷
  
    return `${year}-${month}-${day}`;
  }
  
  return (
    <div className={styles.container}>
      <div className={styles.child_container}>
        <section className={styles.row_container}>
          <TodayQuizBox memberId={userId} />
          {news && news.map((newsItem, index) => (
            <NewsBox
              key={index}
              title={newsItem.title}
              src={newsItem.link}
              date={formatPubDate(newsItem.pubDate)} // 연-월-일 형식으로 날짜 표시
            />
          ))}
          <DictionaryBox dict={dict} />
        </section>
      </div>
    </div>
  );
};

export default TopLayout;
