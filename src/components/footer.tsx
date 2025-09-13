import styles from "./footer.module.css";

const Footer: React.FC = () => {
  return (
    <div className={styles.container}>
      <h2 draggable={false} className={styles.nameJapanese}>
        大﨑 誠一
      </h2>
      <h1 draggable={false} className={styles.nameRomanji}>
        osaki seichii
      </h1>
    </div>
  );
};

export default Footer;
