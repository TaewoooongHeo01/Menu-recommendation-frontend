import React from 'react';  
import '../App.css';    

import { Card, CardContent } from "./ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel"
import { useFood } from '../foodContext';

export function CarouselDemo() {
  const { food } = useFood(); // setFood는 사용하지 않으므로 제외합니다.

  return (
    <Carousel className="w-full max-w-xs">
      <CarouselContent>
        {food ? ( 
          <CarouselItem>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <div className="font-semibold">{food.foodName}</div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ) : (
          <div>음식 정보가 없습니다.</div> // food 객체가 없을 경우 대체 텍스트 표시
        )}
      </CarouselContent>
    </Carousel>
  )
}



// FoodList 컴포넌트
function FoodList() {
    return (
      <CarouselDemo className="w-1/2 bg-gray-50 p-4 overflow-auto mt-4 mb-5 shadow-lg rounded-lg overflow-hidden border border-gray-250" style={{ height: '60%' }}/>  
    );
}

export default FoodList;