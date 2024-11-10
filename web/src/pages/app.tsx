import TestDataLoading from "../components/TestDataLoading";
import { useAppCategories, useAppRandom } from "../lib/swr/api";

export default function App() {
  // 나중에 불러온 데이터만 화면에 표시됨
  const categories = useAppCategories();
  const random = useAppRandom();

  return <TestDataLoading categories={categories} random={random} />;
}
