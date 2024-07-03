import React from 'react';
import "./SpotCardsFilter.scss";
import filterOptions from "../../Data/FilterOptions";

const SpotCardsFilter = ({ filterSelected, onFilterSelect }) => {
  const selected = (value) => {
    return filterSelected.includes(value); // returns true if the filter is included in the selected filter list, otherwise false
  }

  const handleFilterSelect = (option) => {
    onFilterSelect((prevFilters) =>
      selected(option.value)
        ? prevFilters.filter((filter) => filter !== option.value) // if filter is selected, remove from selected filters
        : prevFilters.concat([option.value])); // if filter is not selected, add to selected filters
  };

  return (
    <div className="spot-filter-box">
      {filterOptions.map((option) => (
        <div
          key={option.label}
          className={selected(option.value) ? "spot-filter-box__item--selected" : "spot-filter-box__item"}
          onClick={() => handleFilterSelect(option)}
        >
          {option.icon}
          <span className="spot-filter-box__label">{option.label}</span>
        </div>
      ))}
    </div>
  )
}

export default SpotCardsFilter;