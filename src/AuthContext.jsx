import React, { createContext, useContext, useState } from 'react';

// 통합된 AuthContext 생성
const AuthContext = createContext();

// 통합된 Provider 컴포넌트
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // 로그인되지 않은 상태를 null로 초기화
    const [member, setMember] = useState({}); // 초기 회원 정보 상태

    const login = (userData) => {
        setUser(true); // 로그인 시 user 상태를 true로 설정
        setMember(userData); // 로그인한 사용자의 데이터를 member 상태에 저장
    };

    const logout = async () => {
        setUser(false); // 로그아웃 시 user 상태를 null로 설정
        const response = await fetch('/logout', {
            method: 'POST',
            // 필요한 경우 인증 헤더나 다른 설정을 추가합니다.
        });
        if (response.ok) {
            // 서버에서 로그아웃 처리가 성공적으로 이루어진 경우,
            // 클라이언트에서도 필요한 처리를 수행합니다. 예: 페이지 리다이렉션
            window.location.href = '/';
        } else {
            // 에러 처리
            console.error('Logout failed');
        }
    };

    return (
        <AuthContext.Provider value={{ user, member, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// 통합된 컨텍스트를 사용하기 위한 사용자 정의 훅
export const useAuth = () => useContext(AuthContext);
