import React, { useState, useEffect } from 'react';
import "./ViewRivalScore.css";
import ViewScoreInfo from './ViewScoreInfo';
import PLI_GO from './../../assets/images/PLI_GO.png';
import PLI_Happy from './../../assets/images/PLI_happy.png';
import PLI_Sad from './../../assets/images/PLI_worry.png';



function ViewRivalScore({guestId,totalProfitRate,matchResult}) {

    const ribalSadariggolClass = matchResult === 'win' ? 'winClassRival' : (matchResult === 'loss' ? 'lossClassRival' : 'defaultClassRival');
    let PLI_img = PLI_GO;

    if (matchResult === 'win') {
        PLI_img = PLI_Happy;
    }
    else if(matchResult ==="loss"){
        PLI_img = PLI_Sad;

    }
    else{
        PLI_img = PLI_GO;

    }

    return (
        <div className='ViewRivalScoreWrap'>
            <div className={`ribalSadariggol ${ribalSadariggolClass}`}>
                <img alt="SOL" src={PLI_img}></img>
                <div className='rivalScoreInfo'>
                    <ViewScoreInfo who= "RIVAL" nickname={guestId} totalProfitRate={totalProfitRate} matchResult={matchResult} ></ViewScoreInfo>
                </div>
            </div>
        </div>
    );
}

export default ViewRivalScore;
