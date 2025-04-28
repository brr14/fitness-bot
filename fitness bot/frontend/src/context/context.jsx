import { createContext, useState, ReactNode } from "react";

interface DateContextType {
    startDate: Date | null;
    setStartDate: (date: Date | null) => void;
    endDate: Date | null;
    setEndDate: (date: Date | null) => void;
}


export const DateContext = createContext<DateContextType>({
    startDate: null,
    setStartDate: () => {},
    endDate: null,
    setEndDate: () => {},
});


export const DateProvider = ({ children }: { children: ReactNode }) => {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    return (
        <DateContext.Provider value={{ startDate, setStartDate, endDate, setEndDate }}>
            {children}
        </DateContext.Provider>
    );
};

interface dropdownInterface{

    selectedGraph:string | null,
    setSelectedGraph:(graph:string | null)=>void;
}


export const graphContext=createContext<dropdownInterface>({
    selectedGraph:"Line Graph",
    setSelectedGraph:()=>{}
})

export const GraphProvider = ({ children }: { children: ReactNode }) => {
    const [selectedGraph, setSelectedGraph] = useState<string | null>(null);

    return (
        <graphContext.Provider value={{ selectedGraph, setSelectedGraph}}>
            {children}
        </graphContext.Provider>
    );
};