import { ReactNode, useState } from "react";
import WebViewEventLogContext from "../contexts/WebViewEventLogContext";

const WebViewEventLogProvider = ({ children }: { children: ReactNode }) => {
  const [webViewEventLogs, setWebViewEventLog] = useState<string[]>([]);

  const addWebViewEventLog = (url: string) => {
    setWebViewEventLog((prev) => {
      const newWebViewEventLogs = [url, ...prev.filter((item) => item !== url)];
      return newWebViewEventLogs;
    });
  };

  return (
    <WebViewEventLogContext.Provider
      value={{ webViewEventLogs, addWebViewEventLog }}
    >
      {children}
    </WebViewEventLogContext.Provider>
  );
};

export default WebViewEventLogProvider;
