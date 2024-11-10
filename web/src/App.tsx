import "./App.css";
import { useCategories, useRandom } from "./lib/swr/api";

function App() {
  const categories = useCategories();
  const random = useRandom();

  return (
    <main className="main">
      <button
        onClick={() => {
          window.ReactNativeWebview.postMessage("test");
        }}
      >
        클릭
      </button>
      <div>test</div>
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
