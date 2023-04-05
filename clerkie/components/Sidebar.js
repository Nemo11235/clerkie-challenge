import styles from "./Sidebar.module.css";
import Link from "next/link";
import { useRouter } from "next/router";

// side menu to navigate to different pages
export default function Sidebar() {
  const router = useRouter();

  return (
    <div className={styles.sidebar}>
      <div className={styles.clerkieTab}>
        <img src="/clerkie-logo.png" alt="clerkie logo" />
        <span>Clerkie Challenge</span>
      </div>
      <div className={router.pathname === "/" ? styles.activeTab : styles.tab}>
        <Link className={styles.link} href="/">
          <img src="/home-icon.png" alt="home logo" />
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
          <img src="/friends-icon.png" alt="friends logo" />
          <span>Friends</span>
        </Link>
      </div>
    </div>
  );
}
