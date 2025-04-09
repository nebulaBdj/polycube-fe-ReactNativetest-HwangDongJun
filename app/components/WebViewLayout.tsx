import { useContext, useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Dimensions,
  BackHandler,
} from "react-native";
import WebView from "react-native-webview";
import { WebViewNavigation } from "react-native-webview";
import WebViewEventLogContext from "../contexts/WebViewEventLogContext";

interface WebViewLayoutProps {
  url: string;
}

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function WebViewLayout({ url }: WebViewLayoutProps) {
  const ref = useRef<WebView>(null);
  const [navState, setNavState] = useState<WebViewNavigation>();
  const { addWebViewEventLog } = useContext(WebViewEventLogContext);

  useEffect(() => {
    if (!navState) return;
    const canGoback = navState.canGoBack;

    const onPress = () => {
      if (canGoback && ref.current) {
        ref.current.goBack();
        return true;
      } else {
        return false;
      }
    };

    BackHandler.addEventListener("hardwareBackPress", onPress);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", onPress);
    };
  }, [navState, setNavState]);

  const handleWebViewEventMsg = (event: { nativeEvent: { data: string } }) => {
    try {
      const message = JSON.parse(event.nativeEvent.data);
      addWebViewEventLog(`${message.type}: ${message.data}`);
    } catch (error) {
      console.error("Error parsing message:", error);
    }
  };

  const injectedJavaScript = `
    document.addEventListener("click", () => {
      window.ReactNativeWebView.postMessage(JSON.stringify({ type: "CLICK_EVENT", data: "User clicked on the page!" }));
    });

    document.addEventListener("scroll", () => {
      window.ReactNativeWebView.postMessage(JSON.stringify({ type: "SCROLL_EVENT", data: "User scrolled the page!" }));
    });
  `;

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        ref={ref}
        onNavigationStateChange={(e) => setNavState(e)}
        style={styles.webview}
        source={{ uri: url }}
        injectedJavaScript={injectedJavaScript}
        onMessage={handleWebViewEventMsg}
        javaScriptEnabled={true}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
    justifyContent: "center",
  },
  webview: {
    flex: 1,
    width: windowWidth,
    height: windowHeight,
  },
});
