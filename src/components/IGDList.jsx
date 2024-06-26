import React from "react";
import "../App.css";
import { useState, useEffect } from "react";
import { ScrollArea } from "./ui/scroll-area"
import { Separator } from "./ui/separator"
import { useIngredients } from '../ingredientsContext';
import { useAuth } from "../AuthContext";

class Ingredient {
    id;
    ingredientName;
    constructor(id, ingredientName) {
        this.id = id;
        this.ingredientName = ingredientName;
    }
}

function IGDScroll() {
    // 데이터와 검색 결과를 저장할 상태 변수 추가
    const [ingredients, setIngredients] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const { selectedIngredients, setSelectedIngredients } = useIngredients();
    const { user, login, lougout } = useAuth();

    const addIngredient = (id, ingredientName) => {
        // selectedIngredients 배열 내에 동일한 id를 가진 객체가 있는지 확인
        const isExisting = selectedIngredients.some(ingredient => ingredient.id === id);
        // 동일한 id를 가진 객체가 없는 경우에만 새 객체를 배열에 추가
        if (!isExisting) {
            const newIngredient = new Ingredient(id, ingredientName);
            setSelectedIngredients([...selectedIngredients, newIngredient]);
        }
    };

    // 검색 기능 구현
    const handleSearch = (e) => {
        let keyword = e.target.value;
        if (keyword.trim() === '') { // 검색어가 없을 경우 모든 재료를 표시
            setSearchResults(ingredients);
        } else {
            const filteredData = ingredients.filter(data => 
                data.ingredientName.toLowerCase().includes(keyword.toLowerCase())
            );
            setSearchResults(filteredData); // 검색 결과 업데이트
        }
    };

    // 컴포넌트가 마운트될 때 데이터 로드
    useEffect(() => {
        // 데이터를 가져오는 함수
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8080/', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                });
                if (!response.ok) {
                    throw new Error('Data could not be fetched!');
                } else {
                    const data = await response.json();
                    setIngredients(data.ingredients); // 상태 업데이트
                    setSearchResults(data.ingredients); // 초기 검색 결과 설정
                    login(data.member);
                    console.log(data); // 콘솔에 데이터 출력
                    console.log(user);
                }
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };
        
        fetchData(); // 함수 실행
    }, []); // 빈 의존성 배열로 설정하여 컴포넌트가 마운트될 때만 실행됨
    return (
        <>
            <input type="text" placeholder="재료검색" className="text-sm font-medium leading-none mb-4 bg-white flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                onChange={handleSearch}/>
            <ScrollArea className="w-64 rounded-md pl-4 pr-4 pb-4" style={{height: "90%"}}>
                <div className="p-1">
                    {searchResults.map((ingredient, index) => (
                        <React.Fragment key={index}>
                            <div className="text-sm" onClick={() => addIngredient(ingredient.id, ingredient.ingredientName)} style={{"cursor": "pointer"}}>
                                {ingredient.ingredientName}
                            </div>
                            <Separator className="my-2" />
                        </React.Fragment>
                    ))}
                </div>
            </ScrollArea>
        </>
    );
}

// IGDList 컴포넌트
function IGDList() {
    return (
      <div className="w-1/2 h-80 bg-gray-50 p-4 shadow-lg rounded-lg border border-gray-250">
        <IGDScroll/>
      </div>
    );
}

export default IGDList;
