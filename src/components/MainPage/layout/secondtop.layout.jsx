import React from 'react';
import StockBox2 from '../stock-box2';
import styles from '../styles/main-page.module.css';
import DictionaryBox from '../dictionary-box';
import NewsBox from '../news-box';

function SecondTop({ dict, stockData, news }) {
  function formatPubDate(pubDate) {
    const date = new Date(pubDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  // 데이터가 null 또는 undefined인 경우 대체로 사용할 값 설정
  if (!stockData) {
    stockData = {
      title: '삼성전자',
      src: 'https://www.shinhansec.com/',
      date: '2023-10-9',
    };
  }
  if (!news) {
    news = [
      {
        title: '신한투자증권, 최신 알파 3.0 배포',
        link: 'https://www.shinhansec.com/',
        pubDate: new Date(2023, 9, 10), // 10월 9일
      },
      {
        title: '신한투자증권, 증권사 중 가장 만족도 높아..',
        link: 'https://www.shinhansec.com/satisfaction',
        pubDate: new Date(2023, 9, 10), // 10월 9일
      },
    ];
  }
  if (!dict) {
    dict = {
      id: 1,
      word: '사전 데이터 가져오기 실패:(',
      explanation: '데이터를 불러오지 못했습니다....:(',
    };
  }

  return (
    <div className={styles.container}>
      <div className={styles.child_container}>
        <section className={styles.row_container}>
          <StockBox2 className={styles.flex_box} style={{ padding: '20px' }} stockData={stockData} />
          {news && news.map((newsItem, index) => (
            <NewsBox
              key={index}
              title={newsItem && newsItem.title ? newsItem.title : '데이터 없음'} 
              src={newsItem && newsItem.link ? newsItem.link : 'https://www.example.com'} 
              date={newsItem && newsItem.pubDate ? formatPubDate(newsItem.pubDate) : '2023-10-9'} 
            />
          ))}
          <DictionaryBox dict={dict} />
        </section>
      </div>
    </div>
  );
}

export default SecondTop;
