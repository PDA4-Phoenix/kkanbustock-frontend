import React from 'react';
import styles from './styles/new-box.module.css';
import commonStyles from './styles/main-page.module.css';
const NewBox = ({className, newTitle, date}) => {
    return (
        <div className={`${className ?? commonStyles.short_box} ${styles.container}`}>
            <section className={styles.header}>
              <div>{date ?? "2023.10.05"}</div>
              <div>news</div>
            </section>
          <section className={styles.footer}>
            <div>
              {
                newTitle ?? "인디,\n사용자 경험 최악..."
              }
            </div>
          </section>
        </div>
    );
};

export default NewBox;
