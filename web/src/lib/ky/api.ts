import ky, { Options } from "ky";
import { appToken, cacheWebToken, setWebToken, webToken } from "../token";

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
export const setWebKy = ky.create(genCreateOption(setWebToken));
export const cacheWebKy = ky.create(genCreateOption(cacheWebToken));
