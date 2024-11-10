import ky from "ky";
import { token } from "../token";

export const testKy = ky.create({
  // prefixUrl: "https://www.themealdb.com/api/json/v1/1/",
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
