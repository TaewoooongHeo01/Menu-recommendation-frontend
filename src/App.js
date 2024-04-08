import React, { useState } from 'react';
import './App.css';
import { Button } from './components/ui/button';
import IGDList from './components/IGDList';
import SelectedIGD from './components/selectedIGD';
import FoodList from './components/foodList';
import { IngredientsProvider, useIngredients } from './ingredientsContext';
import { FoodProvider, useFood } from './foodContext';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuItem } from './components/ui/dropdown-menu';
import { Link, Route, Routes } from 'react-router-dom';
import { buttonVariants } from './components/ui/button'; // 경로는 실제 Button 컴포넌트의 위치에 맞게 조정하세요.
import LoginPage from './LoginPage.jsx';
import SignupPage from './SignupPage.jsx';

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
    return <Button className="px-4 py-2" onClick={postIGDList}>메뉴 추천</Button>;
  } 
  return <Button className="px-4 py-2" onClick={postIGDList}>다른 메뉴 보여주세요</Button>;
}

function LoginButton() {
  // 로그인 상태를 관리하는 State
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 로그인 상태를 토글하는 함수
  const toggleLogin = () => setIsLoggedIn(!isLoggedIn);

  // 로그인 되지 않았을 때 보여줄 버튼
  if (!isLoggedIn) {
    return <Button className="login-button" onClick={toggleLogin}>로그인</Button>;
  }

  // 로그인 되었을 때 보여줄 드롭다운 메뉴
  return (
      <div>로그인 됨</div>
    // <DropdownMenu>
    //   <DropdownMenuTrigger asChild>
    //     <Button className="login-button">내 계정</Button>
    //   </DropdownMenuTrigger>
    //   <DropdownMenu.Content>
    //     <DropdownMenuItem onSelect={() => alert('로그아웃')}>로그아웃</DropdownMenuItem>
    //   </DropdownMenu.Content>
    // </DropdownMenu>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={
        <div className='container mx-auto flex flex-col items-center justify-center gap-4 p-4 h-screen'>
        {/* 기존 컨테이너 */}
        <div className='flex justify-between items-center w-full'>
          {/* 오른쪽 상단에 로그인 버튼 위치 */}
          <div className='right-container'>
            <StyledLink to="/login">로그인</StyledLink>
          </div>
        </div>
        <h2 className='text-2xl mt-3'>메뉴 추천 - 갖고 있는 재료를 고르세요</h2>
        <IngredientsProvider>
          <FoodProvider>
          <div className='topContainer flex gap-4 mb-4 mt-3' style={{ height: '40%' }}>
              <div className='topContainer flex gap-4 mb-4 mt-3'>
                  <IGDList />
                  <SelectedIGD />
              </div>
          </div>
          <LogButton /> 
          <FoodList/>
          </FoodProvider>
        </IngredientsProvider>
      </div>
      }></Route>
        <Route path="/login" element={<LoginPage/>}></Route>
        <Route path="/signup" element={<SignupPage/>}></Route>
      </Routes>
  );
}

