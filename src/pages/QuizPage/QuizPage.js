import React, { useState, useEffect } from "react";
import "./QuizPage.css";
import Header from "../../components/Header/Header";
import DailyQuiz from "../../components/Quiz/DailyQuiz/DailyQuiz.js";
import QuizHistory from "../../components/Quiz/QuizHistory/QuizHistory";
import axios from "axios";
import { useToken } from "../LoginPage/TokenContext";
import { useMemberId } from "../LoginPage/MemberContext";

function Quiz() {
  const getAxios = (token) => {
    const config = {
      baseURL: "http://service.team-4.svc.cluster.local:8080",
      headers: {
        accept: "application/json",
        "X-Requested-With": "XMLHttpRequest",
      },
    };

    // 토큰이 존재할 경우에만 요청 헤더에 추가
    if (token) {
      console.log("토큰있다");
      config.headers["authorization"] = `Bearer ${token}`;
    }

    return axios.create(config);
  };

  const [quizContents, setQuizContents] = useState([]); // API에서 가져온 데이터를 저장하는 상태
  //   const { token } = useToken();
  //   const { memberId } = useMemberId();

  const token =
    "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyNyIsInJvbGVzIjpbIlJPTEVfVVNFUiJdLCJpYXQiOjE2OTc2NTU1MjEsImV4cCI6MTY5NzY5MTUyMX0.6uUkSyaB39VgSz8NbL_PU2opnrrgRJFkZO3IC6zZHlo";
  const memberId = "user7";

  useEffect(() => {
    // API에서 데이터를 가져오는 함수
    const fetchData = async () => {
      try {
        const response = await axios(token).get(
          `http://service.team-4.svc.cluster.local:8080/api/v1/quizzes/${memberId}`
        );

        console.log(token);
        console.log(memberId);

        const formattedData = response.data.map((quiz, index) => {
          const solvedDate = new Date(quiz.solvedDate);
          const formattedDate = `${solvedDate.getFullYear()}-${(
            solvedDate.getMonth() + 1
          )
            .toString()
            .padStart(2, "0")}-${solvedDate
            .getDate()
            .toString()
            .padStart(2, "0")}`;
          return {
            questionNumber: index + 1,
            date: formattedDate,
            question: quiz.content,
            correctAnswer: quiz.answer,
            isCorrect: quiz.correct,
            explanation: quiz.explanation,
          };
        });
        setQuizContents(formattedData);
        console.log("데이터 불러오기 성공");
        console.log(formattedData);
      } catch (error) {
        console.error("데이터 불러오기 실패", error);
        setQuizContents([
          {
            questionNumber: 1,
            date: "2023-10-11",
            question:
              "주식이란 주식회사의 자본을 일정한 금액으로 분할한 것이다.",
            correctAnswer: "o",
            isCorrect: true,
          },
        ]);
      }
    };

    fetchData();
  }, [memberId, token]);

  // 임의의 오늘의 퀴즈 데이터
  const StockQuiz = [
    {
      id: 1,
      content: "매수란 주식을 파는 것을 의미한다.",
      explanation: "주식을 파는 행위는 매도입니다.",
      answer: "x",
      isSolved: true,
    },
  ];

  return (
    <div className="quizPage">
      <Header name="QUIZ" />
      <div className="dailyQuizSection">
        <DailyQuiz memberId={memberId} />
      </div>
      <QuizHistory quizData={quizContents} />
    </div>
  );
}

export default Quiz;
