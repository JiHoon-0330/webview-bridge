class Token {
  private listener: Set<(token: string) => void> = new Set();

  async getToken() {
    const token = await this.getInAppToken();
    return token;
  }

  async getInAppToken() {
    return new Promise<string | null>((resolve) => {
      this.listener.add(resolve);

      window.getInAppToken = (token) => {
        this.listener.forEach((fn) => {
          fn(token);
          this.listener.delete(fn);
        });
      };

      setTimeout(() => {
        window.getInAppToken("token");
      }, 0);
    });
  }
}

export const setWebToken = new Token();
