# Test React Native App

## React Native 개념 이해 및 개발 환경 세팅

### 제가 이해한 React Native에 대해서

**React vs. React Native**

React (웹): 브라우저의 DOM을 대상으로 하는 라이브러리로, HTML, CSS, JavaScript를 사용해 웹 애플리케이션을 개발합니다.

React Native (모바일): 모바일 기기의 네이티브 컴포넌트를 사용하여 iOS와 Android 앱을 개발합니다. JSX 문법은 React와 유사하지만, HTML 태그 대신 View, Text, Image 등의 네이티브 컴포넌트를 사용합니다.

**주요 특징**

- 네이티브 렌더링: 웹의 DOM이 아닌, 각 플랫폼의 네이티브 UI 컴포넌트를 사용하여 성능 및 사용자 경험을 개선합니다.
- 플랫폼별 코드 관리: iOS와 Android에서 공통으로 사용할 수 있는 코드베이스를 유지하면서, 필요시 플랫폼별 파일(.ios.js, .android.js)을 통해 차별화된 기능 구현이 가능합니다.
- 스타일링: CSS 대신 JavaScript 객체로 스타일을 정의하며, Flexbox를 주로 사용해 반응형 레이아웃을 구현합니다.
- 네이티브 모듈 연동: 광고 ID나 기타 기기 정보를 읽어오는 기능처럼, 네이티브 기능을 호출하기 위해 네이티브 모듈(또는 서드파티 라이브러리)을 사용할 수 있습니다.

**Core Components**

