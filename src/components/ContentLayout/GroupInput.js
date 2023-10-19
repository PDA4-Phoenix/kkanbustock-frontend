import React, { useState } from 'react';
import "./GroupInput.css";
import { axiosF } from "../../apis";
import { useNavigate } from 'react-router-dom';

function GroupInput({ imgSrc, inputTitle, inputDescript, buttonDescricpt }) {
    const [text, setText] = useState("");
    const navigate = useNavigate();

    const handleOnChange = (e) => {
        setText(e.target.value);
    }

    const handleCreateGroup = () => {
        const hostId = 'your_host_id';

        axiosF.post('/api/v1/groups', {
            hostId: hostId,
            guestId: text,
        })
            .then(response => {
                console.log('그룹 생성 성공:', response);
                navigate('/CompleteGroup');
            })
            .catch(error => {
                // 에러가 발생하면 알림 창을 띄웁니다.
                alert('그룹 생성 실패: ' + error.message); // 에러 메시지를 alert 창에 표시
                console.error('그룹 생성 실패:', error);
            });
    }

    return (
        <div className='componentWrap'>
            <div className="inputsection">
                <h1>{inputTitle}</h1>
                <div className="inputContent">
                    <input placeholder={inputDescript} value={text} onChange={handleOnChange}></input>
                    <button onClick={handleCreateGroup}>{buttonDescricpt}</button>
                </div>
            </div>
        </div>
    );
}

export default GroupInput;
