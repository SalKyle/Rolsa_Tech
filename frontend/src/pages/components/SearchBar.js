import { useState } from "react";
import { Search } from "lucide-react";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter") onSearch(query);
  };

  return (
    <div className="ev-search-wrapper">
      <input
        className="ev-search-input"
        type="text"
        placeholder="Search city or postcode..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button className="ev-search-button" onClick={() => onSearch(query)}>
        <Search className="search-icon" />
      </button>
    </div>
  );
}
