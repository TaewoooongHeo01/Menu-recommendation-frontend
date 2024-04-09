import React, { useState } from 'react';
import './App.css';
import { Button } from './components/ui/button';
import IGDList from './components/IGDList';
import SelectedIGD from './components/selectedIGD';
import FoodList from './components/foodList';
import { IngredientsProvider, useIngredients } from './ingredientsContext';
import { FoodProvider, useFood } from './foodContext';
import { Link, Route, Routes } from 'react-router-dom';
import { buttonVariants } from './components/ui/button'; // 경로는 실제 Button 컴포넌트의 위치에 맞게 조정하세요.
import LoginPage from './LoginPage.jsx';
import SignupPage from './SignupPage.jsx';
import { AuthProvider } from './AuthContext';
import { useAuth } from './AuthContext';

// Link 컴포넌트에 Button 스타일 적용
const StyledLink = ({ to, children }) => {
  // buttonVariants를 사용하여 스타일 클래스 생성
  const buttonStyle = buttonVariants({ variant: "default", size: "default" });
  
  return (
    <Link to={to} className={buttonStyle}>
      {children}
    </Link>
  );
};

class Food {
  id;
  foodName;
  foodIngredient = [];
  constructor(id, foodName, foodIngredient) { 
      this.id = id;
      this.foodName = foodName;
      this.foodIngredient = foodIngredient;
  }
}

function LogButton() {
  const { selectedIngredients } = useIngredients();
  const [first, setFirst] = useState(true);
  const {food, setFood} = useFood();
  
  const postIGDList = async () => {

    setFirst(false);
    let selectedIngredientJson = [];

    for(let i = 0; i < selectedIngredients.length; i++) {
      selectedIngredientJson.push(selectedIngredients[i]);
    }

    const response = await fetch('http://localhost:8080/igd', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(selectedIngredientJson),
    });
    
    if (!response.ok) {
      throw new Error('Data could not be posted!');
    } else {
      const foodjson = await response.json();
      console.log(foodjson);
      setFood(foodjson); //여기서 에러
    }
  }

  if(first) {
    return <Button className="px-4 py-2 mb-3" onClick={postIGDList}>메뉴 추천</Button>;
  } 
  return <Button className="px-4 py-2 mb-3" onClick={postIGDList}>다른 메뉴 보여주세요</Button>;
}

function AuthStatus() {
  const { user, logout } = useAuth();

  return user ? (
    <div className='right-container'>
      <Button onClick={logout}>로그아웃</Button>
    </div>
  ) : (
    <div className='right-container'>
      <StyledLink to="/login">로그인</StyledLink>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <IngredientsProvider>
        <FoodProvider>
          <Routes>
            <Route path="/" element={
              <div className='container mx-auto flex flex-col items-center gap-4 p-4 min-h-screen'>
                {/* 로그인 상태 표시와 메뉴 추천 제목을 각각 다른 div로 분리하여 처리 */}
                <div className='w-full flex justify-end'>
                  <AuthStatus />
                </div>
                <div className='w-full flex flex-col items-center'>
                  <h2 className='text-2xl text-center mt-3 mb-3'>메뉴 추천 - 갖고 있는 재료를 고르세요</h2>
                  <div className='topContainer flex gap-4 mb-4'>
                    <IGDList />
                    <SelectedIGD />
                  </div>
                  <LogButton />
                  <FoodList />
                </div>
              </div>
            } />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Routes>
        </FoodProvider>
      </IngredientsProvider>
    </AuthProvider>
  );
}




