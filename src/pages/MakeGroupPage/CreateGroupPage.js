import React from 'react';
import "./CreateGroupPage.css";
import TitleContentLayout from '../../components/ContentLayout/TitleContentLayout';
import GroupInput from '../../components/ContentLayout/GroupInput';
import LL_together from '../../assets/images/LL_together.png'

const componentContent ={imgSrc:LL_together, inputTitle:"그룹 생성하기", inputDescript:"게스트 아이디를 적어주세요",buttonDescricpt:"그룹 생성하기"};

function CreateGroupPage() {
    return (
        <div className='CreateGroupPage-container'>
            <div>
            <TitleContentLayout {...componentContent}>
                <GroupInput {...componentContent}></GroupInput>
            </TitleContentLayout>
            </div>


        </div>
    );
}

export default CreateGroupPage;

