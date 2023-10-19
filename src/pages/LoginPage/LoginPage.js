import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import './LoginPage.css';
import axios from 'axios';
import {axiosF} from "../../apis";

function Login() {

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
      
        return axiosF.create(config);
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

    console.log(loginData)

    const onClickLogin = async () => {
        try {
            const { id, password } = loginData;

            console.log("@@@@@@@@@" +id+password)
            
            const token = "";
          const response = await getAxios(token).post('/api/v1/login', {
            id,
            password,
          })
      
          // 서버로부터의 응답 처리
          console.log('로그인 성공:', response.data);

          setToken(response.data.jwt);
          setId(response.data.member.id);

          localStorage.setItem('user',JSON.stringify({
            id: id,
            token: token,
          })) 
          
          console.log(token);
          console.log(id);
      
          // 로그인이 성공했을 때 원하는 작업을 수행할 수 있습니다.
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
                    {/* <Link to="/"><label id="guestLogin">구경하기{'>'}</label></Link> */}
                </div>
            </div>
        </div>
    )
//   return (
//     <div>
//       <Header name="LOGIN" />
//       <div>
//         <div>
//           <input
//             className="input_group"
//             placeholder="ID"
//             type="text"
//             name="id"
//             value={loginData.id}
//             onChange={handleInput}
//           />
//         </div>
//         <div>
//           <input
//             className="input_group"
//             placeholder="비밀번호"
//             type="password"
//             name="password"
//             value={loginData.password}
//             onChange={handleInput}
//           />
//         </div>
//       </div>
//       <div id="button_group">
//         <div>
//           <button className="button" type="button" onClick={onClickLogin}>
//             로그인
//           </button>
//         </div>
//         <div>
//           <button className="button" type="button" onClick={onClickLogin}>
//             회원가입
//           </button>
//         </div>
//         <div>
//           <label id="explanation">로그인없이 들어갈 수 있어요</label>
//           <label id="guestLogin">구경하기{">"}</label>
//         </div>
//       </div>
//     </div>
//   );
}

export default Login;