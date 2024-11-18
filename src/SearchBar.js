import React from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
  return (
  <div className="search-bar-container">
    <input
    type="text"
    placeholder="Hae konsulttia..."
    onChange={(e) => onSearch(e.target.value)}
    className="search-input"
  />
</div>
  );
}

export default SearchBar;