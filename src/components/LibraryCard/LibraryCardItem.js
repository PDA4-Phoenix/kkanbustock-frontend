import React from 'react';
import './LibraryCardItem.css';
import SOL_Question from './../../assets/images/SOL_Question.png'

function LibraryCardItem({ title = "주식이란?", description = "어려운거다~~" }) {




  return (
    <div className="library-card">
        <div className="cardCaptionWrap">
            <div className="library-card-caption">
                <span class="library-card-tag library-card-main-tag">주식 백과사전</span>
                <span class="library-card-tag library-card-sub-tag">
                Dictornary <span id="tag">Stock</span>
                </span>
            </div>
            <img alt="SOL_question" src={SOL_Question} className="library-card-SOL"></img>

        </div>
        <div className='cardContentWrap'>
            <div className="library-card-content">
                <div className="library-card-title">{title}</div>
                <div className={`library-card-description ${description.length >= 100 ? 'shrink-text' : ''}`}>
                    {description}
                </div>
            </div>
            <div className="library-card-down-content">
                <div class="library-card-read-more">
                    <span class="library-link__text">더 알아보기</span>
                </div>
            </div>
        </div>
    </div>
  );
}

export default LibraryCardItem;
