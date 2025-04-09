import { createContext } from "react";

export interface WebViewEventLogType {
  webViewEventLogs: string[];
  addWebViewEventLog: (url: string) => void;
}

const WebViewEventLogContext = createContext<WebViewEventLogType>({
  webViewEventLogs: [],
  addWebViewEventLog: () => {},
});

export default WebViewEventLogContext;
