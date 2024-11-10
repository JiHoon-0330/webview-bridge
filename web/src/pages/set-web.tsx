import TestDataLoading from "../components/TestDataLoading";
import { useSetWebCategories, useSetWebRandom } from "../lib/swr";

export default function SetWeb() {
  const categories = useSetWebCategories();
  const random = useSetWebRandom();

  return <TestDataLoading categories={categories} random={random} />;
}
