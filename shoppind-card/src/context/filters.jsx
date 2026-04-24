import { createContext } from "react";

// 1 Crear el contexto
export const FiltersContext = createContext();

// 2 Crear el provider
export const FiltersProvider = ({ children }) => {
    return (
        <FiltersContext.Provider value={{
            // 3 Crear los valores
            minPrice: 0,
            category: 'all'

        }}>
            {children}
        </FiltersContext.Provider>
    )
}