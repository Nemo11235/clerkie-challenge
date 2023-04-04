import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header";
import { useRouter } from "next/router";
import styles from "./UserPage.module.css";

export default function UserPage() {
  const router = useRouter();
  const props = router.query;

  return (
    <div className={styles.root}>
      <Sidebar />
      <div className={styles.rightContainer}>
        <Header title="Detail Information" />
        <div className={styles.dataContainer}>
          <div className={styles.infoContainer}>
            <div className={styles.portraitContainer}>
              <div className={styles.portraitFrame}></div>
            </div>
            <div className={styles.detailBox}>
              <div className={styles.detailContainer}>
                <h1 className={styles.infoType}>Name </h1>{" "}
                <span className={styles.infoName}>{props.name}</span>
                <h1 className={styles.infoType}>Relationship</h1>{" "}
                {props.relationship == "Super Close Friends" && (
                  <span className={styles.superCloseFriendTag}>
                    {props.relationship}
                  </span>
                )}
                {props.relationship == "Close Friends" && (
                  <span className={styles.closeFriendTag}>
                    {props.relationship}
                  </span>
                )}
                {props.relationship == "None" && (
                  <span className={styles.regularFriendTag}>
                    Regular Friend
                  </span>
                )}
                <h1 className={styles.infoType}>Email</h1>{" "}
                <span className={styles.info}>{props.email}</span>
                <h1 className={styles.infoType}>Phone Number</h1>
                <span className={styles.info}>{props.phone}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h1></h1>
    </div>
  );
}
