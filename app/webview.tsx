import { useGlobalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Dimensions,
  BackHandler,
} from "react-native";
import WebView from "react-native-webview";
import { WebViewNavigation } from "react-native-webview";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function WebViewLayout() {
  const { url } = useGlobalSearchParams<{ url: string }>();

  const ref = useRef<WebView>(null);
  const [navState, setNavState] = useState<WebViewNavigation>();

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

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        ref={ref}
        onNavigationStateChange={(e) => setNavState(e)}
        style={styles.webview}
        source={{ uri: url }}
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
