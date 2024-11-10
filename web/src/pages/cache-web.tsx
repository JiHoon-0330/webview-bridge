import TestDataLoading from "../components/TestDataLoading";
import { useCacheWebCategories, useCacheWebRandom } from "../lib/swr";

export default function CacheWeb() {
  const categories = useCacheWebCategories();
  const random = useCacheWebRandom();

  return <TestDataLoading categories={categories} random={random} />;
}
