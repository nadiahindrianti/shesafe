// import { Link } from "react-router-dom"
import style from "../../assets/css/AddJurnal.module.css";
import image from "../../assets/images/asset_login.png";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const EditForm = () => {
  // const API_BASE_URL = "http://localhost:4000"
  const { id } = useParams();
  const navigate = useNavigate();

  //define state untuk form dan kategori
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    console.log("Journal id: ", id);
    const fetchData = async () => {
      if (!id) return; //avoid fetching if id is undefined
      try {
        const journalResponse = await axios.get(
          `${API_BASE_URL}/journal/${id}`,
          { withCredentials: true }
        );
        const data = journalResponse.data.findJournal;
        if (data) {
          setTitle(data.title);
          //convert ISO dates to "yy-mm-dd" format
          setStartDate(new Date(data.startDate).toISOString().split("T")[0]);
          setEndDate(new Date(data.endDate).toISOString().split("T")[0]);
          setCategory(data.category._id);
          setDescription(data.description);
        } else {
          console.log("No journal data found for id: ", id);
        }

        const categoryResponse = await axios.get(`${API_BASE_URL}/category/`, {
          withCredentials: true,
        });
        setCategories(
          Array.isArray(categoryResponse.data.data)
            ? categoryResponse.data.data
            : []
        );
      } catch (error) {
        console.error("error fetching data: ", error);
      }
    };

    fetchData();
  }, [id]);

  //form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("startDate", startDate);
    formData.append("endDate", endDate);
    formData.append("category", category);
    formData.append("description", description);
    if (file) formData.append("file", file);

    try {
      await axios.put(`${API_BASE_URL}/journal/${id}`, formData, {
        withCredentials: true,
      });
      console.log("berhasil edit journal");
      navigate(-1);
    } catch (error) {
      console.error("gagal edit journal: ", error);
    }
  };

  return (
    <>
      <div className="container mx-auto flex justify-center items-center min-h-screen p-4">
        <div className="w-full max-w-lg">
          <div className="text-center mb-10 gap-4 flex cols-2 justify-between">
            <button onClick={() => navigate(-1)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="5rem"
                viewBox="0 0 12 24">
                <path
                  fill="#8c263b"
                  fillRule="evenodd"
                  d="m3.343 12l7.071 7.071L9 20.485l-7.778-7.778a1 1 0 0 1 0-1.414L9 3.515l1.414 1.414z"
                />
              </svg>
            </button>
            <h1 className={`${style["h1"]} font-bold`}>Edit Jurnal</h1>
            <div></div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-1">
              <label htmlFor="title" className="text-sm font-bold">
                Judul Jurnal
              </label>
              <input
                type="text"
                id="title"
                placeholder="Masukkan Judul Jurnal Anda"
                className={`${style["form-control"]} mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-#8c263b-500`}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <small className={`${style["small"]}`}>
              **Pilih judul yang mencerminkan isi jurnal dengan benar
            </small>
            <small className={`${style["small"]}`}>
              **Maksimal 100 karakter
            </small>
            <div className="flex gap-4 mb-4 mt-3">
              <div className="w-1/2">
                <label
                  htmlFor="startDate"
                  className={`${style["form-block"]} text-sm font-bold`}>
                  Tanggal Kejadian
                </label>
                <div className="flex mt-1">
                  <div className="cols-5">
                    <input
                      type="date"
                      id="startDate"
                      className={`${style["form-control"]} w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-#8c263b-500`}
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      required
                    />
                  </div>
                  <div className="px-5 flex justify-center">
                    <h4>
                      <b>-</b>
                    </h4>
                  </div>
                  <div className="cols-5">
                    <input
                      type="date"
                      id="endDate"
                      className={`${style["form-control"]} w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-#8c263b-500`}
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="category" className="text-sm font-bold">
                Klasifikasi Kasus
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={`${style["form-control"]} mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-#8c263b-500`}
                required>
                <option value="" disabled>
                  Pilih Klasifikasi
                </option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-1">
              <label htmlFor="deskripsi" className="text-sm font-bold">
                Deskripsi Kejadian
              </label>
              <textarea
                id="deskripsi"
                placeholder="Deskripsikan kejadian yang anda alami"
                className={`${style["form-control"]} mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-#8c263b-500`}
                rows="4"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required></textarea>
            </div>
            <small className={`${style["small"]}`}>
              **Hindari menggunakan nama asli atau informasi pribadi orang lain
              tanpa izin
            </small>
            <div className="mb-1 mt-3">
              <label htmlFor="file" className="text-sm font-bold">
                Lampirkan Bukti (Optional)
              </label>
              <input
                type="file"
                id="file"
                className={`${style["form-control"]} mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-#8c263b-500`}
                onChange={(e) => setFile(e.target.files[0])}
              />
              {file && (
                <p className="text-sm font-bold text-green mt-2 mb-3">
                  File uploaded: {file.originalname || file.name}
                </p>
              )}
            </div>
            <small className={`${style["small"]}`}>
              **Anda dapat melampirkan gambar, video, atau dokumen pendukung{" "}
            </small>
            <small className={`${style["small"]}`}>
              **Format yang didukung: JPG, PNG, MP4, PDF
            </small>
            <small className={`${style["small"]}`}>**Maksimal file 10MB</small>
            <div className="flex justify-center">
              <button type="submit" className="px-6 py-2 sm-btn-primary mt-10">
                Edit & Simpan
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className={`${style["hero-img"]} mt-5`}>
        <img className={`${style["img-1"]} img-fluid`} src={image} />
      </div>
    </>
  );
};

export default EditForm;
