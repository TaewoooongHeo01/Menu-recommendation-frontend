import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [passwd, setPasswd] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault(); // 기본 제출 동작 방지

        try {
            // 서버에 POST 요청 보내기
            const response = await fetch('http://localhost:8080/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    "email": email,
                    "passwd": passwd,
                }), 
                credentials: 'include',
            });
            
            if (response.ok) {
                const member = await response.json();
                console.log(member);
                window.location.href='/';
            } else {
                alert('이메일 또는 비밀번호를 확인하세요.');
            }
        } catch (error) {
            console.error('로그인 중 오류가 발생했습니다.', error);
        }
    };

    return (
        <div className='container mx-auto flex flex-col items-center justify-center h-screen'>
            <form onSubmit={handleSubmit} className='w-full max-w-md p-10 border border-gray-300 rounded-md'>
                <h2 className='text-2xl font-semibold mb-4'>로그인</h2>
                <div className='mb-4'>
                    <label htmlFor='email' className='block text-sm font-bold mb-2'>
                        이메일
                    </label>
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
                    <button
                        type='submit'
                        className='bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                    >
                        로그인
                    </button>
                    <Link to='/signup' className='inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800'>
                        회원가입
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default LoginPage;
