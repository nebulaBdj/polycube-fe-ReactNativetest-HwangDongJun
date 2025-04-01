import { useGlobalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { StyleSheet, SafeAreaView, Dimensions, View } from "react-native";
import WebView from "react-native-webview";
import { WebViewNavigation } from "react-native-webview";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function WebViewLayout() {
  const { url } = useGlobalSearchParams<{ url: string }>();

  return (
    <SafeAreaView style={styles.container}>
      <WebView style={styles.webview} source={{ uri: url }} />
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
