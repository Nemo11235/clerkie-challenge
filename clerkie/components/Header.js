import styles from "./Header.module.css";

// header component that contians a title
export default function Header(props) {
  return (
    <div className={styles.header}>
      <h1 className={styles.title}>{props.title}</h1>
    </div>
  );
}
