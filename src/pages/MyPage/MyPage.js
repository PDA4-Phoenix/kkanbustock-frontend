import React, { useState } from "react";
import Header from "../../components/Header/Header";
import TitleContentLayout from "../../components/ContentLayout/TitleContentLayout";
import SOL_welcome from "./../../assets/images/SOL_welcome.png";
import My_type from "./../../assets/images/choice.png";
import My_best from "./../../assets/images/premium-quality.png";
import My_portfolio from "./../../assets/images/portfolio.png";
import My_grpBell from "./../../assets/images/bell.png";
import "./MyPage.css";
import PopupInvestType from "../../components/PopUpComponent/PopupInvestType";
import PopupPortfolio from "../../components/PopUpComponent/PopupPortfolio";
import PopupGrpAlarm from "../../components/PopUpComponent/PopupGrpAlarm";
import PopupPortRecommandStock from "../../components/PopUpComponent/PopupRecommandStock";
import axios from "axios";

//더미데이터
const componentContent = { imgSrc: SOL_welcome, inputTitle: "내 정보" };
const userInfo = { nickname: "dd", userid: "dd", userInvestType: "공격투자형" };
const stockDataList = [
  {
    profitRate: 1,
    stockName: "Unity Software",
    quantity: 22,
    purchasePrice: 2183729,
  },
  {
    profitRate: 1,
    stockName: "Unity Software",
    quantity: 22,
    purchasePrice: 2183729,
  },
  {
    profitRate: -1,
    stockName: "Unity Software",
    quantity: 22,
    purchasePrice: 2183729,
  },
  {
    profitRate: 0,
    stockName: "Unity Software",
    quantity: 22,
    purchasePrice: 2129,
  },
  {
    profitRate: 1,
    stockName: "Unity Software",
    quantity: 22,
    purchasePrice: 2183729,
  },

  // 다른 객체들도 여기에 추가 가능
];

function MyPage() {
      const handleLogout = async () => {
        try {
          // 서버에 로그아웃 요청을 보냅니다.
          const response = await axios.post('http://ec2-3-36-96-61.ap-northeast-2.compute.amazonaws.com:8080/api/v1/logout');
          
          // 서버에서 성공적으로 응답을 받았을 때의 처리
          if (response.status === 200) {
            console.log(response.data);
            // 로그아웃이 성공했으므로 클라이언트 상태를 업데이트하거나 리다이렉트 등을 수행할 수 있습니다.
          } else {
            // 서버에서 다른 응답 코드를 반환한 경우 처리
            console.log('로그아웃 실패');
            alert('로그아웃에 실패했습니다.');
          }
        } catch (error) {
          // 요청 실패 시 처리
          console.error(error);
          alert('로그아웃 요청에 실패했습니다.');
        }
    };

    //My투자 성향 팝업
    const [isInvestTypeModalOpen, setIsInvestTypeModalOpen] = useState(false);

    const openInvestTypeModal = () => setIsInvestTypeModalOpen(true);
    const closeInvestTypeModal = () => setIsInvestTypeModalOpen(false);

    //My포트폴리오 팝업
    const [isPopupComponentModalOpen, setIsPopupComponentModalOpen] = useState(false);

    const openPopupComponentModal = () => setIsPopupComponentModalOpen(true);
    const closePopupComponentModal = () => setIsPopupComponentModalOpen(false);

    //My추천 종목 팝업
    const [isPopupRecommandStockOpen, setIsPopupRecommandStockOpen] = useState(false);

    const openPopupRecommandStock = () => setIsPopupRecommandStockOpen(true);
    const closePopupRecommandStock = () => setIsPopupRecommandStockOpen(false);


    //My그룹알림 팝업
    const [isPopupGrpAlarmOpen, setIsPopupGrpAlarmOpen] = useState(false);

    const openPopupGrpAlarm = () => setIsPopupGrpAlarmOpen(true);
    const closePopupGrpAlarm = () => setIsPopupGrpAlarmOpen(false);
  
  return (
    <div>
      <Header name="내정보" />
      <div className="infoWrap">
        <PopupInvestType
          isOpen={isInvestTypeModalOpen}
          closeModal={closeInvestTypeModal}
          userInfo={userInfo}
        />
        <PopupPortfolio
          isOpen={isPopupComponentModalOpen}
          closeModal={closePopupComponentModal}
          stockDataList={stockDataList}
        />
        <PopupPortRecommandStock
          isOpen={isPopupRecommandStockOpen}
          closeModal={closePopupRecommandStock}
          stockDataList={stockDataList}
        />
        <PopupGrpAlarm
          isOpen={isPopupGrpAlarmOpen}
          closeModal={closePopupGrpAlarm}
          stockDataList={stockDataList}
        />

        <div className="hr"></div>
        <TitleContentLayout {...componentContent}>
          <div className="infoComponentWrap">
            <div className="infoTextContent">
              <div className="textInfo nicknameInfo">
                <span className="infoTitle">닉네임</span>
                {userInfo.nickname}
              </div>
              <div className="textInfo idInfo">
                <span className="infoTitle">아이디</span>
                {userInfo.userid}
              </div>
            </div>
            <div className="infoBtnContent">
              <button
                className="btnInfo myInvestType"
                onClick={openInvestTypeModal}
              >
                <img className="infoBtnImg" alt="my투자성향" src={My_type} />
                My 투자 성향
              </button>
              <button
                className="btnInfo myPortfolio"
                onClick={openPopupComponentModal}
              >
                <img
                  className="infoBtnImg"
                  alt="my포트폴리오"
                  src={My_portfolio}
                />
                My 포트폴리오
              </button>
              <button
                className="btnInfo myBestInvest"
                onClick={openPopupRecommandStock}
              >
                <img className="infoBtnImg" alt="my추천종목" src={My_best} />
                My 추천 종목
              </button>
              <button
                className="btnInfo myGrpNotice"
                onClick={openPopupGrpAlarm}
              >
                <img
                  className="infoBtnImg"
                  alt="my그룹 알림"
                  src={My_grpBell}
                />
                My 그룹 알림
              </button>
            </div>
            <div className="logoutContent">
              <button onClick={handleLogout} className="logoutBtn">
                로그아웃하기
              </button>
            </div>
          </div>
        </TitleContentLayout>
        <div className="hr"></div>
      </div>
    </div>
  );
}

export default MyPage;
