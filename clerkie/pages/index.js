import Head from "next/head";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import styles from "./index.module.css";

export default function Home() {
  return (
    <div className={styles.home}>
      <Head>
        <title>Home</title>
      </Head>

      <Sidebar />
      <div className={styles.rightContainer}>
        <Header title="Home" />

        <div className={styles.welcomeMsgContainer}>
          <h1 className={styles.welcomeMsg}>
            Welcome to the Clerkie Challenge!
          </h1>
        </div>
      </div>
    </div>
  );
}
