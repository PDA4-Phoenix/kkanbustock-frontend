import React from 'react';
import commonStyles from './styles/main-page.module.css';
import styles from './styles/stock-box.module.css'
import styles2 from './styles/stock_box2.module.css'
import stockImage from '../../assets/images/quiz1.png';

const StockBox2 = ({ className, stockData}) => {
    if (!stockData) {
        return <div>Loading...</div>;
    }
    const title = stockData && stockData.itmsNm ? stockData.itmsNm : "현대차";
    const price = stockData.clpr || "213,000";
    const detail = stockData.vs || 500;
    const content = stockData.content || "대한민국 최고의 자동차 회사! 당신의 투자를 응원합니다";
    const isUp = detail > 0;
    
    return (
        <div className={`${className ?? commonStyles.flex_box} ${styles2.container2}`}>
            <div className={styles2.title2}>
                오늘의 종목
            </div>
            <div className={styles2.header2}>
                <div className={styles2.title}>{title}</div>
                <div className={styles2.price}>{price}</div>
            </div>

            <div className={styles2.detail2}>
                <div className={styles2.upOrdown2}>
                    {isUp ? <span className={styles2.greenArrow2}>▲</span> : <span className={styles2.redArrow2}>▼</span>}
                </div>
                <div className={styles2.vs}>
                    {Math.abs(detail)}
                </div>
            </div>

            <div className={styles2.content2}>
                {content}
            </div>

            <div className={styles2.image_box2}>
                <img className={styles2.short_box_image2} src={stockImage} alt={"사전"} />
            </div>
        </div>
    );
};

export default StockBox2;
