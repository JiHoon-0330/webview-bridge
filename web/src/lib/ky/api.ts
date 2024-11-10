import ky, { Options } from "ky";
import { appToken, webToken } from "../token";

const genCreateOption = (getToken: () => Promise<string | null>): Options => ({
  prefixUrl: "/themealdb/",
  hooks: {
    beforeRequest: [
      async (req) => {
        await getToken();
        req.headers.set("content-type", "application/json");
        return req;
      },
    ],
  },
});

export const appKy = ky.create(genCreateOption(appToken.getToken));
export const webKy = ky.create(genCreateOption(webToken.getToken));
