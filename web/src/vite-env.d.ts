/// <reference types="vite/client" />

interface Window {
  ReactNativeWebView: {
    postMessage: (message: string) => void;
  };
  getInAppToken: (token: string) => void;
}
