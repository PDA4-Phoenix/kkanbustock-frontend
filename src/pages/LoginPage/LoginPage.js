import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // useNavigate로 수정
import Header from '../../components/Header/Header';
import './LoginPage.css';
import axios from 'axios'; 

function Login() {
    const navigate = useNavigate(); // useNavigate를 사용

    const getAxios = (token) => {
        const config = {
          baseURL: 'http://localhost:8080',
          headers: {
            'accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
          }
        };
      
        // 토큰이 존재할 경우에만 요청 헤더에 추가
        if (token) {
            console.log("토큰있다")
            config.headers['authorization'] = `Bearer ${token}`;
        }
      
        return axios.create(config);
    }

    const [loginData, setLoginData] = useState({});
    const [token, setToken] = useState('');
    const [id, setId] = useState('');

    const handleInput = (e) => {
    setLoginData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

    const onClickLogin = async () => {
        
        try {

            const { id, password } = loginData;

            console.log("@@@@@@@@@" + id + password)

            const response = await getAxios().post('/api/v1/login', {
                id,
                password,
            })

            // 서버로부터의 응답 처리
            console.log('로그인 성공:', response.data);
            const token = response.data.jwt;

            console.log(token)
            setToken(token);
            setId(response.data.member.id);

            console.log(token);
            console.log(id);

            navigate('/'); // '/' 경로로 이동 (MainPage로 이동)
        } catch (error) {

            console.error('로그인 오류:', error.response.data);

        }
    };

    return (
        <div>
            <Header name='LOGIN' />
            <div>
                <div>
                    <input className='input_group' placeholder='ID' type='text' name='id' value={loginData.id} onChange={handleInput} />
                </div>
                <div>
                    <input className='input_group' placeholder='비밀번호' type='password' name='password' value={loginData.password} onChange={handleInput} />
                </div>
            </div>
            <div id='button_group'>
                <div>
                    <button className='button' type='button' onClick={onClickLogin}>로그인</button>
                </div>
                <div>
                    <button className='button' type='button' onClick={onClickLogin}>회원가입</button>
                </div>
                <div>
                    <label id="explanation">로그인없이 들어갈 수 있어요</label>
                    <Link to="/"><label id="guestLogin">구경하기{'>'}</label></Link>
                </div>
            </div>
        </div>
    )
}

export default Login;
