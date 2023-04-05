import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import FilterWindow from "../../components/FilterWindow";
import UserCard from "../../components/UserCard";
import styles from "./FriendsPage.module.css";
import Head from "next/head";
import { useState, useEffect } from "react";

export default function FriendsPage() {
  // determin showing the filter window or not
  const [showFilterWindow, setShowFilterWindow] = useState(false);
  // selected filter options
  const [selectedOptions, setFilterOptions] = useState([]);
  // flag that data are loaded or not
  const [isLoading, setIsLoading] = useState(true);
  // user data from .json file
  const [userData, setUserData] = useState([]);

  // open/close filter window
  const toggleFilterWindow = () => {
    setShowFilterWindow(!showFilterWindow);
  };

  // remove all filter options
  function clearFilter() {
    setFilterOptions([]);
  }

  // refresh the page after loading user info
  useEffect(() => {
    async function fetchUserData() {
      const response = await fetch("/users.json");
      const data = await response.json();
      setUserData(data);
    }

    fetchUserData();
  }, []);

  // set a delay to show the loading animation of UserCard
  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

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
              className={styles.filterBtn}
              onClick={toggleFilterWindow}
              style={
                selectedOptions.length || showFilterWindow
                  ? { backgroundColor: "#424242" }
                  : {}
              }
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
          </div>
          {showFilterWindow && (
            <div className={styles.filterWindow}>
              <FilterWindow
                selectedOptions={selectedOptions}
                setFilterOptions={setFilterOptions}
                toggleFilterWindow={toggleFilterWindow}
                clearFilter={clearFilter}
              />
            </div>
          )}
          {selectedOptions == 0 &&
            userData.map((user) => (
              <UserCard
                isLoading={isLoading}
                name={user.name}
                relationship={user.relationship}
                email={user.email}
                phone={user.phoneNumber}
              />
            ))}
          {userData
            .filter((user) => selectedOptions.includes(user.relationship))
            .map((user) => (
              <UserCard
                isLoading={isLoading}
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
