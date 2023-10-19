import React from 'react';
import styles from "../styles/main-page.module.css";
import TodayQuizBox from "../today-quiz-box";
import NewsBox from "../news-box";
import DictionaryBox2 from '../dictionaty-box2';

const BottomLayout = ( { dict , news }) => {

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
                    {news && news.map((newsItem, index) => (
                        <NewsBox
                        key={index}
                        title={newsItem.title}
                        src={newsItem.link}
                        date={formatPubDate(newsItem.pubDate)} // 연-월-일 형식으로 날짜 표시
                        />
                    ))}
                    <DictionaryBox2 dict={dict} /> {/* dict prop을 전달 */}
                </section>
            </div>
        </div>
    );
};

export default BottomLayout;
