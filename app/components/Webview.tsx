import { getStorage } from "@/lib/async-storage";
import { useRef } from "react";
import { WebView, WebViewMessageEvent } from "react-native-webview";

export default function Webview() {
  const webviewRef = useRef<WebView | null>(null);
  const uri = process.env.EXPO_PUBLIC_URL;

  const getToken = async () => {
    const token = await getStorage("token");
    webviewRef.current?.injectJavaScript(`
      window.getInAppToken('${token ?? ""}')
      `);
  };

  if (!uri) {
    throw new Error(".env 파일에 웹뷰 URL을 설정해 주세요");
  }

  return (
    <WebView
      ref={webviewRef}
      style={{
        width: "100%",
        height: "100%",
      }}
      source={{ uri }}
      onMessage={(e: WebViewMessageEvent) => {
        const {
          nativeEvent: { data },
        } = e;
        switch (data) {
          case "get-token":
            getToken();
            break;
        }
      }}
      domStorageEnabled
      javaScriptEnabled
      scrollEnabled
    />
  );
}
