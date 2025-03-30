import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  return (
    <div className="flex gap-2">
      <input
        className="border p-2 rounded w-full"
        type="text"
        placeholder="Search city or postcode..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={() => onSearch(query)}
      >
        Search
      </button>
    </div>
  );
}
