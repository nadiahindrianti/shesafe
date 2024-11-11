import { Link, Navigate, useNavigate } from "react-router-dom";
import logo from "../../assets/images/lg_ss.png";
import image from "../../assets/images/asset_login.png";
import style from "../../assets/css/LoginRegist.module.css";
import Navigation from "../Navigation";
import { regist } from "../../features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import Swal from "sweetalert2";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.users);

  // Local state for form fields
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("Pilih");
  const [ttl, setTtl] = useState("");
  const [identitas, setIdentitas] = useState(null);
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Frontend validation
    if (password !== passwordConfirm) {
      Swal.fire({
        icon: "error",
        title: "Password Tidak Cocok",
        text: "Password dan konfirmasi password tidak cocok!",
        confirmButtonText: "OK",
      });
      return;
    }

    // File upload validation (limit size to 2MB)
    if (identitas && identitas.size > 2 * 1024 * 1024) {
      Swal.fire({
        icon: "error",
        title: "File Terlalu Besar",
        text: "Bukti identitas tidak boleh lebih dari 2MB.",
        confirmButtonText: "OK",
      });
      return;
    }

    const formData = new FormData();
    formData.append("fullName", nama);
    formData.append("email", email);
    formData.append("gender", gender);
    formData.append("birthDate", ttl);
    formData.append("fileIdentity", identitas);
    formData.append("password", password);
    //   if (identitas) {
    //   formData.append("fileIdentity", identitas.name);  // Mengambil hanya nama file
    // }

    try {
      const resultAction = await dispatch(regist(formData)).unwrap();
      if (resultAction) {
        Swal.fire({
          icon: "success",
          title: "Registrasi Berhasil",
          text: "Registrasi Anda berhasil. Silakan tunggu hingga identitas Anda tervalidasi untuk bisa login.",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/login");
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Registrasi Gagal",
        text: `Terjadi kesalahan: ${error}`,
        confirmButtonText: "Coba Lagi",
      });
    }
  };

  return (
    <>
      {localStorage.getItem("isLoggedin") !== "true" ? (
        <div className="wrapper-mobile">
          <div className="container mx-auto flex justify-center items-center min-h-screen p-4">
            <div className="w-full max-w-lg">
              <Navigation />
              <div className="flex justify-center mb-6 mt-36">
                <img src={logo} alt="Logo" className="w-32" />
              </div>
              <div className="text-center mb-6">
                <h1 className={`${style["h1"]} text-2xl font-bold`}>
                  Daftar Akun
                </h1>
                <p className={`${style["p"]} mt-3 mb-3`}>
                  Ruang Aman untuk Pemberdayaan dan Keadilan Perempuan
                </p>
              </div>
              {error && <div className="text-red-500 text-center">{error}</div>}
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="nama" className="text-sm font-bold">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    id="nama"
                    placeholder="Nama Lengkap"
                    className={`${style["form-control"]} mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-#8c263b-500`}
                    required
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="text-sm font-bold">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Email"
                    className={`${style["form-control"]} mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-#8c263b-500`}
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="flex gap-4 mb-4">
                  <div className="w-1/2">
                    <label htmlFor="gender" className="text-sm font-bold">
                      Jenis Kelamin
                    </label>
                    <select
                      id="gender"
                      className={`${style["form-control"]} mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-#8c263b-500`}
                      required
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}>
                      <option disabled value="Pilih">
                        Pilih
                      </option>
                      <option>Perempuan</option>
                      <option>Laki-laki</option>
                    </select>
                  </div>
                  <div className="w-1/2">
                    <label htmlFor="ttl" className="text-sm font-bold">
                      Tanggal Lahir
                    </label>
                    <input
                      type="date"
                      id="ttl"
                      className={`${style["form-control"]} mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-#8c263b-500`}
                      required
                      value={ttl}
                      onChange={(e) => setTtl(e.target.value)}
                    />
                  </div>
                </div>
                <div className="mb-1">
                  <label htmlFor="identitas" className="text-sm font-bold">
                    Bukti Identitas
                  </label>
                  <input
                    type="file"
                    id="identitas"
                    className={`${style["form-control"]} mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-#8c263b-500`}
                    required
                    onChange={(e) => setIdentitas(e.target.files[0])}
                  />
                </div>
                <small className={`${style["small"]}`}>
                  **Maximum file 2MB
                </small>
                <div className="mb-4 mt-3">
                  <label htmlFor="password" className="text-sm font-bold">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    className={`${style["form-control"]} mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-#8c263b-500`}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="password-confirm"
                    className="text-sm font-bold">
                    Konfirmasi Password
                  </label>
                  <input
                    type="password"
                    id="password-confirm"
                    placeholder="Konfirmasi Password"
                    className={`${style["form-control"]} mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-#8c263b-500`}
                    required
                    value={passwordConfirm}
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                  />
                </div>
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className={`px-6 py-2 sm-btn-primary mt-5 ${
                      loading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    disabled={loading}>
                    {loading ? "Memuat..." : "Daftar"}
                  </button>
                </div>
              </form>
              <div className="mt-5 text-center mb-10">
                <small className={`${style["small"]}`}>
                  Sudah Punya Akun?{" "}
                  <Link to="/login">
                    <span className={`${style["small-b"]}`}>Masuk</span>
                  </Link>
                </small>
              </div>
            </div>
          </div>
          <div className={`${style["hero-img"]} mt-5`}>
            <img className={`${style["img-1"]} img-fluid`} src={image} />
          </div>
        </div>
      ) : (
        <Navigate to="/home"></Navigate>
      )}
    </>
  );
}

export default Register;
