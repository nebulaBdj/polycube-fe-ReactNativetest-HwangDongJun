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
import HistoryContext from "../contexts/HistoryContext";
import WebViewLayout from "../components/WebViewLayout";
import ReactNativeIdfaAaid, {
  AdvertisingInfoResponse,
} from "@sparkfabrik/react-native-idfa-aaid";

interface WebViewState {
  url: string;
  isOpen: boolean;
}

export default function Index() {
  const [inputurl, setInputUrl] = useState<string>("");
  const [adverstingID, setAdverstingID] = useState<string | null>();
  const [webViewState, setWebViewState] = useState<WebViewState>({
    url: "",
    isOpen: false,
  });
  const { addHistory } = useContext(HistoryContext);

  useEffect(() => {
    ReactNativeIdfaAaid.getAdvertisingInfoAndCheckAuthorization(true)
      .then((res: AdvertisingInfoResponse) =>
        !res.isAdTrackingLimited
          ? setAdverstingID(res.id)
          : setAdverstingID(null)
      )
      .catch((err) => {
        console.error(err);
        return setAdverstingID(null);
      });
  }, []);

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

  const handleGoBtn = () => {
    if (!inputurl) return;

    const formatUrl = inputurl.startsWith("http")
      ? inputurl
      : `https://${inputurl}/`;
    console.log("url", formatUrl);
    addHistory(formatUrl);
    setWebViewState({ url: formatUrl, isOpen: true });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {webViewState.isOpen ? (
        <View style={{ flex: 1 }}>
          <WebViewLayout url={webViewState.url} />
          <View style={styles.floatingBackButton}>
            <Button
              title="Exit"
              onPress={() =>
                setWebViewState({ ...webViewState, isOpen: false })
              }
            />
          </View>
        </View>
      ) : (
        <View style={styles.container}>
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
        </View>
      )}
      <View style={styles.adIdBanner}>
        <Text style={styles.adIdText}>
          {adverstingID
            ? `adversting ID: ${adverstingID}`
            : "광고 ID를 불러올 수 없습니다."}
        </Text>
      </View>
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
  adIdBanner: {
    position: "fixed",
    bottom: 0,
    backgroundColor: "#fff",
    padding: 10,
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "#ccc",
  },
  adIdText: {
    fontSize: 12,
    color: "#333",
  },
  floatingBackButton: {
    position: "absolute",
    bottom: 10,
    right: 10,
  },
});
