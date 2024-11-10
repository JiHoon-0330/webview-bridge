import { useRef } from "react";
import { Alert } from "react-native";
import { WebView, WebViewMessageEvent } from "react-native-webview";

export default function Webview() {
  const webviewRef = useRef<WebView | null>(null);
  const uri = process.env.EXPO_PUBLIC_URL;

  if (!uri) {
    throw new Error(".env 파일에 웹뷰 URL을 설정해 주세요");
  }

  return (
    <WebView
      ref={webviewRef}
      style={{
        width: "100%",
        height: 100,
      }}
      originWhitelist={["*"]}
      source={{ uri }}
      onMessage={(e: WebViewMessageEvent) => {
        const {
          nativeEvent: { data },
        } = e;
        Alert.alert("event");
      }}
      domStorageEnabled={true}
      javaScriptEnabled={true}
      scrollEnabled={true}
      nestedScrollEnabled={true}
    />
  );
}