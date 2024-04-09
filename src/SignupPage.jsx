import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [passwd, setPasswd] = useState('');
    const [username, setUsername] = useState('');
    const [emailChecked, setEmailChecked] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault(); // 기본 제출 동작 방지

        if (!emailChecked) {
            alert('이메일 중복 체크를 해주세요.');
            return;
        }

        try {
            // 서버에 POST 요청 보내기
            const response = await fetch('http://localhost:8080/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    "email": email,
                    "passwd": passwd,
                    "username": username
                 }), // 이메일과 비밀번호를 JSON 형식으로 전송
                 credentials: 'include',
            });

            if (response.ok) {
                alert("가입이 완료되었습니다.");
                window.location.href = '/login'; 
            } else {
                // 가입 실패시 에러 처리
                console.error('가입 중 오류가 발생했습니다.');
            }
        } catch (error) {
            console.error('가입 중 오류가 발생했습니다.', error);
        }
    };

    const checkEmail = async () => {
        try {
            const response = await fetch('http://localhost:8080/emailCheck', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "email": email,
                }),
                credentials: 'include',
            });

            if (response.ok) { // isAvailable을 서버에서 true/false로 응답한다고 가정
                alert('사용 가능한 이메일입니다.');
                setEmailChecked(true);
            } else {
                alert('이미 사용 중인 이메일입니다.');
                setEmailChecked(false);
            }
        } catch (error) {
            console.error('이메일 중복 체크 중 오류가 발생했습니다.', error);
        }
    };

    return (
        <div className='container mx-auto flex flex-col items-center justify-center h-screen'>
            <form onSubmit={handleSubmit} className='w-full max-w-md p-10 border border-gray-300 rounded-md'>
                <h2 className='text-2xl font-semibold mb-4'>회원가입</h2>
                <div className='mb-4'>
                    <label htmlFor='username' className='block text-sm font-bold mb-2'>
                        이름
                    </label>
                    <input
                        type='username'
                        id='username'
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
                    />
                </div>
                <div className='mb-6'>
                    <div className='flex justify-between content-center'>
                        <label htmlFor='email' className='content-center block text-sm font-bold mb-2'>
                            이메일
                        </label>
                        <button type="button" onClick={checkEmail} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1.5 px-1.5 mb-1 rounded focus:outline-none focus:shadow-outline'>
                            이메일 중복 체크
                        </button>
                    </div>
                    <input
                        type='email'
                        id='email'
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    />
                </div>
                <div className='mb-6'>
                    <label htmlFor='password' className='block text-sm font-bold mb-2'>
                        비밀번호
                    </label>
                    <input
                        type='password'
                        id='password'
                        required
                        value={passwd}
                        onChange={(e) => setPasswd(e.target.value)}
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
                    />
                </div>
                <div className='flex items-center justify-between'>
                    <button type='submit' className='bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>
                        가입하기
                    </button>
                    <Link to='/login' className='inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800'>
                        돌아가기
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default Signup;
