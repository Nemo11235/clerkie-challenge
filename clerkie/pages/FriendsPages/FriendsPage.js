import { useState, useEffect } from "react";
import Head from "next/head";

import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import FilterWindow from "../../components/FilterWindow";
import UserCard from "../../components/UserCard";
import data from "../../public/users.json";
import styles from "./FriendsPage.module.css";

export default function FriendsPage() {
  // for UserCard
  const [userData, setUserData] = useState([]); // user data from .json file

  // for filter
  const [showFilterWindow, setShowFilterWindow] = useState(false); // determin showing the filter window or not
  const [selectedOptions, setFilterOptions] = useState([]); // selected filter options

  // for loading
  const loadAmount = 10; // amount of users for each load
  const [visibleItems, setVisibleItems] = useState(loadAmount); // amount of useres display on the screen
  const [hasMoreItem, setHasMoreItem] = useState(true); // flag, signify if all data is loaded
  const [loadedItemAmount, setLoadedItemAmount] = useState(0); // amount of data that is loaded
  const [loadedFirstBatch, setLoadedFirstBatch] = useState(false); // flag that forces the first 10 items load for 1 second for demo purpose
  const [searchInput, setSearchInput] = useState(""); // user's input for search

  // open/close filter window
  const toggleFilterWindow = () => {
    setShowFilterWindow(!showFilterWindow);
  };

  // remove all filter options
  function clearFilter() {
    setFilterOptions([]);
  }

  // keep userData up to date
  useEffect(() => {
    setUserData(data);
  }, []);

  // update the page when user scrolls to the bottom
  function handleScroll() {
    const scrollPosition = window.innerHeight + window.pageYOffset;
    const bodyHeight = document.body.offsetHeight;
    if (scrollPosition >= bodyHeight && hasMoreItem) {
      if (visibleItems >= userData.length) {
        setHasMoreItem(false);
      }
      loadMoreItems();
    }
  }

  // load 10 more items onto the screen
  function loadMoreItems() {
    setVisibleItems((prev) => prev + loadAmount);
    setTimeout(() => setLoadedItemAmount((prev) => prev + loadAmount), 1000);
  }

  // keeps track of window scrolling event
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // load the first 10 items for 1 second for demonstration
  if (!loadedFirstBatch) {
    setLoadedFirstBatch(true);
    setTimeout(() => setLoadedItemAmount(loadAmount), 1000);
  }
  function shouldDisplay(user) {
    // if filter option is empty, check for the search box
    if (selectedOptions.length === 0) {
      if (searchInput == "") {
        return true;
      } else {
        return user.name.toLowerCase().includes(searchInput.toLowerCase());
      }
      // if filter option is not empty, display what matches the filter option
    } else {
      if (searchInput == "") {
        return selectedOptions.includes(user.relationship);
      } else {
        return (
          selectedOptions.includes(user.relationship) &&
          user.name.toLowerCase().includes(searchInput.toLowerCase())
        );
      }
    }
    return true;
  }

  function inputOnChange(e) {
    setSearchInput(e.target.value);
    setVisibleItems(loadAmount);
    setHasMoreItem(true);
    setLoadedItemAmount(0);
    setLoadedFirstBatch(false);
    setLoadedFirstBatch(false);
    setTimeout(() => setLoadedItemAmount(loadAmount), 1000);
  }

  return (
    <div className={styles.friendsPage}>
      <Head>
        <title>Friends</title>
      </Head>
      <Sidebar />
      <div className={styles.rightContainer}>
        <Header title="Friends" />
        <div className={styles.dataContainer}>
          <div className={styles.filterContainer}>
            <button
              className={
                selectedOptions.length || showFilterWindow
                  ? styles.filterBtnActive
                  : styles.filterBtn
              }
              onClick={toggleFilterWindow}
            >
              <img
                src={
                  selectedOptions.length || showFilterWindow
                    ? "/whiteFilter.svg"
                    : "/filter.svg"
                }
                alt="filter-icon"
              ></img>
              {selectedOptions.length != 0 && (
                <span className={styles.filterCount}>
                  {selectedOptions.length ? `${selectedOptions.length}` : ""}
                </span>
              )}
            </button>
            <div className={styles.verticalLine}></div>
            <button
              className={
                selectedOptions.length
                  ? styles.clearAllActive
                  : styles.clearAllBtn
              }
              onClick={clearFilter}
            >
              Clear all
            </button>
            <div className={styles.searchContainer}>
              <img
                src="/magglass.png"
                alt="mag glass icon"
                className={styles.magglassIcon}
              ></img>
              <input
                type="text"
                className={styles.search}
                placeholder="Search"
                onChange={(e) => inputOnChange(e)}
              ></input>
            </div>
          </div>
          {showFilterWindow && (
            <div className={styles.filterWindow}>
              <FilterWindow
                initialSelectedOptions={selectedOptions}
                setFilterOptions={setFilterOptions}
                toggleFilterWindow={toggleFilterWindow}
                clearFilter={clearFilter}
              />
            </div>
          )}
          {userData
            .filter((user) => {
              return shouldDisplay(user);
            })
            .slice(0, visibleItems)
            .map((user, index) => (
              <UserCard
                key={index}
                isLoading={index >= loadedItemAmount}
                name={user.name}
                relationship={user.relationship}
                email={user.email}
                phone={user.phoneNumber}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
