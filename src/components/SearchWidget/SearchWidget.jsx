'use client';

import React from 'react';
import { useSearchContext } from '@/contexts/search_context';

const SearchWidget = () => {
  const { searchText, setSearchText } = useSearchContext();

  const handleSearchInput = (e) => {
    setSearchText(e.target.value); // Update searchText in the context
  };

  return (
    <input
      type="text"
      placeholder="Search"
      value={searchText}
      onChange={handleSearchInput}
      className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm mr-3 text-sm"
    />
  );
};

export default SearchWidget;
