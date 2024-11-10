class Token {
  private tokenCache: Promise<string | null> | null = null;

  async getToken() {
    this.tokenCache ??= this.getInAppToken();
    const token = await this.tokenCache;
    this.tokenCache = null;

    return token;
  }

  async getInAppToken() {
    return new Promise<string | null>((resolve) => {
      window.getInAppToken = (token) => {
        resolve(token);
      };

      setTimeout(() => {
        window.getInAppToken("token");
      }, 0);
    });
  }
}

export const cacheWebToken = new Token();
