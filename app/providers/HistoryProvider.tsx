import { ReactNode, useState } from "react";
import HistoryContext from "../contexts/HistoryContext";

const HistoryProvider = ({ children }: { children: ReactNode }) => {
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

export default HistoryProvider;
