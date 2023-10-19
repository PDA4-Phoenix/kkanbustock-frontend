import React, { useState, useEffect } from "react";
import "./DailyQuiz.css";
import { axiosF } from "../../../apis";

function DailyQuiz({ memberId }) {
  const [quiz, setQuiz] = useState({
    quizId: "",
    content: "",
    answer: "",
    explanation: "",
    solved: false,
  });
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const isCorrectClassName = isCorrect
    ? "answerStatus--correct"
    : "answerStatus--incorrect";

  const fetchQuiz = async () => {
    try {
      const response = await axiosF.get(`/api/v1/quizzes/daily/${memberId}`);
      if (response.data) {
        const data = response.data;
        setQuiz({
          quizId: data.id,
          content: data.content,
          answer: data.answer,
          explanation: data.explanation,
          solved: data.solved,
        });
      } else {
        // 서버에서 퀴즈가 없는 경우에 대한 처리
        setQuiz({
          quizId: "",
          content: "오늘의 퀴즈가 없습니다.",
          answer: "",
          explanation: "",
          solved: true,
        });
      }
    } catch (error) {
      console.error("퀴즈 불러오기 실패", error);
    }
  };

  useEffect(() => {
    console.log(memberId); // 멤버 아이디를 콘솔에 출력
    fetchQuiz();
  }, [memberId]);

  const handleAnswerClick = async (selectedAnswer) => {
    if (answered) {
      return;
    }

    const isAnswerCorrect = selectedAnswer === quiz.answer;
    setSelectedAnswer(selectedAnswer);
    setIsCorrect(isAnswerCorrect);
    setAnswered(true);

    const buttons = document.querySelectorAll(".oxbtn button");
    buttons.forEach((button) => {
      button.classList.remove("selected");
    });
    const selectedButton = document.querySelector(
      `.oxbtn button.${selectedAnswer}`
    );
    if (selectedButton) {
      selectedButton.classList.add("selected");
    }

    try {
      await axiosF.post(`/api/v1/quizzes/daily`, {
        memberId: memberId,
        stockQuizId: quiz.quizId,
        isCorrect: isAnswerCorrect,
      });

      console.log("POST 요청 성공: 문제 푼 상태 업데이트 완료");
    } catch (error) {
      console.error(
        "POST 요청 실패: 문제 푼 상태 업데이트 실패",
        error,
        memberId,
        quiz.quizId,
        isAnswerCorrect
      );
    }
  };

  return (
    <div className="dailyQuiz">
      <div className="quizTitle">오늘의 퀴즈</div>
      <div className={`dailyQuizQnASet ${answered ? "answered" : ""}`}>
        <div id="question">{quiz.content}</div>
        {answered && quiz.answer === "X" && (
          <div id="explanation">{quiz.explanation}</div>
        )}
        <div className="oxbtn">
          <button
            className={`answer ${selectedAnswer === "O" ? "selected" : ""} ${
              answered ? "answered" : ""
            }`}
            onClick={() => handleAnswerClick("O")}
          >
            O
          </button>
          <button
            className={`answer ${selectedAnswer === "X" ? "selected" : ""} ${
              answered ? "answered" : ""
            }`}
            onClick={() => handleAnswerClick("X")}
          >
            X
          </button>
        </div>
      </div>
      {answered && (
        <div className={`answerStatus ${isCorrectClassName}`}>
          {isCorrect ? "정답입니다!" : `땡! 정답은 '${quiz.answer}'입니다`}
        </div>
      )}
    </div>
  );
}

export default DailyQuiz;
