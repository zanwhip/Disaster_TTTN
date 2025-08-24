"use client";
import React, { useState } from "react";

function SearchBar() {
  const [search, setSearch] = useState("");

  return (
    <div className="flex w-full max-w-2xl border border-gray-200 bg-white rounded-full overflow-hidden">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="flex-1 px-4 py-2 text-gray-700 outline-none"
      />
      <button
        className="flex bg-primary m-1 text-white px-6 py-2 font-semibold hover:bg-orange-600 rounded-full"
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;
