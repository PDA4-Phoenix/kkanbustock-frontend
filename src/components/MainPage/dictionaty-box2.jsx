import React from 'react';
import commonStyles from './styles/main-page.module.css';
import styles from "./styles/dictionary-box2.module.css";
import dicImg from '../../assets/images/SOL_search.png';
const DictionaryBox2 = ({className, title, content}) => {
    return (
        <div className={`${className ?? commonStyles.flex_box} ${styles.container2}`}>
          <section className={styles.header2}>
            <div className={styles.title2}>{title ?? "주식"}</div>
            <div className={styles.content2}>{content ?? "회사의 자본을 이루는 단위"}</div>
          </section>
          <section className={styles.image_box2}>
            <div className={`${styles.short_box_image_box2}`}>
              <img className={`${styles.short_box_image2}`} src={dicImg} alt={"사전"}/>
            </div>
          </section>
        </div>
    );
};

export default DictionaryBox2;
