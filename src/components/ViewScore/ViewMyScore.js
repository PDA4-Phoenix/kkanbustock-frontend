import React, { useState, useEffect } from 'react';
import "./ViewMyScore.css";
import ViewScoreInfo from './ViewScoreInfo';
import SOL_GO from "./../../assets/images/SOL_GO.png";
import SOL_Happy from "./../../assets/images/SOL_exciting.png";
import SOL_Sad from "./../../assets/images/SOL_worry.png";


function ViewMyScore({ memberId , totalProfitRate, matchResult }) {


    const mySadariggolClass = matchResult === 'win' ? 'winClass' : (matchResult === 'loss' ? 'lossClass' : 'defaultClass');
    let SOL_img = SOL_GO;

    if (matchResult === 'win') {
        SOL_img = SOL_Happy;
    }
    else if(matchResult ==="loss"){
        SOL_img = SOL_Sad;

    }
    else{
        SOL_img = SOL_GO;

    }

    return (
        <div className='componentWrap'>
            <div className={`mySadariggol ${mySadariggolClass}`}>
                <div className='myScoreInfo'>
                    <ViewScoreInfo who="ME" nickname={memberId} totalProfitRate={totalProfitRate} matchResult={matchResult}/>
                </div>
                <img alt="SOL" src={SOL_img} />
            </div>
        </div>
    );
}

export default ViewMyScore;
