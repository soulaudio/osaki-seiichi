import BackIcon from "../../components/back-icon";
import styles from "./sunken-city-detail.module.css";
import { useNavigate } from "react-router-dom";

const SunkenCityDetail = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/");
  };
  return (
    <div className={styles.containerWrapper}>
      <div className={styles.container}>
        <div className={styles.fishBackground}>
          <div className={`${styles.fish} ${styles.fish1}`}>
            <img src="media/sunken-city-fish.png" alt="fish-1" />
          </div>
          <div className={`${styles.fish} ${styles.fish2}`}>
            <img src="media/sunken-city-fish.png" alt="fish-2" />
          </div>
          <div className={`${styles.fish} ${styles.fish3}`}>
            <img src="media/sunken-city-fish.png" alt="fish-3" />
          </div>
          <div className={`${styles.fish} ${styles.fish4}`}>
            <img src="media/sunken-city-fish.png" alt="fish-4" />
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.backContainer} onClick={handleBack}>
            <BackIcon />
          </div>
          <div className={styles.storyContainer}>
            <p>
              There is an ancient story surrounding this part of the island. The
              tale goes something like this. Once upon a time, in the middle of
              a burning sunny day, a boy wandered into the sea, not knowing what
              lies ahead. He was stumbling and couldn't walk straight, but
              somehow he knew where to continue. As the sunlight hit his eye,
              out of nowhere, a city appeared. He felt confused but wanted to
              explore this mysterious city. The ancient, sunlit alleyways made
              him dizzy and tired. He fell and hit his head.
            </p>
            <p>
              As soon as the boy woke up, sudden worry, anxiety and unease were
              upon him. He saw a silhouette but not a human one. He could hear
              eerie sounds in the distance and knew they were coming closer.
              Scared to the bone, he couldn't even catch his breath before
              snake-like creatures pointed a trident at his throat. They took
              him. Surrounded, he couldn't defend himself. They forced him to go
              with them, not knowing if he would survive.
            </p>
            <p>
              They approached a big gate. The Cathedral Of Secrets was in front
              of them. They let him in. The creatures talked for hours about the
              city and the story surrounding it. The boy realized he couldn't go
              back home, and he had to stay and become one of them. As this
              realization came to him, he tried to break free. Rushing, he
              managed to leave the Cathedral Of Secrets, having creatures right
              behind his back. He dashed from the tridents, fighting for his
              life. He made several turns through the alleyways as creatures
              screamed at him. The boy managed to lose them. Thinking it was
              over, he felt relief. But then suddenly…
            </p>
            <div className={styles.albumTitleContainer}>
              <h1 className={styles.albumTitle}>
                水底に眠る 忘れられし街の物語
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.overlayContainer}>
        <div className={styles.pillarContainer}>
          <img
            className={styles.pillar}
            src="media/sunken-city-pillar.png"
            alt="pillar"
          />
          <img
            className={styles.alga}
            src="media/sunken-city-alga.png"
            alt="alga"
          />
        </div>
      </div>
    </div>
  );
};

export default SunkenCityDetail;
