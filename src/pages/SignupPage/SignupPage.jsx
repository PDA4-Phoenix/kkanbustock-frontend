// SignUpPage.js
import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import styles from './SignUpPage.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useMemberId } from '../MemberIdContext';

function SignUpPage() {
    const navigate = useNavigate();
    const [id, setAccount] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [customEmail, setCustomEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMatch, setPasswordMatch] = useState(true);

    const memberId = useMemberId(); // 사용자 ID 가져오기

    const handleSignUp = async () => {
        axios.post('http://service.team-4.svc.cluster.local:8080/api/v1/register', {
            id: id,
            name: name,
            email: email,
            password: password
        }).then(res => {
            console.log(res.data);

            // 회원가입 성공 후 memberId를 업데이트
            // 단, 회원가입할 때 memberId를 localStorage에도 저장하려면 아래 코드 필요
            // localStorage.setItem('user', JSON.stringify({ id }));

            navigate('/');
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
