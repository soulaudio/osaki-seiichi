import { Link } from "react-router-dom";
import Cover from "./cover";
import styles from "./lost-book.module.css";

const LostBookContent: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.coverContainer}>
        <div className={styles.coverWrapper}>
          <Cover
            srcSmall="media/lost-book-cover-250x250.png"
            src="media/lost-book-cover.png"
            alt="In the footsteps of a lost book hidden in the jungle temple"
          />
        </div>
      </div>
      <div className={styles.tigerLayoutContainer}>
        <div className={styles.tigerContainer}>
          <Link to={"lost-book"}>
            <div className={styles.tigerWrapper}>
              <img
                className={styles.tiger}
                src="media/lost-book-tiger.png"
                alt="tiger"
              />
            </div>
          </Link>
        </div>
      </div>
      
      <div className={styles.eerieTextContainer}>
        <span className={styles.eerieText}>
          entangled in liana vines, humid air
          <br />&nbsp; ~ scorching sun, venturing in the footsteps of a lost someone
        </span>
      </div>
    </div>
  );
};

export default LostBookContent;
