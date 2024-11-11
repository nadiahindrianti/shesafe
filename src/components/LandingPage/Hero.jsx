import { useSelector } from "react-redux";
import style from "../../assets/css/LandingPage.module.css";
import image from "../../assets/images/asset_login.png";
import { Link } from "react-router-dom";

function Hero() {
  const { isLoggedin, loading } = useSelector((state) => state.users);

  return (
    <>
      <div className={`${style["hero-section"]}`} id="hero-section">
        <div className={`${style["hero-title"]} mx-5 `}>
          <h4 className="text-xl mt-2">SheSafe: Aman dan Bersama Lebih Kuat</h4>
          <h6 className="font-bold mt-6">
            "Temukan tempat yang aman untuk berbagi, mendukung, dan berkembang.
            Bersama SheSafe, kamu tidak sendiri."
          </h6>
        </div>

        <div className={`${style["hero-desc"]}`}>
          <p>
            Aplikasi <b>SheSafe</b> hadir untuk mendukung perempuan Indonesia
            dalam menghadapi tantangan dan situasi sulit.
          </p>
          <p className="mt-2">
            Kami menyediakan ruang aman untuk berbagi cerita, mendokumentasikan
            pengalaman, dan mendapatkan dukungan dari komunitas yang peduli.
          </p>
        </div>

        <div className={`${style["hero-btn"]} mt-8`}>
          {!isLoggedin ? (
            <Link to="/regist" className="lg-btn-primary">
              Daftar Sekarang
            </Link>
          ) : (
            ""
          )}
        </div>

        <div className={`${style["hero-img"]} mt-5`}>
          <img className={`${style["img-1"]} img-fluid`} src={image} />
        </div>
      </div>
    </>
  );
}

export default Hero;
