import { appKy, webKy } from "../ky";
import { useSWR } from "./swr";

export const useAppCategories = () => {
  return useSWR(appKy, "categories.php");
};

export const useAppRandom = () => {
  return useSWR(appKy, "random.php");
};

export const useWebCategories = () => {
  return useSWR(webKy, "categories.php");
};

export const useWebRandom = () => {
  return useSWR(webKy, "random.php");
};
