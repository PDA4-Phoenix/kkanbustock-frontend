import React from 'react';
import "./ViewGroupCodePage.css";
import TitleContentLayout from '../../components/ContentLayout/TitleContentLayout';
import GroupInput from '../../components/ContentLayout/GroupInput';
import LL_together from '../../assets/images/LL_together.png'
import BlueSmallBtn from '../../components/ButtonComponent/BlueSmallBtn';

const componentContent ={imgSrc:LL_together, title:"그룹 생성 완료",inputTitle:"그룹 생성하기", inputDescript:"그룹 이름을 지어주세요",buttonDescricpt:"그룹 생성하기"};
let userName="게스트";
const groupCode="12345"

function CompleteGroupPage() {
    return (
        <div className='CreateGroupPage-container'>
            <img src={LL_together}></img>
            <div className='CompleteText'>
                <div className="CreateGroupComplete">그룹 생성 완료</div>
                <div className="CreateGroupComplete">깐부에게 그룹 생성 요청을 보냈습니다.</div>
            </div>
            <BlueSmallBtn title="홈으로" link='/'></BlueSmallBtn>

        </div>
    );
}

export default CompleteGroupPage;

