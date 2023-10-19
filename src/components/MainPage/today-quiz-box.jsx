import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import commonStyles from './styles/main-page.module.css';
import styles from './styles/today-quiz-box.module.css';
import { axiosF } from '../../apis';

const TodayQuizBox = ({ memberId = 'choi' }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAnswered, setAnswered] = useState(false);
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState({
    answer: '',
  });

  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };

  const revealAnswer = () => {
    setAnswered(true);
  };

  const navigateToQuizPage = () => {
    navigate('/quiz');
  };

  const fetchQuiz = async () => {
    try {
      const response = await axiosF.get(`/api/v1/quizzes/daily/${memberId}`);
      if (response.data) {
        const data = response.data;
        setQuiz({
          content: data.content,
        });
      } else {
        setQuiz({
          content: '매도란 주식을 파는 것을 의미한다.',
        });
      }
    } catch (error) {
      console.error('퀴즈 불러오기 실패', error);
    }
  };

  useEffect(() => {
    console.log(memberId);
    fetchQuiz();
  }, [memberId]);

  return (
    <div
      className={`${commonStyles.flex_box} ${styles.container} ${
        isFlipped ? styles.flipped : ''
      }`}
      onMouseEnter={flipCard}
      onMouseLeave={flipCard}
      onClick={navigateToQuizPage}
    >
      <div className={styles.front}>
        <div className={styles.title}>오늘의 퀴즈</div>
        <div className={styles.content}>
          {quiz.content ?? '매도란 주식을 파는 것을 의미한다.'}
        </div>
        <section className={styles.button_group}>
          <div className={styles.button_o} onClick={revealAnswer}>
            O
          </div>
          <div className={styles.button_x} onClick={revealAnswer}>
            X
          </div>
        </section>
      </div>
      <div className={styles.back}>
        <div className={styles.backContent}>
          카드를 눌러 <br />{' '}
          <span className={styles.underline}>오늘의 퀴즈 풀러 가기</span> &gt;
        </div>
      </div>
    </div>
  );
};

export default TodayQuizBox;
