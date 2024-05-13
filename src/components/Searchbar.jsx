import { useState } from 'react';
import '../index.css';

export const Searchbar = ({ handleValue }) => {
  const [searchedValue, setSearchedValue] = useState('');

  const handleSearchedValue = e => {
    e.preventDefault();
    handleValue(searchedValue);
    setSearchedValue('');
  };

  return (
    <header className="header">
      <form onSubmit={handleSearchedValue} className="form">
        <button type="submit" className="button">
          <span className="submit-span">Search</span>
        </button>
        <input
          className="input"
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
