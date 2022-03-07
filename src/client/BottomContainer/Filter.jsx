import React, { useState, useContext } from 'react';
import { FilterContext } from '../Context/context';
import roleMap from '../roleMap';

function Filter() {
  const [displayFilter, setDisplayFilter] = useState(false);
  // NOTE: FilterContext has two elements [filters, setFilter] so we want the setFilter
  const setFilters = useContext(FilterContext)[1];

  const options = Object.keys(roleMap).map((num) => <option key={`roleFilter${num}`} value={num}>{roleMap[num]}</option>);

  // This adds an option to remove the filter
  options.unshift(<option key={`roleFilter${0}`} value={0}>None</option>);

  const handleSelect = (e) => {
    setFilters((filters) => ({
      role_id: e.target.value,
      responded: filters.responded,
      interviewed: filters.interviewed,
      offered: filters.offered,
    }));
  };

  const dropDown = (
    <select onChange={(e) => handleSelect(e)}>
      {options}
    </select>
  );

  return (
    <>
      <div className="bg-gradient-to-t from-bc1 to-bc2 text-white font-bold py-2 px-4 w-2/5 rounded" onClick={() => setDisplayFilter(!displayFilter)}>filter by role</div>
      {displayFilter
        ? <form>{dropDown}</form>
        : null}
    </>
  );
}

export default Filter;
