import Link from "next/link";

import styles from "./UserCard.module.css";

// component that shows a user's information on Friends Page
export default function UserCard({
  isLoading,
  name,
  relationship,
  email,
  phone,
}) {
  return isLoading ? (
    // loading version when the data are not loaded yet
    <div className={styles.userCardLoading}>
      <div className={styles.loadingFirstRow}>
        <div className={styles.loadingFirstLeft}></div>
        <div className={styles.loadingFirstRight}></div>
      </div>
      <div className={styles.loadingSecondRow}>
        <div className={styles.loadingSecondLeft}></div>
        <div className={styles.loadingSecondRight}></div>
      </div>
    </div>
  ) : (
    // loaded version when data finished loading
    <Link
      className={styles.link}
      href={{
        pathname: "/FriendsPages/UserPage/UserPage",
        query: {
          name: name,
          relationship: relationship,
          email: email,
          phone: phone,
        },
      }}
      as={"/FriendsPages/UserPage/UserPage/user"}
    >
      <div className={styles.userCardLoaded}>
        <div className={styles.firstLine}>
          <span className={styles.name}>{name}</span>
          {relationship == "Close Friends" && (
            <span className={styles.closeFriendTag}>{relationship}</span>
          )}
          {relationship == "Super Close Friends" && (
            <span className={styles.superCloseFriendTag}>{relationship}</span>
          )}
        </div>
        <div className={styles.secondLine}>
          <span>{email}</span>
          <span>
            <img src="../dot.png" alt="dot"></img>
          </span>
          <span>{phone}</span>
        </div>
      </div>
    </Link>
  );
}
