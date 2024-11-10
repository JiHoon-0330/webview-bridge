import { appKy, cacheWebKy, setWebKy, webKy } from "../ky";
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

export const useSetWebCategories = () => {
  return useSWR(setWebKy, "categories.php");
};

export const useSetWebRandom = () => {
  return useSWR(setWebKy, "random.php");
};

export const useCacheWebCategories = () => {
  return useSWR(cacheWebKy, "categories.php");
};

export const useCacheWebRandom = () => {
  return useSWR(cacheWebKy, "random.php");
};
