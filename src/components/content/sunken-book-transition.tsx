import styles from "./sunken-book-transition.module.css";

const SunkenBookTransition: React.FC = () => {
  return (
    <div className={styles.transitionTextContainer}>
      <span className={styles.transitionText}>
        They approached a big gate.
        The Cathedral Of Secrets was in front of them.
        They let him in. The creatures talked
        for hours about the city and the story surrounding it.
        The boy realized he couldn't go back home,
        and he had to stay and become one of them.
        As this realization came to him, he tried to break free.
        Rushing, he managed to leave the Cathedral Of Secrets,
        having creatures right behind his back.
        He dashed from the tridents, fighting for his life.
        He made several turns through the alleyways 
        as creatures screamed at him.
        The boy managed to lose them.
        Thinking it was over, he felt relief.
        &nbsp;<b>But then suddenly…</b>
        <br />
        <br />
        ... he noticed pain in his legs and that there were scales all over his body. 
        His feet turned into fins - he knew that he would soon become one of the creatures. 
        The boy anxiously rushed towards the shore. 
        As his head peaked above the water he gasped for air but could not breathe. 
        He returned under the water and started to engrave a message into a stone which was the closest to shore. 
        After he was done, he <span className={`${styles.redactedText} ${styles.markerStart} ${styles.redactedFlow1}`}>some things are not meant to be seen</span> <span className={`${styles.redactedText} ${styles.redactedFlow2}`}>look away</span> <span className={`${styles.redactedText} ${styles.markerEnd} ${styles.redactedFlow3}`}>before you learn things you shouldn't</span>.
        <br />
        <br />
        No one knows where he is now; he might have returned to the strange creatures. 
        While countless stories could connect to the sunken city, 
        this is the one that carries it forward ~ 
        After an old friend of the lost boy discovered the message near the shore, 
        he chose to follow the almost ineligible writing. 
      </span>
    </div>
  );
};

export default SunkenBookTransition;
