import styles from "./header.module.css";

const Header: React.FC = () => {
  return (
    <header className={styles.container}>
      <div className={styles.content}>
        <div draggable={false} className={styles.leftSection}>
          <a
            href="https://www.instagram.com/osaki_seiichi/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            <span className={styles.linkText}>instagram</span>
          </a>
          <a
            draggable={false}
            href="https://www.youtube.com/channel/UCgregZ1IIlk0mpyYCTv1Tkw/featured"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            <span className={styles.linkText}>youtube</span>
          </a>
          <a
            draggable={false}
            href="https://osakiseiichi.bandcamp.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            <span className={styles.linkText}>bandcamp</span>
          </a>
        </div>
        <div className={styles.rightSection}>
          <a
            draggable={false}
            href="https://distrokid.com/hyperfollow/osakiseiichi/in-the-footsteps-of-a-lost-book-hidden-in-the-jungle-temple"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            <span className={styles.linkText}>music</span>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
