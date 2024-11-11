import Navigation from "../components/Navigation";
import style from "../assets/css/LandingPage.module.css";
import Hero from "../components/LandingPage/Hero";
import Guide from "../components/LandingPage/Guide";
import Benefits from "../components/LandingPage/Benefits";
import Cta from "../components/LandingPage/Cta";
import Footer from "../components/Footer";
import { Navigate } from "react-router-dom";

function LandingPage() {
  return (
    <>
      {localStorage.getItem("isLoggedin") !== "true" ? (
        <div className={`${style["welcome-content"]} wrapper-mobile`}>
          <Navigation />
          <Hero />
          <Guide />
          <Benefits />
          <Cta />
          <Footer />
        </div>
      ) : (
        <Navigate to="/home"></Navigate>
      )}
    </>
  );
}

export default LandingPage;
