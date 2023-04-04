import styles from "./UserCard.module.css";

function UserCard({ isLoading, name, relationship, email, phone }) {
  return isLoading ? (
    <div className={styles.userCard}>
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
    <div className={styles.userCard}>
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
  );
}

export default UserCard;
