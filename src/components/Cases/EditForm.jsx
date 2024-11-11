import React, { useEffect, useRef, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import { useSelector, useDispatch } from "react-redux";
import "react-quill/dist/quill.snow.css";
import { fetchCategories } from "../../features/categoriesSlice";
import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
import { editCase, postCase, postCaseDraft } from "../../features/casesSlice";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";

function EditForm({ caseId }) {
  // const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => ({
    categories: state.categories.category,
  }));

  // const [selectedCategory, setSelectedCategory] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [isApproved, setIsApproved] = useState("");

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

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      if (!caseId) return; //avoid fetching if id is undefined
      try {
        const CasesResponse = await axios.get(
          `${API_BASE_URL}/cases/${caseId}`,
          {
            withCredentials: true,
          }
        );
        const data = CasesResponse.data.data;
        if (data) {
          setTitle(data.title);
          setIsApproved(data.isApproved);
          //convert ISO dates to "yy-mm-dd" format
          setCategory(data.category._id);
          setMessage(data.message);
          setDescription(
            (quillRef.current.getEditor().root.innerHTML = data.description)
          );
        } else {
          console.log("No journal data found for id: ", id);
        }
      } catch (error) {
        console.error("error fetching data: ", error);
      }
    };

    fetchData();
  }, [caseId]);

  const handleSubmit = async (isDraft = false) => {
    // Validasi untuk memastikan input wajib telah diisi
    const description = quillRef.current.getEditor().root.innerHTML;
    if (!title || !description || !category) {
      Swal.fire({
        icon: "warning",
        title: "Input Tidak Lengkap",
        text: "Pastikan semua input wajib (Judul Kasus, Ringkasan Kasus, dan Kategori) sudah diisi.",
        confirmButtonText: "OK",
      });
      return;
    }

    const dataCase = {
      title: title,
      description: description,
      category: category,
      message: message,
      isApproved: isDraft ? "Draft" : "Submitted",
    };

    try {
      if (isDraft) {
        await dispatch(
          editCase({ id: caseId, ...dataCase, isApproved: "Draft" })
        );
      } else {
        await dispatch(editCase({ id: caseId, dataCase }));
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
      {/* Category Selection */}
      <div className="flex flex-col gap-4">
        <label htmlFor="category" className="font-bold">
          Pilih Kategori Kasus Kejadian
        </label>
        <select
          className="bg-[#f5f5f5] px-5 py-3 pr-12 rounded-[10px] appearance-none focus:outline-none"
          style={{
            backgroundImage:
              "url('data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27%23ba324f%27%3E%3Cpath d=%27M7 10l5 5 5-5H7z%27/%3E%3C/svg%3E')",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 1rem center",
            backgroundSize: "32px",
          }}
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}>
          <option value="">Pilih Kategori</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Title Input */}
      <div className="flex flex-col gap-4">
        <label htmlFor="title" className="font-bold">
          Judul Kasus
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="px-5 py-3 rounded-[10px] bg-[#f5f5f5] text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ba324f]"
          placeholder="Masukkan judul kasus"
        />
        <p className="text-sm font-light text-[#BA324F]">
          **Pilih judul yang menggambarkan kasus Anda secara jelas
        </p>
      </div>

      {/* Rich Text Editor for Description */}
      <div className="flex flex-col gap-4">
        <label htmlFor="description" className="font-bold">
          Ringkasan Kasus
        </label>
        <ReactQuill
          ref={quillRef}
          className="bg-[#f5f5f5] rounded-[10px] border-0 custom-quill-editor"
          theme="snow"
          modules={modules}
        />
        <p className="text-sm font-light text-[#BA324F]">
          **Buatlah ringkasan yang padat dan menarik dan fokus pada inti masalah
        </p>
      </div>

      {/* Message Input */}
      <div className="flex flex-col gap-4">
        <label htmlFor="message" className="font-bold">
          Pesan Tambahan untuk Komunitas (opsional)
        </label>
        <input
          type="text"
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="px-5 py-3 rounded-[10px] bg-[#f5f5f5] text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ba324f]"
          placeholder="Masukkan pesan tambahan"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex flex-row justify-between gap-4">
        {isApproved === "Draft" ? (
          <button
            onClick={() => handleSubmit(true)}
            className="border-2 border-[#04395E] px-5 py-3 rounded-[10px] text-[#04395E]">
            Simpan Draft
          </button>
        ) : (
          ""
        )}

        <button
          onClick={confirmSubmit}
          className="bg-[#BA324F] px-5 py-3 rounded-[10px] text-white">
          Edit & Ajukan Kasus
        </button>
      </div>
    </div>
  );
}

export default EditForm;
