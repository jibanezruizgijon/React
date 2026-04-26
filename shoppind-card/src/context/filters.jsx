import { createContext, useState} from "react";

// 1 Crear el contexto
export const FiltersContext = createContext();

// 2 Crear el provider
// Este provider debe proveer los valores
export const FiltersProvider = ({ children }) => {
    const [filters, setFilters] = useState({
        minPrice: 0,
        category: 'all'
    })
    return (
        <FiltersContext.Provider value={{
            // 3 Crear los valores
            filters,
            setFilters
        }}>
            {children}
        </FiltersContext.Provider>
    )
}