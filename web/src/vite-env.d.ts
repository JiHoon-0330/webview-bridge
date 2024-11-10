/// <reference types="vite/client" />

interface Window {
  ReactNativeWebview: {
    postMessage: (message: string) => void;
  };
}
