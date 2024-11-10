import { SWRResponse } from "swr";
import { Category, Random } from "../lib/swr";

interface Props {
  categories: SWRResponse<Category, any, any>;
  random: SWRResponse<Random, any, any>;
}

export default function TestDataLoading({ categories, random }: Props) {
  return (
    <main>
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
