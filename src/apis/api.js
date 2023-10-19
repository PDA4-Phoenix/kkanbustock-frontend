import {axiosF} from "../apis";

export const fetchDictionaryData = async () => {
  try {
    const response = await axiosF.get("/api/v1/dictionary");
    return response.data;
  } catch (error) {
    console.error("데이터 불러오기 실패", error);
    return [
      {
        id: 1,
        word: "데이터 불러오기 실패:(",
        explanation: "데이터를 불러오지 못했습니다....:(",
      },
    ];
  }
};

export const fetchTopNGroups = async () => {
  try {
    const response = await axiosF.get("/api/v1/groups/top-n-groups", {
      params: {
        n: 3,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Top N 그룹 데이터 불러오기 실패", error);
    return [];
  }
};

export const fetchTopNMyGroups = async (memberId) => {
  try {
    const response = await axiosF.get("/api/v1/groups/my-groups-profit-rate", {
      params: {
        n: 5,
        memberId: memberId,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Top N 마이 그룹 데이터 불러오기 실패", error);
    return [];
  }
};
