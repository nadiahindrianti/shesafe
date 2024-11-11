import { Link, Navigate, useNavigate } from "react-router-dom";
import logo from "../../assets/images/lg_ss.png";
import image from "../../assets/images/asset_login.png";
import style from "../../assets/css/LoginRegist.module.css";
import Navigation from "../Navigation";
import { login } from "../../features/userSlice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2"; // Import SweetAlert2

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedin, loading, error } = useSelector((state) => state.users);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await dispatch(login({ email, password }));

    if (result.meta.requestStatus === "fulfilled") {
      navigate("/home");
    } else {
      const errorMessage =
        result.payload?.message ||
        "Email atau password yang Anda masukkan salah.";

      if (errorMessage === "Akun Anda belum tervalidasi identitasnya") {
        Swal.fire({
          icon: "error",
          title: "Login Gagal",
          text: "Identitas anda belum tervalidasi",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Login Gagal",
          text: errorMessage,
        });
      }
    }
  };

  // Redirect jika pengguna sudah login
  if (isLoggedin) {
    return <Navigate to="/home" />;
  }

  return (
    <div className="wrapper-mobile">
      <div className="container mx-auto flex justify-center items-center min-h-screen p-4">
        <div className="w-full max-w-lg">
          <Navigation />
          <div className="flex justify-center mb-6 mt-36">
            <img src={logo} alt="Logo" className="w-32" />
          </div>
          <div className="text-center mb-6">
            <h1 className={`${style["h1"]} text-2xl font-bold`}>Masuk Akun</h1>
            <p className={`${style["p"]} mt-3 mb-3`}>
              Ruang Aman untuk Pemberdayaan dan Keadilan Perempuan
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-2"></label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`${style["form-control"]} w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-#8c263b-500`}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block mb-2"></label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`${style["form-control"]} w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-#8c263b-500`}
              />
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="px-6 py-2 sm-btn-primary mt-5"
                disabled={loading}>
                {loading ? "Memuat..." : "Masuk"}
              </button>
            </div>
          </form>
          {error && (
            <div className="text-red-500 text-center mt-2">{error}</div>
          )}
          <div className="mt-5 text-center mb-10">
            <small className={`${style["small"]}`}>
              Belum Punya Akun?{" "}
              <Link to="/regist">
                <span className={`${style["small-b"]}`}>Daftar</span>
              </Link>
            </small>
          </div>
        </div>
      </div>
      <div className={`${style["hero-img"]} mt-5`}>
        <img className={`${style["img-1"]} img-fluid`} src={image} alt="Hero" />
      </div>
    </div>
  );
}

export default Login;
