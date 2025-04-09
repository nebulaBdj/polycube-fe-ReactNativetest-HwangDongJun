import { createContext } from "react";

export interface HistoryContextType {
  history: string[];
  addHistory: (url: string) => void;
}

const HistoryContext = createContext<HistoryContextType>({
  history: [],
  addHistory: () => {},
});

export default HistoryContext;
