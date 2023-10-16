import React, { useState, useEffect } from "react";
import "./QuizPage.css";
import Header from "../../components/Header/Header";
import DailyQuiz from "../../components/Quiz/DailyQuiz/DailyQuiz.js";
import QuizHistory from "../../components/Quiz/QuizHistory/QuizHistory";
import axios from "axios";

function Quiz() {
  const [quizContents, setQuizContents] = useState([]); // API에서 가져온 데이터를 저장하는 상태

  // 임의의 퀴즈 데이터
  const solvedQuizData = [
    {
      questionNumber: 1,
      date: "2023-10-11",
      question: "이것은 테스트 문제입니다.",
      explanation: "이 문제는 테스트 목적으로 작성되었습니다.",
      correctAnswer: "o",
      isCorrect: true,
    },
    {
      questionNumber: 2,
      date: "2023-10-12",
      question: "또 다른 테스트 문제입니다.",
      explanation: "이 또한 테스트 목적으로 작성되었습니다.",
      correctAnswer: "x",
      isCorrect: false,
    },
  ];

  //임의의 오늘의 퀴즈 데이터
  const StockQuiz = [
    {
      id: 1,
      content: "매수란 주식을 파는 것을 의미한다.",
      explanation: "주식을 파는 행위는 매도입니다.",
      answer: "x",
      isSolved: true,
    },
  ];

  useEffect(() => {
    // API에서 데이터를 가져오는 함수
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/v1/quizzes/{1}"); // API 엔드포인트를 변경해야 할 수도 있습니다.
        setQuizContents(response.data);
        console.log("데이터 불러오기 성공");
        console.log(response.data);
      } catch (error) {
        console.error("데이터 불러오기 실패", error);
        // 실패 시에 대체 데이터 설정 가능
        setQuizContents([
          {
            questionNumber: 1,
            date: "데이터 불러오기 실패:(",
            question: "데이터 불러오기 실패:(",
            explanation: "데이터 불러오기 실패:(",
            correctAnswer: "x",
            isCorrect: false,
          },
        ]);
      }
    };

    fetchData();
  }, []); // 빈 배열을 두어 컴포넌트가 처음 렌더링될 때만 데이터를 가져오도록 설정

  return (
    <div className="quizPage">
      <Header name="QUIZ" />

      <div className="dailyQuizSection">
        <DailyQuiz stockQuiz={StockQuiz} />
      </div>

      <QuizHistory quizData={quizContents} />
    </div>
  );
}

export default Quiz;
