import { KyInstance } from "ky";
import useBaseSWR from "swr";
import { Category, Random } from "./api.type";

type Pathname = {
  "categories.php": Category;
  "random.php": Random;
};

export const useSWR = <P extends keyof Pathname>(
  ky: KyInstance,
  pathname: P,
) => {
  return useBaseSWR([ky.name, pathname], async () => {
    const resp = await ky.get(pathname);
    const result = await resp.json<Pathname[P]>();
    return result;
  });
};
