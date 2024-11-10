class Token {
  async getToken() {
    const token = await this.getInAppToken();

    return token;
  }

  async getInAppToken() {
    return new Promise<string | null>((resolve) => {
      window.getInAppToken = (token) => {
        resolve(token);
      };

      window.ReactNativeWebView.postMessage("get-token");
    });
  }
}

export const appToken = new Token();
