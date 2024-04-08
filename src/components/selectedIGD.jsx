import React from "react";
import "../App.css";

import { ScrollArea } from "./ui/scroll-area"
import { Separator } from "./ui/separator"
import { useIngredients } from '../ingredientsContext';

function SelectedList() {
  const { selectedIngredients, setSelectedIngredients } = useIngredients();

  const removeIngredient = (ingredientToRemove) => {
    // 선택된 재료를 제외한 새로운 배열 생성
    const newIngredients = selectedIngredients.filter(ingredient => ingredient !== ingredientToRemove);
    // 새로운 배열로 selectedIngredients 상태 업데이트
    setSelectedIngredients(newIngredients);
  };

  return (
    <>
      <h4 className="mb-4 pl-4 pt-4 text-sm font-medium leading-none">재료 선택</h4>
      <ScrollArea className="w-64 rounded-md pl-4 pr-4 pb-4" style={{height: "90%"}}>
        <div className="p-1">
          {selectedIngredients.map((ingredient, index) => (
              <React.Fragment key={index}>
                  <div className="text-sm" onClick={() => removeIngredient(ingredient)} style={{"cursor": "pointer"}}>
                      {ingredient.ingredientName}
                  </div>
                  <Separator className="my-2" />
              </React.Fragment>
          ))}
        </div>
      </ScrollArea>
    </>
  )
}


// SelectedIGD 컴포넌트
function SelectedIGD() {
    return (
      <div className="w-1/2 bg-gray-50 p-4 overflow-auto h-full shadow-lg rounded-lg overflow-hidden border border-gray-250">
        <SelectedList/>
      </div>
    );
}

export default SelectedIGD;