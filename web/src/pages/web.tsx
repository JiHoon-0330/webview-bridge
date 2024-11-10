import TestDataLoading from "../components/TestDataLoading";
import { useWebCategories, useWebRandom } from "../lib/swr/api";

export default function Web() {
  // 나중에 불러온 데이터만 화면에 표시됨
  const categories = useWebCategories();
  const random = useWebRandom();

  return <TestDataLoading categories={categories} random={random} />;
}
