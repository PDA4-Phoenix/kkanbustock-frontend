//BlueSmallBtn.js

import React from 'react';
import "./BlueSmallBtn.css";
import { Link } from 'react-router-dom'; 



function BlueSmallBtn({ title, link, onClick}) {
    return (
        <Link to={link} className="link-style">
            <div className='BlueSmallBtnWrap'>
                <button onClick={onClick} className='blueSmallBtn'>
                    {title}
                </button>
            </div>
        </Link>

    );
}

export default BlueSmallBtn;

