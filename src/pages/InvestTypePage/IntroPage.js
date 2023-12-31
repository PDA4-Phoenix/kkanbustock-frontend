import React from 'react';
import "./IntroPage.css";
import SOL_hello from "./../../assets/images/sol-hello.png";
import Nav from '../../components/Nav/Nav';
import { Link } from 'react-router-dom';

let nickname = "dd";

function InvestType_intro() {
    return (
        <div className='InvestType_intro-container'>
            <div className='InvestType_intro'>
                <div className='intro-container'>
                    <div className='intro-title'>
                        <h2><span>{nickname}</span>님의</h2>
                        <h1>투자성향테스트</h1>
                    </div>
                    <Link to="/InvestType/Question">
                        <button className="introStart">시작하기</button> 
                    </Link>
                </div>
                <img alt="안녕하세요 쏠" src={SOL_hello} />
            </div>
        </div>
    );
}

export default InvestType_intro;
