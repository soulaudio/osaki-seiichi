import styles from "./home.module.css";
import Header from "../components/header";
import Footer from "../components/footer";
import BackgroundGradient from "../components/background-gradient";
import PromptScroll from "../components/prompt-scroll";
import SunkenCityContent from "../components/content/sunken-city";
import LostBookContent from "../components/content/lost-book";
import SunkenBookTransition from "../components/content/sunken-book-transition";

const Home = () => {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <BackgroundGradient
          sections={[
            {
              color: "#c2d1d6",
              height: "85vh",
              children: <SunkenCityContent />,
            },
            {
              color: "#91bd31",
              height: "100vh",
              children: <LostBookContent />,
            },
          ]}
          transitions={[
            { height: "40vh", children: <SunkenBookTransition />, offsetTop: "30%" },
          ]}
        ></BackgroundGradient>
      </main>
      <PromptScroll />
      <Footer />
    </div>
  );
};

export default Home;
