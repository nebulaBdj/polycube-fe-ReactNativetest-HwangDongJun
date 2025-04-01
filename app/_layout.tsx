import { Stack } from "expo-router";
import { HistoryProvider } from "./contexts/HistoryContext";

export default function RootLayout() {
  return (
    <HistoryProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="webview" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </HistoryProvider>
  );
}
