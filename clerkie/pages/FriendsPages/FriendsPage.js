import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import styles from "./FriendsPage.module.css";
import { useState } from "react";
import FilterWindow from "../../components/FilterWindow";

export default function FriendsPage() {
  const [showFilterWindow, setShowFilterWindow] = useState(false);
  const [filterOptions, setFilterOptions] = useState([]);

  const toggleFilterWindow = () => {
    setShowFilterWindow(!showFilterWindow);
  };

  const applyFilters = (selectedOptions) => {
    setFilterOptions(selectedOptions);
    toggleFilterWindow();
  };

  function handleOptionSelect(option) {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  }

  function clearFilter() {
    setFilterOptions([]);
  }
  return (
    <div className={styles.friendsPage}>
      <Sidebar />
      <div className={styles.rightContainer}>
        <Header title="Friends" />
        <div className={styles.dataContainer}>
          <div className={styles.btnContainer}>
            <button
              className={styles.filterBtn}
              onClick={toggleFilterWindow}
              style={
                filterOptions.length || showFilterWindow
                  ? { backgroundColor: "#424242" }
                  : {}
              }
            >
              <img
                src={
                  filterOptions.length || showFilterWindow
                    ? "/whiteFilter.svg"
                    : "/filter.svg"
                }
                alt="filter-icon"
              ></img>
              {filterOptions.length != 0 && (
                <span className={styles.filterCount}>
                  {filterOptions.length ? `${filterOptions.length}` : ""}
                </span>
              )}
            </button>
            <div className={styles.verticalLine}></div>
            <button
              className={
                filterOptions.length
                  ? styles.clearAllActive
                  : styles.clearAllBtn
              }
              onClick={clearFilter}
            >
              Clear all
            </button>
            {showFilterWindow && (
              <FilterWindow
                selectedOptions={filterOptions}
                onClose={toggleFilterWindow}
                onOptionSelect={handleOptionSelect}
                applyFilters={setFilterOptions}
                toggleFilterWindow={toggleFilterWindow}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
