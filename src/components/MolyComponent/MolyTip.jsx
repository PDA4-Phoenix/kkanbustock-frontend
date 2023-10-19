import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './MolyTip.css';
import Moly_teach from './../../assets/images/Moly_teach.png';

function MolyTip({description,link,btnText="보러가기"}) {

    description="쏼라 쏼라~ 화이팅!";
    link ="";

  return (
                <div className='MolyTipWrap'>
                    <div className="MolyTip-upContent">
                        <img alt="Moly" src={Moly_teach}></img>
                        <div className="molyTipText">
                            <div className ="molyTipTitle">
                                몰리의 꿀팁
                            </div>
                            <div className="molyDescription">
                                {description}
                            </div>

                        </div>
                        <Link to={link}>
                                <button>{btnText}</button>                            
                            </Link>
                    </div>

                </div>


  );
}
export default MolyTip;