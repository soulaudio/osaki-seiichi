import { Link } from "react-router-dom";
import Cover from "./cover";
import styles from "./sunken-city.module.css";

const SunkenCityContent: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.coverContainer}>
        <div className={styles.coverWrapper}>
          <Cover
            srcSmall="media/sunken-city-cover-250x250.png"
            src="media/sunken-city-cover.png"
            alt="The tale of a long forgotten sunken city"
          />
        </div>
      </div>
      <div className={styles.creatureContainer}>
        <Link to={"sunken-city"} className={styles.creatureWrapper}>
          <img
            className={styles.creature}
            src="media/sunken-city-creature-small.png"
            alt="Creature"
            draggable="false"
          />
        </Link>
      </div>
      <div className={styles.eerieTextContainer}>
        <span className={styles.eerieText}>
          strange noises coming from the city
          <br />~ they were so frightening, yet so intriguing
        </span>
      </div>
    </div>
  );
};

export default SunkenCityContent;
