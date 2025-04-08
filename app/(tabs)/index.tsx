import { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Button,
  BackHandler,
} from "react-native";
import { HistoryContext } from "../contexts/HistoryContext";
import WebViewLayout from "../contexts/WebViewLayout";

interface WebViewState {
  url: string;
  isOpen: boolean;
}

export default function Index() {
  const [inputurl, setInputUrl] = useState("");
  const [webViewState, setWebViewState] = useState<WebViewState>({
    url: "",
    isOpen: false,
  });
  const { addHistory } = useContext(HistoryContext);

  useEffect(() => {
    const onBackPress = () => {
      if (webViewState.isOpen) {
        setWebViewState({ ...webViewState, isOpen: false });
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      onBackPress
    );
    return () => backHandler.remove();
  }, [webViewState]);

  const handleGoBtn = async () => {
    if (!inputurl) return;

    const formatUrl = inputurl.startsWith("http")
      ? inputurl
      : `https://${inputurl}/`;
    console.log("url", formatUrl);
    await addHistory(formatUrl);
    setWebViewState({ url: formatUrl, isOpen: true });
  };

  return (
    <SafeAreaView style={styles.container}>
      {webViewState.isOpen ? (
        <View style={{ flex: 1 }}>
          <WebViewLayout url={webViewState.url} />
          <Button
            title="Back"
            onPress={() => setWebViewState({ ...webViewState, isOpen: false })}
          />
        </View>
      ) : (
        <>
          <Text style={styles.title}>
            접속하고자 하는 url을 입력해주세요 😀
          </Text>
          <View style={{ flexDirection: "row" }}>
            <TextInput
              value={inputurl}
              onChangeText={setInputUrl}
              placeholder="https://example.com"
              style={styles.input}
            />
            <Button title="Go" onPress={handleGoBtn} />
          </View>
        </>
      )}
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
  title: {
    color: "#fff",
    fontSize: 18,
    marginBottom: 28,
  },
  input: {
    height: 40,
    borderColor: "#fff",
    borderWidth: 1,
    marginRight: 10,
    paddingHorizontal: 8,
    color: "#fff",
    borderRadius: 10,
  },
});
