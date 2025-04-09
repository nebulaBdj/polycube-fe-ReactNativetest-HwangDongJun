import { useContext } from "react";
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useRouter } from "expo-router";
import HistoryContext from "../contexts/HistoryContext";
import WebViewEventLogContext from "../contexts/WebViewEventLogContext";

export default function HistoryScreen() {
  const { history } = useContext(HistoryContext);
  const { webViewEventLogs } = useContext(WebViewEventLogContext);
  const { push } = useRouter();

  const renderItem = ({ item }: { item: string }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() =>
        push({
          pathname: "/webview",
          params: { url: item },
        })
      }
    >
      <Text style={styles.itemText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {history.length === 0 ? (
        <Text style={styles.emptytext}>입력한 URL이 없습니다.</Text>
      ) : (
        <View>
          <Text style={styles.listtext}>방문 기록</Text>
          <FlatList
            data={history}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
          />
        </View>
      )}

      {webViewEventLogs.length === 0 ? (
        <Text style={styles.emptytext}>기록된 웹뷰 이벤트가 없습니다.</Text>
      ) : (
        <View>
          <Text style={styles.listtext}>웹뷰 이벤트 로그</Text>
          <FlatList
            data={webViewEventLogs}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
          />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    padding: 16,
  },
  listtext: {
    color: "#fff",
    textAlign: "center",
    marginTop: 20,
    fontSize: 18,
    fontWeight: 700,
    paddingBottom: 20,
    borderBottomColor: "#fff",
    borderBottomWidth: 1,
  },
  emptytext: {
    color: "#fff",
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
  },
  item: {
    paddingVertical: 10,
    borderBottomColor: "#fff",
    borderBottomWidth: 1,
  },
  itemText: {
    color: "#fff",
    fontSize: 16,
    paddingLeft: 10,
  },
});
