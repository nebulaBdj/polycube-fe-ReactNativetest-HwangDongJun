import { Stack } from "expo-router";
import HistoryProvider from "./providers/HistoryProvider";
import WebViewEventLogProvider from "./providers/WebViewEventLogProvider";

export default function RootLayout() {
  return (
    <WebViewEventLogProvider>
      <HistoryProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="webview" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </HistoryProvider>
    </WebViewEventLogProvider>
  );
}
