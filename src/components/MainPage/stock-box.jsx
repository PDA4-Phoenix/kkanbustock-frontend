import React from 'react';
import commonStyles from './styles/main-page.module.css';
import styles from './styles/stock-box.module.css';
import stockImage from '../../assets/images/MOLY_plant.png';

const StockBox = ({ className, stock }) => {
    // stock가 null인 경우 기본값을 설정합니다.
    const title = stock?.[0]?.itmsNm || "현대차";
    const price = stock?.[0]?.clpr || "213,000";
    const detail = stock?.[0]?.vs || 0;
    const content = stock?.[0]?.content || "대한민국 최고의 자동차 회사! 산업군 설명 설명 종목 간단 개요 개요";
    const isUp = detail > 0;

    return (
        <div className={`${className ?? commonStyles.short_box} ${styles.container}`}>
            <section>
                <div className={styles.title}>
                    오늘의 종목
                </div>
                <div className={styles.header}>
                    <div>
                        {title}
                    </div>
                    <div>
                        {price}
                    </div>
                </div>
                <div className={styles.detail}>
                    <div className={styles.upOrdown}>
                        {isUp ? <span className={styles.greenArrow}>▲</span> : <span className={styles.redArrow}>▼</span>}
                    </div>
                    <div className={styles.vs}>
                        {Math.abs(detail)}
                    </div>
                </div>
            </section>

            <section className={styles.content}>
                {content}
            </section>

            <section className={styles.image_box}>
                <div className={`${styles.short_box_image_box}`}>
                    <img className={`${styles.short_box_image}`} src={stockImage} alt={title || "사전"} />
                </div>
            </section>
        </div>
    );
};

export default StockBox;
