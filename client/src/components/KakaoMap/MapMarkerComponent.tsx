import { useState } from "react";
import { MapMarker } from "react-kakao-maps-sdk";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { searchResultsState } from "../../store/searchAtoms";

const InfoWindowContainer = styled.div`
  min-width: 150px;
`;

const InfoValue = styled.div`
  padding: 5px;
`;

const MapMarkerComponent = () => {
  const searchResults = useRecoilValue(searchResultsState);

  const [isOpen, setIsOpen] = useState({
    id: -1,
    open: false,
  });

  // return (
  // <MapMarker // 마커를 생성합니다
  //   position={{
  //     // 마커가 표시될 위치
  //     lat: 37.50039427271689,
  //     lng: 127.02796438287635,
  //   }}
  //   clickable={true} // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정
  //   image={{
  //     src: "https://cdn-icons-png.flaticon.com/512/7988/7988273.png", // 마커이미지의 주소입니다
  //     size: {
  //       width: 30,
  //       height: 30,
  //     }, // 마커이미지의 크기입니다
  //   }}
  //   onClick={() => setIsOpen(true)}
  // >
  //   {isOpen && (
  //     <InfoWindowContainer onClick={() => setIsOpen(false)}>
  //       {/* <img
  //           alt="close"
  //           width="14"
  //           height="13"
  //           src="https://t1.daumcdn.net/localimg/localimages/07/mapjsapi/2x/bt_close.gif"
  //           style={{
  //             position: "absolute",
  //             right: "5px",
  //             top: "5px",
  //             cursor: "pointer",
  //           }}
  //         /> */}
  //       <InfoValue>땀땀</InfoValue>
  //     </InfoWindowContainer>
  //   )}
  // </MapMarker>
  {
    /* 검색 데이터 오면 쓸 map 함수 */
  }
  // <>
  // {searchResults.map((result) => (
  //   <MapMarker
  //     key={result.id}
  //     position={{ lat: result.latitude, lng: result.longitude }}
  //     clickable={true}
  //     image={{
  //       src: "https://cdn-icons-png.flaticon.com/512/7988/7988273.png",
  //       size: { width: 30, height: 30 },
  //     }}
  //     onClick={() => setIsOpen(true)}
  //   >
  //     {isOpen && (
  //       <InfoWindowContainer onClick={() => setIsOpen(false)}>
  //         <InfoValue>{result.placeName}</InfoValue>
  //       </InfoWindowContainer>
  //     )}
  //   </MapMarker>
  // ))}
  // </>
  // );
  const markerImg = [
    "https://user-images.githubusercontent.com/94962427/214733548-640ad950-b4ce-42cd-ad04-7b37eb4eaf8f.svg",
    "https://user-images.githubusercontent.com/94962427/214733213-a2c51280-6525-49ed-b60c-5e7e248890f8.svg",
    "https://user-images.githubusercontent.com/94962427/214733289-7588880b-0492-429f-9e7e-8dbc883a88a3.svg",
    "https://user-images.githubusercontent.com/94962427/214733318-efc109a4-439d-4b3a-b17e-ab478ff16102.svg",
  ];

  return (
    <>
      {searchResults.map((result) => (
        <MapMarker
          key={result.id}
          position={{ lat: result.latitude, lng: result.longitude }}
          clickable={true}
          image={{
            src: markerImg[result.postCount],
            size: { width: 25, height: 25 },
          }}
          onClick={() => setIsOpen({ id: result.id, open: true })}
        >
          {isOpen.open && isOpen.id === result.id && (
            <InfoWindowContainer onClick={() => setIsOpen({ id: -1, open: false })}>
              <InfoValue>{result.name}</InfoValue>
            </InfoWindowContainer>
          )}
        </MapMarker>
      ))}
    </>
  );
};

export default MapMarkerComponent;
