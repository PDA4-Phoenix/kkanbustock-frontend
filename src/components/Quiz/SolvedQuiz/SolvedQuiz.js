import React from "react";
import solveStyle from "./SolvedQuiz.module.css";

const SolvedQuiz = ({
  questionNumber,
  date,
  question,
  explanation,
  correctAnswer,
  isCorrect,
}) => {
  const resultClassName = isCorrect ? solveStyle.correct : solveStyle.incorrect;

  return (
    <div className={solveStyle.solvedItem}>
      <div className={solveStyle["solved-quiz"]}>
        <div className={solveStyle.solvedQuizItem}>
          <div className={solveStyle.questionNumber}>{questionNumber}</div>
          <div className={solveStyle.date}>{date}</div>
          <div className={solveStyle.questionSet}>
            <div className={solveStyle.qustion}>{question}</div>
            <div className={solveStyle.explanation}>{explanation}</div>
          </div>
          <div className={solveStyle.corretAnswer}>{correctAnswer}</div>
          <div
            className={`${solveStyle.isCorrect} ${
              isCorrect ? solveStyle.correct : solveStyle.incorrect
            }`}
          >
            {isCorrect ? "정답" : "오답"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolvedQuiz;
