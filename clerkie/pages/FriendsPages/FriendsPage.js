import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import FilterWindow from "../../components/FilterWindow";
import UserCard from "../../components/UserCard";
import styles from "./FriendsPage.module.css";
import { useState, useEffect } from "react";

export default function FriendsPage() {
  const [showFilterWindow, setShowFilterWindow] = useState(false);
  const [selectedOptions, setFilterOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const toggleFilterWindow = () => {
    setShowFilterWindow(!showFilterWindow);
  };

  function clearFilter() {
    setFilterOptions([]);
  }

  const [userData, setUserData] = useState([]);

  useEffect(() => {
    async function fetchUserData() {
      const response = await fetch("/users.json");
      const data = await response.json();
      setUserData(data);
    }

    fetchUserData();
  }, []);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 5000);
  }, []);

  return (
    <div className={styles.friendsPage}>
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
