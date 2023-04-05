import { useState } from "react";
import styles from "./FilterWindow.module.css";

// pop up filter window when user clicks on the filter button on Friends Page
const FilterWindow = ({
  setFilterOptions,
  selectedOptions: initialSelectedOptions,
  toggleFilterWindow,
}) => {
  // array that holds all selected filter options
  const [selectedOptions, setSelectedOptions] = useState(
    initialSelectedOptions
  );

  // 2 filter options
  const categories = ["Close Friends", "Super Close Friends"];

  // update the selected option when user click on the checkbox
  function toggleOption(option) {
    const isSelected = selectedOptions.includes(option);
    // if the option is already selected, remove it
    if (isSelected) {
      setSelectedOptions(
        selectedOptions.filter((selectedOption) => selectedOption !== option)
      );
      // otherwise, add it to the selected options
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  }

  // update the selected option array and close filter window
  function applyFiltersAndClose() {
    setFilterOptions(selectedOptions);
    toggleFilterWindow();
  }

  // remove all selected option, for clear all button
  function clearFilter() {
    setSelectedOptions([]);
  }

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <span
          className={
            selectedOptions.length ? styles.clearAllActive : styles.clearAll
          }
          onClick={clearFilter}
        >
          Clear all
        </span>
        <span className={styles.title}>Filter</span>
        <img
          onClick={toggleFilterWindow}
          src="../cross.png"
          alt="cross icon"
        ></img>
      </div>
      <div className={styles.divider}></div>
      <h2 className={styles.friendStatus}>Friend Status</h2>
      <div className={styles.filterOption}>
        <span className={styles.filterOptionText}>{categories[0]}</span>
        <input
          id="cb0"
          className={styles.filterCheckbox}
          type="checkbox"
          checked={selectedOptions.includes(categories[0])}
          onChange={() => toggleOption(categories[0])}
        ></input>
        <label for="cb0"></label>
      </div>
      <div className={styles.filterOption}>
        <span className={styles.filterOptionText}>{categories[1]}</span>
        <input
          id="cb1"
          className={styles.filterCheckbox}
          type="checkbox"
          checked={selectedOptions.includes(categories[1])}
          onChange={() => toggleOption(categories[1])}
        ></input>
        <label for="cb1"></label>
      </div>

      <button className={styles.btnApply} onClick={applyFiltersAndClose}>
        Apply
      </button>
    </div>
  );
};

export default FilterWindow;
