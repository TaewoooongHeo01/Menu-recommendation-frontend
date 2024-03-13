import React from 'react';
import './App.css';
import { Button } from './components/ui/button';
import IGDList from './components/IGDList';
import SelectedIGD from './components/selectedIGD';
import FoodList from './components/foodList';
import { IngredientsProvider, useIngredients } from './ingredientsContext';

function LogButton() {
  const { selectedIngredients } = useIngredients();
  
  const postIGDList = async () => {

    const response = await fetch('http://localhost:8080/igd', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(selectedIngredients),
    });
    if (!response.ok) {
      throw new Error('Data could not be posted!');
    } else {
      console.log('Data posted successfully!');
    }
  }

  return <Button className="px-4 py-2" onClick={postIGDList}>메뉴 추천</Button>;
}

export default function App() {
  return (
    <div className='container mx-auto flex flex-col items-center justify-center gap-4 p-4 h-screen'>
      <h2 className='text-2xl mt-3'>메뉴 추천 - 갖고 있는 재료를 고르세요</h2>
        <IngredientsProvider>
        <div className='topContainer flex gap-4 mb-4 mt-3' style={{ height: '40%' }}>
            <div className='topContainer flex gap-4 mb-4 mt-3'>
                <IGDList />
                <SelectedIGD />
            </div>
        </div>
        <LogButton /> {/* 이 부분을 변경했습니다 */}
        <FoodList/>
      </IngredientsProvider>
    </div>
  );
}
