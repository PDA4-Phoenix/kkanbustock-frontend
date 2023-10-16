import React from 'react';
import styles from "../styles/main-page.module.css";
import onceLayoutStyles from '../styles/once-layout.module.css';
import NewsBox from "../news-box";
import InvestmentAppetiteBox from "../investment-appetite-box";
import StockBox from "../stock-box";

const OnceLayout = () => {
    return (
        <div className={styles.container}>
            <div className={styles.child_container}>
                <section className={onceLayoutStyles.layout}>
                  <div className={onceLayoutStyles.left_layout}>
                    <NewsBox className={onceLayoutStyles.once_short_box}/>
                    <StockBox className={onceLayoutStyles.once_short_box}/>
                  </div>
                  <InvestmentAppetiteBox/>
                </section>
            </div>
        </div>
    );
};

export default OnceLayout;
