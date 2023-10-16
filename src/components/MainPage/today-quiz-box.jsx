import React, { useState } from "react";
import commonStyles from './styles/main-page.module.css';
import styles from './styles/today-quiz-box.module.css';

const TodayQuizBox = ({ stockQuiz, customStyle }) => {
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  const handleAnswerClick = (selectedAnswer) => {
    if (answered) {
      return; // Already answered, don't do anything
    }

    const isAnswerCorrect = selectedAnswer === stockQuiz[0].answer;
    setSelectedAnswer(selectedAnswer);
    setIsCorrect(isAnswerCorrect);
    setAnswered(true);
  };

  const getAnswerClass = (answer) => {
    if (answered) {
      if (answer === selectedAnswer) {
        return isCorrect ? styles.correct : styles.incorrect;
      } else {
        return styles.disabled;
      }
    }
    return "";
  };

  return (
    <div className={`${commonStyles.flex_box} ${styles.container}`}>
      <div className={styles.title2}>오늘의 퀴즈</div>
      <div className={`${styles.dailyQuizQnASet2} ${answered ? styles.answered2 : ""}`}>
        <div className={styles.question2}>{stockQuiz[0].content}</div>
        {answered && stockQuiz[0].answer === "x" && (
          <div className={styles.explanation2}>{stockQuiz[0].explanation}</div>
        )}
        <div className={styles.oxbtn2}>
          <button
            className={`${styles.answer2} ${getAnswerClass("o")}`}
            onClick={() => handleAnswerClick("o")}
          >
            O
          </button>
          <button
            className={`${styles.answer2} ${getAnswerClass("x")}`}
            onClick={() => handleAnswerClick("x")}
          >
            X
          </button>
        </div>
      </div>
      {answered && (
        <div className={`${styles.answerStatus2} ${isCorrect ? "correct" : "incorrect"}`}>
          {isCorrect
            ? "정답입니다! \n 퀴즈 카드로 이동하여 더 많은 문제를 풀어보세요!"
            : `땡! 정답은 '${stockQuiz[0].answer}'입니다 \n 퀴즈 카드로 이동하여 더 많은 문제를 풀어보세요!`}
        </div>
      )}
    </div>
  );
}

export default TodayQuizBox;
