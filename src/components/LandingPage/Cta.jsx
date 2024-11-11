import { useSelector } from "react-redux";
import style from "../../assets/css/LandingPage.module.css";
import logo from "../../assets/images/lg_ss.png";
import { Link } from "react-router-dom";

function Cta() {
  const { isLoggedin, loading } = useSelector((state) => state.users);

  return (
    <>
      <div className={`${style["contact-section"]}`} id="contact-section">
        <div className={`${style["contact-content"]}`}>
          <div className={`${style.image}`}>
            <img className="img-fluid" src={logo} alt="" width="30%" />
          </div>
          <div className={`${style.description} my-4`}>
            <h4>Mulai Sekarang Bergabunglah Bersama Kami</h4>
            <p>
              Daftar sekarang untuk memulai perjalanan Anda menuju keadilan dan
              dukungan
            </p>
          </div>
          {!isLoggedin ? (
            <Link to="/regist" className="lg-btn-secondary">
              Daftar Sekarang
            </Link>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}

export default Cta;
