import { createContext, useState, ReactNode } from "react";

export interface HistoryContextType {
  history: string[];
  addHistory: (url: string) => void;
}

export const HistoryContext = createContext<HistoryContextType>({
  history: [],
  addHistory: () => {},
});

export const HistoryProvider = ({ children }: { children: ReactNode }) => {
  const [history, setHistory] = useState<string[]>([]);

  const addHistory = (url: string) => {
    setHistory((prev) => {
      const newHistory = [url, ...prev.filter((item) => item !== url)];
      return newHistory;
    });
  };

  return (
    <HistoryContext.Provider value={{ history, addHistory }}>
      {children}
    </HistoryContext.Provider>
  );
};
