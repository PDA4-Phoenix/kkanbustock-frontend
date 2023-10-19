import React, { useEffect, useState } from 'react';
import styles from '../styles/main-page.module.css';
import onceLayoutStyles from '../styles/once-layout.module.css';
import NewsBox from '../news-box';
import InvestmentAppetiteBox from '../investment-appetite-box';
import StockBox from '../stock-box';
import axios from 'axios';

const OnceLayout = ({ news }) => {
  // 주식 정보를 저장할 상태
  const [stockData, setStockData] = useState(null);

  // API에서 주식 정보 가져오기
  const fetchStockRecommendations = async () => {
    try {
      const size = 1;

      const response = await axios.get("http://service.team-4.svc.cluster.local:8080/api/v1/recommends", {
        params: {
          page: 0,
          size: size,
        },
      });
      const stockData = response.data.content;
      console.log("주식 데이터 수신:", stockData);
      setStockData(stockData); // 상태 업데이트로 데이터 저장
    } catch (error) {
      console.error("주식 데이터 가져오기 실패", error);
    }
  };

  // 컴포넌트가 마운트될 때 주식 정보 가져오기
  useEffect(() => {
    fetchStockRecommendations();
  }, []);

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
        <section className={onceLayoutStyles.layout}>
          <div className={onceLayoutStyles.left_layout}>
            {news.length > 0 ? (
              <NewsBox
                className={onceLayoutStyles.once_short_box} 
                key={0}
                title={news[0].title}
                src={news[0].link}
                date={formatPubDate(news[0].pubDate)}
              />
            ) : null}
            <StockBox
              className={onceLayoutStyles.once_short_box}
              stock={stockData} // 주식 정보를 StockBox 컴포넌트로 전달
            />
          </div>
          <InvestmentAppetiteBox />
        </section>
      </div>
    </div>
  );
};

export default OnceLayout;
