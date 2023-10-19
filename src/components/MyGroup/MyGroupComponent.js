import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./MyGroupComponent.css";
import MyGroupItem from './MyGroupItem.js';
import BlueSmallBtn from '../ButtonComponent/BlueSmallBtn';
import BlueLargeBtn from '../ButtonComponent/BlueLargeBtn';

function MyGroupComponent({ memberId, onGroupItemClick }) {
  const [groupData, setGroupData] = useState([]);

  useEffect(() => {
    // API 호출
    axios.get(`/api/v1/groups/${memberId}`)
      .then(response => {
        setGroupData(response.data); // API 응답 데이터를 state에 설정
      })
      .catch(error => {
        console.error('API 호출 중 오류 발생:', error);
      });
  }, []); // 빈 배열을 전달하여 컴포넌트가 처음 렌더링될 때만 호출

  const handleGroupItemClick = (groupName) => {
    // 선택한 그룹 정보를 찾아내기
    const selectedGroup = groupData.find(group => group.name === groupName);
    if (selectedGroup) {
      // 그룹 정보를 RivalPage로 전달
      onGroupItemClick(selectedGroup);
    }
  };

  return (
    <div className='myGroupComponentWrap'>
      <div className='myGrpComponentTitle'>내 그룹</div>
      <div className="myGroupListSection">
        {groupData.map((group, index) => (
          <MyGroupItem key={index} groupName={group.name} onClick={handleGroupItemClick} />
        ))}
      </div>
      <BlueLargeBtn title="그룹 생성하기" link={"/CreateGroup"}></BlueLargeBtn>
    </div>
  );
}

export default MyGroupComponent;
