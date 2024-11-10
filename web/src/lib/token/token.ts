class Token {
  private token: string | null = null;

  async getToken() {
    if (this.token) return this.token;

    const token = await this.getInAppToken();
    this.token = token;

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

export const token = new Token();
