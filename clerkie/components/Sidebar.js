import styles from "./Sidebar.module.css";

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <div className={styles.clerkieTab}>
        <img src="/clerkie-logo.png" alt="Logo 1" />
        <span>Clerkie Challenge</span>
      </div>
      <div className={styles.tab}>
        <img src="/home-icon.png" alt="Logo 2" />
        <span>Home</span>
      </div>
      <div className={styles.tab}>
        <img src="/friends-icon.png" alt="Logo 3" />
        <span>Friends</span>
      </div>
    </div>
  );
}

export default Sidebar;
