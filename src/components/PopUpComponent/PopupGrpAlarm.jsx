import React, { useState, useEffect } from 'react';
import './PopupPortGrpAlarm.css';
import PopupComponent from './PopupComponent';
import GrpAcceptItem from '../GrpAccept/GrpAcceptItem';
import { axiosF } from "../../apis";

function PopupPortGrpAlarm({ userInfo, stockDataList, isOpen, closeModal }) {
  const [groupProposals, setGroupProposals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // memberId를 전역 변수로 가져와서 사용
  const memberId = window.memberId; // 전역 memberId 변수

  useEffect(() => {
    if (isOpen) {
      // 그룹 제안을 가져오는 요청
      axiosF.get(`/api/v1/groups/proposal?guestId=${memberId}&approvalStatus=false`)
        .then((response) => {
          setGroupProposals(response.data);
          setIsLoading(false); // 데이터 가져오기 완료 시 isLoading을 false로 설정
        })
        .catch((error) => {
          console.error('Error fetching group proposals:', error);
          setIsLoading(false); // 에러 발생 시도 isLoading을 false로 설정
        });
    }
  }, [isOpen, memberId]);

  return (
    <PopupComponent isOpen={isOpen} closeModal={closeModal}>
      <div className="PopupPortGrpAlarmWrap">
        <div className="PopupPortRecommandStock-Title">My 그룹 알림</div>
        <div className="PopupPortGrpAlarm-upContent">
          {isLoading ? ( // 데이터를 아직 가져오고 있는 중이면 로딩 메시지를 표시
            <div>Loading...</div>
          ) : groupProposals.length === 0 ? ( // 데이터가 없으면 해당 메시지를 표시
            <div>요청 온 그룹 알림이 없습니다</div>
          ) : (
            groupProposals.map((proposal, index) => (
              <GrpAcceptItem key={index} hostName={proposal.hostName} hostId={proposal.hostId} />
            ))
          )}
        </div>
      </div>
    </PopupComponent>
  );
}

export default PopupPortGrpAlarm;
