import React, { useEffect, useRef, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import { useSelector, useDispatch } from "react-redux";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { fetchCategories } from "../../features/categoriesSlice"; // Assuming this is already in your Redux slice
import {
  fetchJournal,
  postCase,
  postCaseDraft,
} from "../../features/casesSlice"; // Assuming these actions are available

const API_BASE_URL = "your-api-url-here"; // Replace with your actual API URL

function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Fetch categories and journal from Redux store
  const { journal, categories } = useSelector((state) => ({
    journal: state.cases.journal,
    categories: state.categories.category,
  }));

  const [selectedCategory, setSelectedCategory] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [data, setData] = useState(null); // Store fetched case data
  const [selectedJournal, setSelectedJournal] = useState(""); // Store selected journal

  const quillRef = useRef(null);
  const FontAttributor = Quill.import("attributors/class/font");
  FontAttributor.whitelist = ["Nunito Sans"];
  Quill.register(FontAttributor, true);

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3] }],
      ["bold", "italic", "underline", "strike"],
      [{ align: [] }],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
    ],
  };

  // Fetch case details when component mounts
  useEffect(() => {
    dispatch(fetchCategories()); // Ensure categories are loaded
    dispatch(fetchJournal()); // Ensure journal entries are loaded

    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/cases/${id}`, {
          withCredentials: true,
        });
        const journalData = response.data.data;

        setData(journalData);
        setTitle(journalData.title);
        setMessage(journalData.message || "");
        setSelectedCategory(journalData.category?._id || "");
        setSelectedJournal(journalData.journal?._id || "");
        quillRef.current.getEditor().root.innerHTML =
          journalData.description || "";
      } catch (e) {
        console.log("Error fetching case data", e);
      }
    };

    fetchData();
  }, [dispatch, id]);

  const handleSubmit = async (isDraft = false) => {
    const description = quillRef.current.getEditor().root.innerHTML;
    if (!title || !description || !selectedCategory) {
      Swal.fire({
        icon: "warning",
        title: "Input Tidak Lengkap",
        text: "Pastikan semua input wajib (Judul Kasus, Ringkasan Kasus, dan Kategori) sudah diisi.",
        confirmButtonText: "OK",
      });
      return;
    }

    const dataCase = {
      title,
      description,
      category: selectedCategory,
      message,
      journal: selectedJournal, // Include selected journal
      isApproved: isDraft ? "Draft" : "Submitted",
    };

    try {
      if (isDraft) {
        await dispatch(postCaseDraft(dataCase));
      } else {
        await dispatch(postCase(dataCase));
      }

      Swal.fire({
        icon: "success",
        title: isDraft ? "Draft Berhasil Disimpan!" : "Kasus Telah Diajukan!",
        text: isDraft
          ? "Draft kasus Anda berhasil disimpan, Anda bisa melanjutkan pengajuan nanti."
          : "Kasus Anda telah diajukan untuk ditinjau.",
        confirmButtonText: "OK",
      }).then(() => {
        navigate("/journal/mycases");
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Terjadi Kesalahan",
        text: "Terdapat masalah dalam menyimpan atau mengajukan kasus. Silakan coba lagi.",
        confirmButtonText: "OK",
      });
    }
  };

  const confirmSubmit = () => {
    Swal.fire({
      title: "Apakah Anda ingin mengajukan kasus ini?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ya, Ajukan",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        handleSubmit(false);
      }
    });
  };

  return (
    <div className="mt-10 flex flex-col gap-8">
      {/* Journal Selection */}
      <div className="flex flex-col gap-4">
        <label htmlFor="journal" className="font-bold">
          Pilih Jurnal Terkait
        </label>
        <select
          onChange={(e) => setSelectedJournal(e.target.value)}
          className="bg-[#f5f5f5] px-5 py-3 pr-12 rounded-[10px] appearance-none focus:outline-none"
          style={{
            backgroundImage:
              "url('data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27%23ba324f%27%3E%3Cpath d=%27M7 10l5 5 5-5H7z%27/%3E%3C/svg%3E')",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 1rem center",
            backgroundSize: "32px",
          }}
          id="journal"
          value={selectedJournal}>
          <option value="">Pilih Jurnal</option>
          {journal.map((item) => (
            <option key={item._id} value={item._id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      {/* Kategori Selection */}
      <div className="flex flex-col gap-4">
        <label htmlFor="category" className="font-bold">
          Kategori
        </label>
        <select
          id="category"
          onChange={(e) => setSelectedCategory(e.target.value)}
          value={selectedCategory}
          className="bg-[#f5f5f5] px-5 py-3 pr-12 rounded-[10px] appearance-none focus:outline-none"
          style={{
            backgroundImage:
              "url('data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27%23ba324f%27%3E%3Cpath d=%27M7 10l5 5 5-5H7z%27/%3E%3C/svg%3E')",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 1rem center",
            backgroundSize: "32px",
          }}>
          <option value="">Pilih Kategori</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Title and Description */}
      <div className="flex flex-col gap-4">
        <label htmlFor="title" className="font-bold">
          Judul Kasus
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="bg-[#f5f5f5] px-5 py-3 rounded-[10px] focus:outline-none"
        />
      </div>

      <div className="flex flex-col gap-4">
        <label htmlFor="description" className="font-bold">
          Deskripsi Kasus
        </label>
        <div>
          <ReactQuill
            ref={quillRef}
            value={message}
            onChange={setMessage}
            modules={modules}
            placeholder="Tuliskan ringkasan kasus..."
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-6">
        <button
          onClick={() => handleSubmit(true)}
          className="bg-[#F2F2F2] px-6 py-3 text-lg font-semibold rounded-md hover:bg-[#E4E4E4]">
          Simpan sebagai Draft
        </button>
        <button
          onClick={confirmSubmit}
          className="bg-[#BA324F] px-6 py-3 text-lg font-semibold text-white rounded-md hover:bg-[#9F2A43]">
          Ajukan Kasus
        </button>
      </div>
    </div>
  );
}

export default Edit;
