import ky, { Options } from "ky";
import { appToken, webToken } from "../token";

const genCreateOption = (token: {
  getToken: () => Promise<string | null>;
}): Options => ({
  prefixUrl: "/themealdb/",
  hooks: {
    beforeRequest: [
      async (req) => {
        await token.getToken();
        req.headers.set("content-type", "application/json");
        return req;
      },
    ],
  },
});

export const appKy = ky.create(genCreateOption(appToken));
export const webKy = ky.create(genCreateOption(webToken));
