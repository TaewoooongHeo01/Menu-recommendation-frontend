// foodContext.js
import React, { createContext, useContext, useState } from 'react';

const FoodContext = createContext();

export const FoodProvider = ({ children }) => {
    const [food, setFood] = useState({}); 

    return (
        <FoodContext.Provider value={{ food, setFood }}>
            {children}
        </FoodContext.Provider>
    );
};

// 사용자 정의 훅
export const useFood = () => useContext(FoodContext);
