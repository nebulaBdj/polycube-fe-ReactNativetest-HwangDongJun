import { useGlobalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Dimensions,
  BackHandler,
  Platform,
} from "react-native";
import WebView from "react-native-webview";
import { WebViewNavigation } from "react-native-webview";
import {
  TestIds,
  BannerAd,
  BannerAdSize,
  useForeground,
} from "react-native-google-mobile-ads";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function WebViewLayout() {
  const { url } = useGlobalSearchParams<{ url: string }>();

  const ref = useRef<WebView>(null);
  const [navState, setNavState] = useState<WebViewNavigation>();

  const bannerRef = useRef<BannerAd>(null);

  let adUnitId = __DEV__
    ? TestIds.ADAPTIVE_BANNER
    : "ca-app-pub-7966483738802412/1327760623";

  if (Platform.OS === "ios") {
    adUnitId = __DEV__
      ? TestIds.ADAPTIVE_BANNER
      : "ca-app-pub-7966483738802412/7905014941";
  }

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

  // iOS의 경우 앱이 백그라운드에서 포그라운드로 돌아왔을 때 광고 배너가 비어있는 것을 방지
  useForeground(() => {
    Platform.OS === "ios" && bannerRef.current?.load();
  });

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        ref={ref}
        onNavigationStateChange={(e) => setNavState(e)}
        style={styles.webview}
        source={{ uri: url }}
      />
      <BannerAd
        ref={bannerRef}
        unitId={adUnitId}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
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
