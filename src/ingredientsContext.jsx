import React, { createContext, useContext, useState } from 'react';

const IngredientsContext = createContext();

export const IngredientsProvider = ({ children }) => {
    const [selectedIngredients, setSelectedIngredients] = useState([]);

    return (
        <IngredientsContext.Provider value={{ selectedIngredients, setSelectedIngredients }}>
            {children}
        </IngredientsContext.Provider>
    );
};

export const useIngredients = () => useContext(IngredientsContext);
