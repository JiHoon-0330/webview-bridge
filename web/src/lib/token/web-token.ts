class Token {
  async getToken() {
    console.log("(1) token");
    const token = await this.getInAppToken();
    console.log("(2) token");
    return token;
  }

  async getInAppToken() {
    console.log("(3) token");
    return new Promise<string | null>((resolve) => {
      window.getInAppToken = (token) => {
        console.log("(4) token");
        resolve(token);
      };

      setTimeout(() => {
        console.log("(5) token");
        window.getInAppToken("token");
      }, 0);
    });
  }
}

export const webToken = new Token();
