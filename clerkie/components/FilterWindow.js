import { useState } from "react";
import styles from "./FilterWindow.module.css";

const FilterWindow = ({
  setFilterOptions,
  selectedOptions: initialSelectedOptions,
  toggleFilterWindow,
}) => {
  const [selectedOptions, setSelectedOptions] = useState(
    initialSelectedOptions
  );

  const categories = ["Close Friends", "Super Close Friends"];

  function toggleOption(option) {
    const isSelected = selectedOptions.includes(option);
    if (isSelected) {
      setSelectedOptions(
        selectedOptions.filter((selectedOption) => selectedOption !== option)
      );
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  }

  function applyFiltersAndClose() {
    setFilterOptions(selectedOptions);
    toggleFilterWindow();
  }

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
      {categories.map((category) => (
        <label className={styles.filterOption} key={category}>
          <span className={styles.filterOptionText}>{category}</span>
          <input
            className={styles.filterCheckbox}
            type="checkbox"
            checked={selectedOptions.includes(category)}
            onChange={() => toggleOption(category)}
          />
        </label>
      ))}

      <button className={styles.btnApply} onClick={applyFiltersAndClose}>
        Apply
      </button>
    </div>
  );
};

export default FilterWindow;
