import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import styles from "./FriendsPage.module.css";

export default function FriendsPage() {
  return (
    <div className={styles.friendsPage}>
      <Sidebar />
      <div className={styles.rightContainer}>
        <Header title="Friends" />
        <div className={styles.dataContainer}>
          <button className="">
            <img src="/filter.svg" alt="filter-icon"></img>
          </button>
        </div>
      </div>
    </div>
  );
}