![image](https://github.com/user-attachments/assets/c8d32835-61dc-42e1-9b99-b76758eadffe)

- View, Text

  - 위에서 작성했듯이 React Native는 웹이 아니라 앱이기에 HTML 태그들을 직접 사용할 수 없습니다. 대신에 사용할 수 있는 컴포넌트가 `View`입니다. 이러한 View는 HTML의 div 태그와 유사한 역할을 하고, 보통 컨테이너로 사용됩니다.
  - React Native에 있는 모든 텍스트는 `Text` 컴포넌트에 들어가야 합니다. Text 컴폰넌트 없이 View 내부에 텍스트를 작성하면 오류가 발생합니다.
  - View, Text와 같은 컴포넌트는 무조건 react-native에서 import하여 사용해야합니다.

- Style

  - 스타일 적용 방법은 일부를 사용할 수 없다는 점을 제외하고, React의 스타일 지정 방식(CSS)와 거의 동일합니다.
  - React Native에서 스타일을 적용하는 방법은 다음과 같습니다.
    - StyleSheet를 import하고, `StyleSheet.create({})`를 이용해 스타일 객체를 생성합니다.
    - 내부에 원하는 이름을 지정하고 스타일을 작성합니다.
    ```ts
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
      },
    });
    ```
    - 위처럼 지정한 스타일을 컴포넌트에 적용해 주면 됩니다
    ```ts
    <View style={styles.container}>
    ```
    - 객체를 생성하지 않고 바로 `style{{}}`로 지정할 수도 있습니다.
    ```ts
    <View
       style={{
       flex: 1,
       justifyContent: "center",
       alignItems: "center",
       }}
    >
    ```

- Flexbox
  - React Native에서 레이아웃을 만들려면 Flexbox를 사용해야 합니다. 웹 CSS의 flex와 거진 같은 방식으로 작동합니다.
  - 기본적으로 모든 요소들이 Flexbox이기 때문에 block, inline-block, grid와 같은 display 속성을 거의 사용하지 않습니다.
    - 즉, 굳이 flex를 선언하지 않아도 모든 View에 자동으로 설정되어 있어서 flex에 대한 속성들을 바로 사용할 수 있습니다.
    - 그리고 웹에서 flex-direction의 기본값은 row인 반면에 리액트 네이티브에서의 기본값은 column입니다.
  - React Native에서는 overflow가 생긴다고 해서 자동으로 스크롤되지 않기 때문에
    - 레이아웃 지정 과정에서 width와 height를 직접 작성하지 않고, flex 속성을 이용해 비율을 조절하는 방식으로 레이아웃을 구현합니다.
    ```ts
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: "red" }} />
      <View style={{ flex: 3, backgroundColor: "green" }} />
      <View style={{ flex: 1, backgroundColor: "yellow" }} />
    </View>
    ```
    - 위 코드에서 중요한 것은 부모 View에 flex:1을 작성해야 제대로 비율을 조절할 수 있습니다.

**React Native의 작동 원리**

![image](https://github.com/user-attachments/assets/1846f2f3-9aca-46b6-9546-63d95906c2d8)

위 사진을 기반으로 설명하자면

1. iOS나 안드로이드에서 터치와 같은 행위를 통해 event를 감지합니다.
2. 해당 event에 대한 데이터 수집을 진행합니다. (ex) 스크린의 어디에서 event가 발생했는지, 시간이 어느정도 걸렸는지 등
3. 2번에서의 정보를 가지고 JSON 메시지를 생성합니다.
4. JS가 그 메시지를 받아 코드를 실행하여 스크린에 적용합니다.

**React Native의 단점**

1. 일부 기능은 네이티브 코드가 필요합니다.
   - 인앱 결제나 블루투스와 같은 기능을 구현하기 위해선 안드로이드와 iOS 각각 네이티브 코드를 따로 작성해야 합니다.
2. 오픈소스 라이브러리의 의존도가 높습니다.
   - 라이브러리 업데이트 시 호환성 문제가 발생할 가능성이 있습니다.
3. 게임이나 고성능 앱 개발에는 부적합합니다.
4. 업데이트가 잦아 종속 라이브러리 호환성 문제를 지속적으로 모니터링 해야 합니다.

<br />

### 개발 환경 세팅

React Native 개발 환경을 구축하는 방법은 총 두 가지가 있습니다.

1. React Native CLI
2. Expo CLI

React Native CLI의 경우 실제 앱을 만드는 데 필요한 모든 소프트웨어를 설치해줘야 합니다.

- 안드로이드 스튜디오
- Java
- 안드로이드 SDK (Software Development Kit)
- 시뮬레이터
- 개발도구들

따라서 볼륨이 작은 과제 요구사항에 맞추어 Expo CLI를 사용했습니다.

![image](https://github.com/user-attachments/assets/81f94fbc-b3af-4eb8-88bf-2a51741c546b)

React Native의 Application 구조는 위 사진과 같습니다. 자바스크립트보다 Bridge들을 통해서 코드가 Platform API와 통신할 수 있게 해주는 전체 인프라 구조가 매우 중요한 것을 알 수 있는데요. Expo CLI는 빨간 박스 부분을 제외한 모든 인프라가 구축되어 있어 필요한 소프트웨어를 설치하지 않아도 되고, Expo go와 같은 앱으로 코드의 결과를 바로 확인할 수 있습니다.

<br />
<br />

## 주요 기능 - Bottom navigation 적용

먼저 기반이 되는 구조를 짜는 것이 우선시 되어야 한다고 생각하여 Bottom navigation을 먼저 구현했습니다.

구현하고자 하는 방식은 url을 입력하면, 표시 가능한 웹에 한해서 웹뷰로 보여주고, 그 입력했던 주소들을 기록해 주는 앱을 구현할 예정입니다.
(웹 url을 입력하는 스크린과 그 기록을 확인할 수 있는 스크린을 구현하는 과정은 UI 디자인 및 사용자 경험[요구사항 2.4] 과정에서 설명하겠습니다.)

페이지 자체가 두 페이지이기 때문에 Expo에 내재되어 있는 expo-router를 이용해 간단히 구현했습니다.

먼저 Bottom navigation을 구현하기 위해 지켜야 할 Expo Router의 기본 개념 및 규칙을 정리했습니다.

**Expo Router**

Expo Router은 React Native를 위한 파일 기반 라우팅 프레임워크입니다.

- app directory : Expo Router는 app 디렉터리 내의 파일들을 자동으로 라우트로 인식합니다. 이 디렉터리 안에 있는 모든 파일과 폴더는 네비게이션 경로로 매핑되어, 각 스크린과 페이지로 됩니다.
- Root layout : app/\_layout.tsx 파일이고, 여기서 헤더와 탭 바와 같은 공유 UI 요소를 정의할 수 있습니다.
- File name conventions : index.tsx와 같은 Index 파일은 부모 디렉토리를 경로로 사용합니다. 그 외의 파일들은 자신의 파일 이름이 라우팅 경로가 됩니다.

**최상위 페이지 라우팅**

먼저 최상위 app 폴더에 \_layout.tsx 파일을 만들어 루트 레이아웃을 설정해 줍니다.

```tsx
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
```

url을 입력할 탭에 관련된 주소를 처리하고자 Stack.screen 태그의 name에 (tabs)을 입력해주고, app 하위로 (tabs) 폴더를 만들어줬습니다.
그리고 웹뷰는 별도의 스크린으로 관리할 것이기에 따로 작성해주었습니다.
경로가 잘못되었을 때에 대비하여 Stack.screen 태그의 name에 +not-found.tsx를 입력합니다. +not-found.tsx 파일 이름 자체가 “없는 라우트”를 처리하는 규칙을 나타냅니다.

주소에 맞춰서 원하는 스크린을 보여주기 위해 아래와 같이 폴더 구조를 설계했습니다.

```
app
 ┣ (tabs)
 ┃  ┣ _layout.tsx
 ┃  ┣ history.tsx
 ┃  ┗ index.tsx
 ┣ _layout.tsx
 ┣ +not-found.tsx
 ┗ webview.tsx
```

**하단 Tab 즉 Bottom Navigation에 대한 라우팅**

app 폴더 하위에 만든 (tabs) 폴더에 \_layout.tsx 파일을 생성하고 Tab 태그를 이용해 하단 Tab을 구현합니다.

```tsx
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="about" options={{ title: "About" }} />
    </Tabs>
  );
}
```

위와 같이 입력하고 name과 동일한 이름의 파일을 만든 후, expo-router의 Link 태그나 useRouter.push를 가져와 `/(tabs)/history`를 입력하여 원하는 스크린으로 이동할 수 있습니다. index.tsx는 부모 디렉토리를 경로로 사용하기 때문에 `/(tabs)`를 입력하면 index.tsx를 보여주는 스크린으로 이동할 수 있습니다.

<br />
<br />

## 주요 기능 - 컨텐츠 표시

react-native-webview를 설치해 웹 페이지를 보여줬습니다.

```bash
npm install --save react-native-webview
```

**임의의 웹사이트 webview로 표시**

app 폴더 하위에 webview.tsx를 만들고 webview를 보여줄 수 있도록 코드를 작성합니다. webview를 보여줄려면 webview 태그에 넓이와 위치를 지정해 주어야 합니다. 저는 전체 스크린에 맞춰 보여주기 위해서 react-native의 Dimensions를 이용해 보여지는 창의 넓이와 높이를 가져와 WebView 태그에 지정해 주었습니다.

```tsx
import { StyleSheet, SafeAreaView, Dimensions } from "react-native";
import WebView from "react-native-webview";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function WebViewLayout() {
  return (
    <SafeAreaView style={styles.container}>
      <WebView
        style={styles.webview}
        source={{ uri: "https://www.naver.com/" }}
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
```

임의로 naver 주소를 입력했고, 정상적으로 스크린이 보여지는 것을 확인했습니다.

**연결된 웹뷰에서 더 깊은 depth로 들어간 후 뒤로가기 진행 시 웹뷰에서 뒤로가기가 되는 것이 아닌 초기 스크린으로 돌아오는 문제 해결**

그냥 WebView만 이용해서 웹 사이트를 접속하면, 해당 웹뷰에서 특정 작업을 진행한 후 뒤로가기를 했을 때, 그 웹뷰 내에서 작동하는 것이 아니라 전체 흐름에서 작동하기 때문에 초기 스크린으로 돌아가게 됩니다.

이를 방지하기 위해선 뒤로가기에 대해 새로운 이벤트를 지정해줘야 합니다.

먼저 WebView를 통해 연결한 웹사이트에서 뒤로가기가 가능한 상태인지 확인하기 위해 ref와 navState를 생성해 WebView와 연동합니다.

```tsx
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
  const ref = useRef<WebView>(null);
  const [navState, setNavState] = useState<WebViewNavigation>();

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        ref={ref}
        onNavigationStateChange={(e) => setNavState(e)}
        style={styles.webview}
        source={{ uri: "https://www.naver.com/" }}
      />
    </SafeAreaView>
  );
}
```

연동한 상태에 따라 뒤로가기 버튼을 누르는 이벤트가 발생했을때, WebView의 상태를 확인하고, 뒤로가기 버튼 기능이 적절하게 작동되도록 설정합니다.

useEffect를 통해서 navState가 변경될 때마다 이를 체크합니다.

```tsx
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
        source={{ uri: "https://www.naver.com/" }}
      />
    </SafeAreaView>
  );
}
```

이렇게하여 접속한 웹사이트를 이용할 수 있는 WebViewLayout을 구현했습니다.

<br />
<br />

## 주요 기능 - 광고 ID 읽기 및 표시

우선 광고 ID란 앱 마케팅이나 광고 트레킹에 사용되며, 사용자의 동의가 필요한 민감한 정보이기 때문에 권한 처리와 네이티브 코드 작업이 필요합니다.

- IDFA: iOS 기기의 광고 식별자 (Identifier for Advertisers)
- GAID (또는 ADID): Android 기기의 광고 식별자 (Google Advertising ID)

이러한 각 기기의 고유 광고 ID를 편리하게 가져와 주는 react-native-idfa-aaid를 찾았고 이를 이용하기로 했습니다.

```bash
npm install @sparkfabrik/react-native-idfa-aaid
```

사용법은 매우 간단합니다. [깃허브 링크](https://github.com/sparkfabrik/sparkfabrik-react-native-idfa-aaid)에 따라 다음과 같이 적용하면 각 기기에 대한 광고 ID (IDFA, ADID)를 얻을 수 있습니다.

iOS 14 버전 이상부터 사용자에게 동의를 구해야하기 때문에 expo-tracking-transparency를 설치하고 app.json plugin에 아래 코드를 넣어줍니다.

```json
{
  "expo": {
    "plugins": [
      [
        "expo-tracking-transparency",
        {
          "userTrackingPermission": "..."
        }
      ]
    ]
  }
}
```

이후 id를 표시해야 하는 페이지에서 ReactNativeIdfaAaid와 AdvertisingInfoResponse를 가지고 와서 아래와 같이 사용해주면 됩니다.

```tsx
import ReactNativeIdfaAaid, { AdvertisingInfoResponse } from '@sparkfabrik/react-native-idfa-aaid';

const MyComponent: React.FC = () => {
  const [idfa, setIdfa] = useState<string | null>();

  useEffect(() => {
    ReactNativeIdfaAaid.getAdvertisingInfoAndCheckAuthorization(true)
      .then((res: AdvertisingInfoResponse) =>
        !res.isAdTrackingLimited ? setIdfa(res.id) : setIdfa(null),
      )
      .catch((err) => {
        console.log(err);
        return setIdfa(null);
      });
  }, []);
```

저는 각 광고 id를 모두 내포하는 의미를 잘 살리고자 adverstingID state를 만들어 광고 ID를 다루기로 결정했습니다. 그리고 해당 광고 ID를 하단 광고 배너처럼 보일 수 있도록 스타일을 지정했습니다. 또한 웹뷰를 보여주는 화면에서만 보이도록 웹뷰 스크린인 index.tsx의 하단에 고정했습니다.

```tsx
<View style={styles.adIdBanner}>
  <Text style={styles.adIdText}>
    {adverstingID
      ? `adversting ID: ${adverstingID}`
      : "광고 ID를 불러올 수 없습니다."}
  </Text>
</View>
```

```ts
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
```

<br />
<br />

## 주요 기능 - UI 디자인 및 사용자 경험

사용자 경험 향상 고려해 다음과 같은 기능을 구현했습니다.

1. 접속하고 싶은 url 입력시 입력한 웹사이트를 보여주는 웹뷰 표시
2. 방문했던 url을 기록하고, 기록된 url에 바로 재방문할 수 있게 링크 연결
3. 웹뷰에서 바로 홈 스크린으로 이동할 수 있는 EXIT 버튼 구현

이를 구현하기 위해 방문기록을 저장하는 HistoryContext를 구현했습니다.

```ts
import { createContext, useState, ReactNode } from "react";

export interface HistoryContextType {
  history: string[];
  addHistory: (url: string) => void;
}

export const HistoryContext = createContext<HistoryContextType>({
  history: [],
  addHistory: () => {},
});

export const HistoryProvider = ({ children }: { children: ReactNode }) => {
  const [history, setHistory] = useState<string[]>([]);

  const addHistory = (url: string) => {
    setHistory((prev) => {
      const newHistory = [url, ...prev.filter((item) => item !== url)];
      return newHistory;
    });
  };

  return (
    <HistoryContext.Provider value={{ history, addHistory }}>
      {children}
    </HistoryContext.Provider>
  );
};
```

위에서 구현한 HistoryProvider로 최상단 컴포넌트를 감싸고

```tsx
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
```

메인 스크린(app/(tabs)/index.tsx)에서 url을 입력하고 Go 버튼을 클릭했을 때, HistoryContext에서 addHistory를 불러와 입력한 url을 저장해 줍니다.

```tsx
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

  ...

  const handleGoBtn = () => {
    if (!inputurl) return;

    const formatUrl = inputurl.startsWith("http")
      ? inputurl
      : `https://${inputurl}/`;
    console.log("url", formatUrl);
    addHistory(formatUrl); ///// HistoryContext에 접속하는 url 기록
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
```

이렇게 기록한 url은 bottom navigation에서 history 버튼을 눌러 확인할 수 있습니다.

```tsx
import { useContext } from "react";
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { HistoryContext } from "../contexts/HistoryContext";
import { useRouter } from "expo-router";

export default function HistoryScreen() {
  const { history } = useContext(HistoryContext);
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
    </SafeAreaView>
  );
}
```

그리고 웹뷰를 표시할 때 사용자가 바로 홈 스크린으로 이동하고 싶을 경우를 고려하여 EXIT 버튼을 구현했습니다.

```tsx
            <Button
              title="Exit"
              onPress={() =>
                setWebViewState({ ...webViewState, isOpen: false })
              }
            />
          </View>
```

```tsx
  floatingBackButton: {
    position: "absolute",
    bottom: 10,
    right: 10,
  },
```

마지막으로 전체 color를 검은색과 노란색 계열로 통일하여 UI적으로 편하게 앱을 이용할 수 있도록 설정했습니다.

## 주요 기능 - 앱과 웹뷰 간의 통신 구현

react-native-webview의 onMessage method를 활용하여 앱과 웹 간의 통신을 처리하고자 합니다. 웹뷰에서의 이벤트를 받아서 앱에서 메시지를 띄워주는 방식으로 구현했습니다.

HistoryContext를 구현한 것과 같이 WebViewEvenLogContext를 구현하여 방문 기록과 함께 이벤트 로그를 표기하고자 합니다.

그래서 먼저 WebView가 발생한 이벤트를 감지할 수 있도록 JavaScript 코드를 주입해줍니다.

```tsx
...

  const injectedJavaScript = `
    document.addEventListener("click", () => {
      window.ReactNativeWebView.postMessage(JSON.stringify({ type: "CLICK_EVENT", data: "User clicked on the page!" }));
    });

    document.addEventListener("scroll", () => {
      window.ReactNativeWebView.postMessage(JSON.stringify({ type: "SCROLL_EVENT", data: "User scrolled the page!" }));
    });
  `;

...

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        ref={ref}
        onNavigationStateChange={(e) => setNavState(e)}
        style={styles.webview}
        source={{ uri: url }}
        injectedJavaScript={injectedJavaScript}
        javaScriptEnabled={true}
      />
    </SafeAreaView>
  );

```

그리고 이벤트가 발생했을 때 WebViewEventLogContext에 그 이벤트에 대한 데이터를 받아서 넣을 수 있도록 함수를 작성하고, onMessage에 해당 함수를 넣어줍니다.

```tsx

...

  const handleWebViewEventMsg = (event: { nativeEvent: { data: string } }) => {
    try {
      const message = JSON.parse(event.nativeEvent.data);
      addWebViewEventLog(`${message.type}: ${message.data}`);
    } catch (error) {
      console.error("Error parsing message:", error);
    }
  };

...

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        ref={ref}
        onNavigationStateChange={(e) => setNavState(e)}
        style={styles.webview}
        source={{ uri: url }}
        injectedJavaScript={injectedJavaScript}
        onMessage={handleWebViewEventMsg}a
        javaScriptEnabled={true}
      />
    </SafeAreaView>
  );

```

이제 history.tsx에 WebViewEventLogContext를 불러와 표시해주면 됩니다.

## 실습 캡처본

노트북이 window OS 기반이어서 ios에 대한 test는 진행하지 못했습니다. 그래도 빌드를 위해 Mac북을 구하여 ios를 빌드한 후 깃허브 레포지토리에 올려 받아서 작업을 진행했습니다. 완성한 앱의 캡처본입니다.

이렇게 공부하면서 과제를 수행할 수 있게 해주셔서 감사합니다. 그리고 부족한 모습에도 기회를 주시고 기다려 주셔서 다시 한 번 정말 감사드립니다. React Native의 전체적인 개념을 빠르게 이해할 수 있었고, 이를 적용해 유의미한 앱 서비스를 개발할 수 있었습니다. 행복한 하루 보내시길 바랍니다.
