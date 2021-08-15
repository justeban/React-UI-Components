import React from 'react';

export default function SearchFieldOptions ({
  config,
  expandOptions,
  handleOptionOnChange,

}) {
  const show = expandOptions;
  return (
    <ul className={show ? 'show': 'hide'}>
      <li>
        <label htmlFor="searchLimit" >Search Limit: </label>
        <input
          onChange={handleOptionOnChange}
          max="99"
          min="3"
          name="searchLimit"
          type="number"
          value={config.searchLimit}
          disabled={!show}
        />
      </li>
    </ul>
  );
}