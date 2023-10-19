import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import styles from './SignUpPage.module.css';
import {axiosF} from "../../apis";
import { useNavigate, Link } from 'react-router-dom'; 


function SignUpPage() {
    const navigate = useNavigate(); // useNavigate를 사용
    const [id, setAccount] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [customEmail, setCustomEmail] = useState(''); // Custom email input
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMatch, setPasswordMatch] = useState(true);


    const handleSignUp = async () => {

        axiosF.post('/api/v1/register', {
            id: id,
            name: name,
            email: email,
            password: password
        }).then(res => {
            console.log(res.data);
            navigate('/'); // '/' 경로로 이동 (MainPage로 이동)
        }).catch((e)=> {
            console.log(e);
        })
    };
    
    const handleInputAccount = (e) => {
        setAccount(e.target.value);
    }

    const handleInputName = (e) => {
        setName(e.target.value);
    }

    const handleInputEmail = (e) => {
        setEmail(e.target.value);
    }

    const handleCustomEmailChange = (e) => {
        setCustomEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        setPasswordMatch(newPassword === confirmPassword);
    };

    const handleConfirmPasswordChange = (e) => {
        const newPassword = e.target.value;
        setConfirmPassword(newPassword);
        setPasswordMatch(password === newPassword);
    };

    return (
        <div className={styles.signUpPage}>
            <div className={styles.formContainer}>
                <Header name="SIGN UP" />
               <div className={styles.formGroup}>
                    <input
                        type="text"
                        placeholder="사용자 ID"
                        value={id}
                        onChange={handleInputAccount}
                    />
                </div>
                <div className={styles.formGroup}>
                    <input
                        type="text"
                        placeholder="닉네임"
                        value={name}
                        onChange={handleInputName}
                    />
                </div>
                <div className={styles.formGroup}>
                    <input
                        type="text"
                        placeholder="이메일"
                        value={email}
                        onChange={handleInputEmail}
                    />
                    {email === 'custom' && (
                        <input
                            type="text"
                            placeholder="직접 입력"
                            value={customEmail}
                            onChange={handleCustomEmailChange}
                        />
                    )}
                </div>
                <div className={styles.formGroup}>
                    <input
                        type="password"
                        placeholder="비밀번호"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </div>
                <div className={styles.formGroup}>
                    <input
                        type="password"
                        placeholder="비밀번호 확인"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                    />
                    {!passwordMatch && <p className={styles.error}>비밀번호가 일치하지 않습니다.</p>}
                </div>
                <button onClick={handleSignUp}>회원가입</button>
            </div>
        </div>
    );
}

export default SignUpPage;