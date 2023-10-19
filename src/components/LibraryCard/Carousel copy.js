import React, { useState, useEffect } from "react";
import "./Carousel copy.css";
import LibraryCardItem from "./LibraryCardItem";
import axios from 'axios';

function Carousel() {
  const [currCarousel, setCurrCarousel] = useState(1);
  const [carouselTransition, setCarouselTransition] = useState(
    "transform 500ms ease-in-out"
  );
  const [dictionaryContents, setDictionaryContents] = useState([]); // API에서 가져온 데이터를 저장하는 상태

  const makeNewDataArray = (arr) => {
    const dataStart = arr[0];
    const dataEnd = arr[arr.length - 1];
    const modifiedArray = [dataEnd, ...arr, dataStart];
    return modifiedArray;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("service.team-4.svc.cluster.local:8080/api/v1/dictionary"); // API 엔드포인트를 변경해야 할 수도..
        setDictionaryContents(response.data);
        console.log("데이터 불러오기 성공");
        console.log(response.data);
      } catch (error) {
        console.error("데이터 불러오기 실패", error);
        // 실패 시에 대체 데이터 설정 가능!!!
        setDictionaryContents([
          {
            id: 1,
            word: "데이터 불러오기 실패:(",
            explanation: "데이터를 불러오지 못했습니다....:(",
          },
        ]);
      }
    };

    fetchData();
  }, []); // 빈 배열을 두어 컴포넌트가 처음 렌더링될 때만 데이터를 가져오도록 설정

  const moveToNthSlide = (n) => {
    setTimeout(() => {
      setCarouselTransition("");
      setCurrCarousel(n);
    }, 500);
  };

  const slideNextSoulsCarousel = () => {
    const soulSliderLength = dictionaryContents.length;
    const newCurr = currCarousel + 1;
    setCurrCarousel(newCurr);

    if (newCurr === soulSliderLength - 3) {
      moveToNthSlide(1);
    }

    setCarouselTransition("transform 500ms ease-in-out");
  };

  const slidePrevSoulsCarousel = () => {
    const soulSliderLength = dictionaryContents.length;
    const newCurr = currCarousel - 1;
    setCurrCarousel(newCurr);

    if (newCurr === 0) {
      moveToNthSlide(soulSliderLength);
    }

    setCarouselTransition("transform 500ms ease-in-out");
  };

  return (
    <div id="carousel" className="noselect">
      <div className="carousel-container">
        <div
          className="arrow arrow-left"
          onClick={() => slidePrevSoulsCarousel()}
        >
          <i className="fi-arrow-left"></i>
        </div>
        <div className="carousel-items">
          {dictionaryContents.length > 0 &&
            dictionaryContents.map((dictionaryContent) => (
              <div
                className="carousel-wrapper"
                key={dictionaryContent.id}
                style={{
                  transform: `translateX(-${currCarousel * 310}px)`,
                  transition: `${carouselTransition}`,
                }}
              >
                <LibraryCardItem
                  title={dictionaryContent.word}
                  description={dictionaryContent.explanation}
                />
              </div>
            ))}
        </div>
        <div
          className="arrow arrow-right"
          onClick={() => slideNextSoulsCarousel()}
        >
          <i className="fi-arrow-right"></i>
        </div>
      </div>
    </div>
  );
}

export default Carousel;
