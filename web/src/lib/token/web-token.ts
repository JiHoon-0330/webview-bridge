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

      setTimeout(() => {
        window.getInAppToken("token");
      }, 0);
    });
  }
}

export const webToken = new Token();
