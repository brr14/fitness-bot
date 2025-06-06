import { createContext, useState, ReactNode } from "react";



export const DateContext = createContext({
    startDate: null,
    setStartDate: () => {},
    endDate: null,
    setEndDate: () => {},
});


export const DateProvider = ({ children }) => {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    return (
        <DateContext.Provider value={{ startDate, setStartDate, endDate, setEndDate }}>
            {children}
        </DateContext.Provider>
    );
};


export const graphContext=createContext({
    selectedGraph:"Line Graph",
    setSelectedGraph:()=>{}
})

export const GraphProvider = ({ children }) => {
    const [selectedGraph, setSelectedGraph] = useState(null);

    return (
        <graphContext.Provider value={{ selectedGraph, setSelectedGraph}}>
            {children}
        </graphContext.Provider>
    );
};