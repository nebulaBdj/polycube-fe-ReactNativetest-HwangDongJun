import { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Button,
} from "react-native";
import { HistoryContext } from "../contexts/HistoryContext";
import { useRouter } from "expo-router";

export default function Index() {
  const [url, setUrl] = useState("");
  const { addHistory } = useContext(HistoryContext);
  const { push } = useRouter();

  const handleGoBtn = () => {
    if (!url) return;

    const formatUrl = url.startsWith("http") ? url : `https://${url}/`;
    console.log("url", formatUrl);
    addHistory(formatUrl);
    push({
      pathname: "/webview",
      params: { url: formatUrl },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>접속하고자 하는 url을 입력해주세요 😀</Text>
      <View style={{ flexDirection: "row" }}>
        <TextInput
          value={url}
          onChangeText={setUrl}
          placeholder="https://example.com"
          style={styles.input}
        />
        <Button title="Go" onPress={handleGoBtn} />
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
  },
});
