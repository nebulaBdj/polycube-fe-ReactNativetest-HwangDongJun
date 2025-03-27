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
2. 해당 event에 대한 데이터 수집을 진행합니다. (ex) 화면의 어디에서 event가 발생했는지, 시간이 어느정도 걸렸는지 등
3. 2번에서의 정보를 가지고 JSON 메시지를 생성합니다.
4. JS가 그 메시지를 받아 코드를 실행하여 화면에 적용합니다.

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

## 주요 기능 - 컨텐츠 표시

```bash
npm install --save react-native-webview
```

으로 react-native-webview 라이브러리를 이용해 웹뷰 컨텐츠를 보여줍니다. 해당 앱의 주요 기능은 원하는 웹 url 입력 시, 그 url의 웹뷰를 보여주는 것입니다.

<br />
<br />

## 주요 기능 - 광고 ID 읽기 및 표시

<br />
<br />

## 주요 기능 - Bottom navigation 적용

<br />
<br />

## 주요 기능 - UI 디자인 및 사용자 경험
