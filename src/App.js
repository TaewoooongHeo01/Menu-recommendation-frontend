import React from 'react';
import './App.css';
import { Button } from './components/ui/button';
import IGDList from './components/IGDList';
import SelectedIGD from './components/selectedIGD';
import FoodList from './components/foodList';

export default function App() {
  return (
    <div className='container mx-auto flex flex-col items-center justify-center gap-4 p-4 h-screen'>
      <h2 className='text-2xl mt-3'>메뉴 추천 - 갖고 있는 재료를 고르세요</h2>
      <div className='topContainer flex gap-4 mb-4 mt-3' style={{ height: '40%' }}>
        <IGDList/>
        <SelectedIGD/>
      </div>
      <Button className="px-4 py-2">메뉴 추천</Button>
      <FoodList/>
    </div>
  );
}
