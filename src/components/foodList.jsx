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

export function CarouselDemo() {
  return (
    <Carousel className="w-full max-w-xs">
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-4xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
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