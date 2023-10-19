import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import "./LoginPage.css";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // useNavigate 를 import 해줘야 합니다.

function Login() {
  const navigate = useNavigate(); // navigate 변수를 선언해줘야 합니다.

  const getAxios = () => {
    return axios.create({
      baseURL: "http://service.team-4.svc.cluster.local:8080",
      headers: {
        accept: "application/json",
        "X-Requested-With": "XMLHttpRequest",
        //authorization: `Bearer ${token}`,
      },
    });
  };

  const [loginData, setLoginData] = useState({});

  const handleInput = (e) => {
    setLoginData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  console.log(loginData);

  const onClickGuest = async () => {
    navigate("/"); // '/' 경로로 이동 (MainPage로 이동)
  };

  const onClickSign = async () => {
    navigate("/Signup");
  };

  const onClickLogin = async () => {
    try {
      const { id, password } = loginData;
      console.log("@@@@@@@@@" + id + password);
      const response = await getAxios().post("/api/v1/login", {
        id: id,
        password: password,
      });

      console.log("로그인 성공:", response.data);
    } catch (error) {
      console.error("로그인 오류:", error.response.data);
    }
  };

  useEffect(() => {
    // 페이지 호출 후 처음 한 번만 호출될 수 있도록 [] 추가
  }, []);

  return (
    <div>
      <Header name="LOGIN" />
      <div>
        <div>
          <input
            className="input_group"
            placeholder="ID"
            type="text"
            name="id"
            value={loginData.id}
            onChange={handleInput}
          />
        </div>
        <div>
          <input
            className="input_group"
            placeholder="비밀번호"
            type="password"
            name="password"
            value={loginData.password}
            onChange={handleInput}
          />
        </div>
      </div>
      <div id="button_group">
        <div>
          <button className="button" type="button" onClick={onClickLogin}>
            로그인
          </button>
        </div>
        <div>
          <button className="button" type="button" onClick={onClickSign}>
            회원가입 {/* 이 부분에서 onClickSign 함수를 호출해야 합니다. */}
          </button>
        </div>
        <div>
          <label id="explanation">로그인없이 들어갈 수 있어요</label>
          <label id="guestLogin" onClick={onClickGuest}>
            구경하기{">"}
          </label>
        </div>
      </div>
    </div>
  );
}

export default Login;
