import { useState } from 'react';
export const Searchbar = ({ handleValue }) => {
  const [searchedValue, setSearchedValue] = useState('');

  const handleSearchedValue = e => {
    e.preventDefault();
    handleValue(searchedValue);
    setSearchedValue('');
  };

  return (
    <header>
      <form onSubmit={handleSearchedValue}>
        <button type="submit">
          <span>Search</span>
        </button>
        <input
          value={searchedValue}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={e => setSearchedValue(e.target.value)}
        />
      </form>
    </header>
  );
}; //
