import "./App.css";
import { useCategories, useRandom } from "./lib/swr/api";

function App() {
  // 나중에 불러온 데이터만 화면에 표시됨
  const categories = useCategories();
  const random = useRandom();

  return (
    <main className="main">
      <button
        onClick={() => {
          window.ReactNativeWebView.postMessage("test");
        }}
      >
        클릭
      </button>
      <div>test</div>

      {/* 데이터 로딩 표시 */}
      <div>
        categories: {JSON.stringify({ isLoading: categories.isLoading })}
      </div>
      <div>random: {JSON.stringify({ isLoading: random.isLoading })}</div>

      {/* 데이터 표시 */}
      <div>{random.data?.meals[0].strCategory}</div>
      <ul>
        {categories.data?.categories.map(({ strCategory }) => (
          <li key={strCategory}>{strCategory}</li>
        ))}
      </ul>
    </main>
  );
}

export default App;
