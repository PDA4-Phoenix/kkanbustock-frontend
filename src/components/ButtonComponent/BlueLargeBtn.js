import React from 'react';
import "./BlueLargeBtn.css";

function BlueLargeBtn({ title = "클릭하기", onClick, link }) {
    return (
        <a href={link} className='BlueLargeBtnWrap'>
            <button onClick={onClick} className='blueLargeBtn'>
                {title}
            </button>
        </a>
    );
}

export default BlueLargeBtn;
