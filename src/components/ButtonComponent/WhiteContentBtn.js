import React from 'react';
import "./WhiteContentBtn.css";
import BlueSmallBtn from './BlueSmallBtn';

function WhiteContentBtn({ width, height, children }) {
    return (
        <div className='WhiteContentBtnWrap'  style={{ width, height }}>
            <button className='whiteContentBtn' style={{ width, height }}>
                {children}
            </button>
        </div>

    );
}

export default WhiteContentBtn;
