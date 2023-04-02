import styles from "./Header.module.css";

const Header = (props) => {
  return (
    <div className={styles.header}>
      <h1 className={styles.title}>{props.title}</h1>
    </div>
  );
};

export default Header;
