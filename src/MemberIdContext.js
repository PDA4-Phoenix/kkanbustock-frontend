// MemberIdContext.js
import { createContext, useContext, useState, useEffect } from 'react';

const MemberIdContext = createContext();

export const useMemberId = () => {
  return useContext(MemberIdContext);
};

export const MemberIdProvider = ({ children }) => {
  const [memberId, setMemberId] = useState('dd'); // 기본값 'dd'로 설정

  useEffect(() => {
    const userJSON = localStorage.getItem('user');
    if (userJSON) {
      const userObject = JSON.parse(userJSON);
      const memberId = userObject.id;
      setMemberId(memberId);
    }
  }, []);

  return (
    <MemberIdContext.Provider value={memberId}>
      {children}
    </MemberIdContext.Provider>
  );
};
