import React from "react";
import "../App.css";
import { useState, useEffect } from "react";
import { ScrollArea } from "./ui/scroll-area"
import { Separator } from "./ui/separator"

function IGDScroll() {
  // 데이터를 저장할 상태 변수 추가
  const [ingredients, setIngredients] = useState([]);

  // 컴포넌트가 마운트될 때 데이터 로드
  useEffect(() => {
      // 데이터를 가져오는 함수
      const fetchData = async () => {
          try {
              const response = await fetch('http://localhost:8080/');
              if (!response.ok) {
                  throw new Error('Data could not be fetched!');
              } else {
                  const data = await response.json();
                  setIngredients(data); // 상태 업데이트
                  console.log(data); // 콘솔에 데이터 출력
              }
          } catch (error) {
              console.error("Error fetching data: ", error);
          }
      };
      
      fetchData(); // 함수 실행
  }, []); // 빈 의존성 배열로 설정하여 컴포넌트가 마운트될 때만 실행됨

  return (
      <>
      <h4 className="mb-4 pl-4 pt-4 text-sm font-medium leading-none">재료 선택</h4>
      <ScrollArea className="w-64 rounded-md pl-4 pr-4 pb-4" style={{height: "90%"}}>
          <div className="p-1">
              {ingredients.map((ingredient, index) => ( // 데이터를 매핑하여 UI에 표시
                  <React.Fragment key={index}>
                      <div className="text-sm">
                          {ingredient.name} {/* 가정: 응답된 객체에 'name' 속성이 있다고 가정 */}
                      </div>
                      <Separator className="my-2" />
                  </React.Fragment>
              ))}
          </div>
      </ScrollArea>
      </>
  )
}


// IGDList 컴포넌트
function IGDList() {
    return (
      <div className="w-1/2 bg-gray-50 p-4 overflow-auto h-full shadow-lg rounded-lg overflow-hidden border border-gray-250">
        <IGDScroll/>
      </div>
    );
}

export default IGDList;

