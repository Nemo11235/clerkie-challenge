import styles from "./Sidebar.module.css";
import Link from "next/Link";
import { useRouter } from "next/router";

function Sidebar() {
  const router = useRouter();

  return (
    <div className={styles.sidebar}>
      <div className={styles.clerkieTab}>
        <img src="/clerkie-logo.png" alt="Logo 1" />
        <span>Clerkie Challenge</span>
      </div>
      <div className={router.pathname === "/" ? styles.activeTab : styles.tab}>
        <Link className={styles.link} href="/">
          <img src="/home-icon.png" alt="Logo 2" />
          <span>Home</span>
        </Link>
      </div>
      <div
        className={
          router.pathname === "/FriendsPages/FriendsPage"
            ? styles.activeTab
            : styles.tab
        }
      >
        <Link className={styles.link} href="/FriendsPages/FriendsPage">
          <img src="/friends-icon.png" alt="Logo 3" />
          <span>Friends</span>
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
