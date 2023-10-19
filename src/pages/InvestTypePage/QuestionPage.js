import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./QuestionPage.css";
import SOL_happy from "./../../assets/images/SOL_happy.png";
import Quiz from "./../../assets/images/quiz1.png";
import axios from 'axios';

function InvestType_question() {
    const [quizNumber, setQuizNumber] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userAnswers, setUserAnswers] = useState([]); // 사용자 응답 저장 배열
    const navigate = useNavigate();



    useEffect(() => {
        axios.get('service.team-4.svc.cluster.local:8080/api/v1/risk-profile-questions')
            .then((response) => {
                setQuestions(response.data);
                setLoading(false); // 데이터 로드가 완료되면 loading 상태를 false로 변경
            })
            .catch((error) => {
                console.error('Error fetching questions:', error);
                setLoading(false); // 데이터 로드 실패 시 loading 상태를 false로 변경
            });
    }, []);

    const handleAnswer = async (answer) => {
        console.log(answer);
        await setUserAnswers([...userAnswers, answer]);


        if (quizNumber === questions.length - 1) {
            await axios.post('service.team-4.svc.cluster.local:8080/api/v1/submit-user-answers', {
                params : userAnswers,
            }).catch((error) => {
                console.error('Error submitting answers:', error);
            });
            console.log(userAnswers);

            navigate('/InvestQuestion/Result'); // 결과 페이지로 이동
        } else if (quizNumber < questions.length - 1) {
            setQuizNumber(quizNumber + 1);
            setSelectedAnswer(null);
        }
    }

    if (loading) {
        // 데이터가 로드 중일 때 로딩 메시지 표시
        return <p>Loading questions...</p>;
    }

    const progressBarWidth = (quizNumber + 1) * (100 / questions.length);

    return (
        <div clasName="InvestType_question-wrap">
            <div className='InvestType_question-container'>
                <div className='progressBar'>
                    <div className='progressBar-now'>
                    <div
                        className='progress-bar-blue'
                        style={{ width: `${progressBarWidth}%`, transition: 'width 0.5s' }}
                    ></div>                    <img alt="행복한 쏠" src={SOL_happy}></img>
                    </div>
                </div>
                <div className='quiz-container'>
                    <div className='quiz-title'>
                        <h2>Q{quizNumber + 1}</h2>
                        <h1>{questions[quizNumber].content}</h1>
                    </div>
                    <div className='quiz-mainContent'>
                        <img alt="퀴즈 이미지" src={Quiz}></img>
                        <div className='quiz-select'>
                            <button onClick={() => handleAnswer(true)}>{questions[quizNumber].option1}</button>
                            <button onClick={() => handleAnswer(false)}>{questions[quizNumber].option2}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default InvestType_question;
