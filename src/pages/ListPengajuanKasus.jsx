import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { deleteCase } from "../features/casesSlice";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
axios.defaults.withCredentials = true;
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function ListPengajuanKasus() {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [selectedDate, setSelectedDate] = useState("Pilih Tanggal");
  const [status, setStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate(); // Inisialisasi navigate

  const perPage = 6;

  const fetchData = async (page = 1, statusFilter = "") => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/cases/?status=${statusFilter}&page=${page}&perPage=${perPage}`
      );
      const { cases, totalPages } = response.data;
      setData(cases);
      setTotalPages(totalPages);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(currentPage, status);
  }, [currentPage, status]);

  const handleEditClick = (id) => {
    navigate(`/journal/mycases/edit/${id}`);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Anda yakin?",
      text: "Pengajuan Kasus ini akan dihapus.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Hapus",
      cancelButtonText: "Batal",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      try {
        const response = await axios.delete(`${API_BASE_URL}/cases/${id}`, {
          withCredentials: true,
        });
        Swal.fire("Dihapus!", "Pengajuan Kasus Anda telah dihapus.", "success");
        console.log("Pengajuan KAsus dihapus", response.data);
        window.location.reload();
      } catch (error) {
        console.error("error deleting cases: ", error);
        setError("gagal hapus pengajuan kasus");
        Swal.fire("Gagal!", "Gagal menghapus pengajuan kasus.", "error");
      }
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prevPage) => prevPage + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center mt-10 px-5 mb-8">
        <h3 className="text-lg font-semibold">Pengajuan Kasus</h3>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border bg-[#BA324F] text-white rounded-[10px] px-4 py-2 mr-4">
          <option value="">Semua Status</option>
          <option value="Submitted">Mengajukan</option>
          <option value="Draft">Draft</option>
          <option value="Revisi">Revisi</option>
          <option value="Approved">Disetujui</option>
        </select>
      </div>

      {data.map((item) => (
        <div
          key={item._id}
          className="bg-white border rounded-lg shadow-sm mb-3 mx-5">
          <div className="flex justify-between items-center px-4 mt-5">
            <span
              className={`${
                item.isApproved === "draft"
                  ? "text-red-600 bg-red-100"
                  : "text-pink-600 bg-pink-100"
              } text-sm font-semibold px-2 py-2 rounded`}>
              {item.isApproved === "draft" ? "Draft" : item.isApproved}
            </span>
            <span className="text-sm text-[#04395E] px-2 py-2 rounded mr-2">
              {new Date(item.created).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>

          <div
            className="px-4 py-3 cursor-pointer"
            onClick={() => navigate(`/journal/mycases/detail/${item._id}`)}>
            <h4 className="font-semibold text-lg text-gray-800">
              {item.title.length > 60
                ? item.title.slice(0, 60) + "..."
                : item.title}
            </h4>
            <p
              className="text-gray-600 mt-2"
              dangerouslySetInnerHTML={{
                __html:
                  item.description.length > 100
                    ? item.description.slice(0, 80) + "..."
                    : item.description,
              }}></p>
          </div>

          <div
            style={{ backgroundColor: "rgba(245, 245, 245, 1)" }}
            className="flex justify-between px-4 py-2">
            {item.isApproved === "Approved" ? (
              <div></div>
            ) : (
              <button
                onClick={() => handleEditClick(item._id)} // Menggunakan item._id yang sesuai
                className="flex gap-2 items-center text-[#04395E] hover:text-blue-700 px-3 py-1 rounded border border-[#04395E]">
                <Icon
                  icon="tabler:edit"
                  width="24"
                  height="24"
                  style={{ color: "#04395E" }}
                />
                Edit
              </button>
            )}

            <button
              onClick={() => handleDelete(item._id)}
              className="flex gap-2 items-center text-[#BA324F] hover:text-red-700 px-3 py-1 rounded border border-red-600">
              <Icon
                icon="mi:delete"
                width="24"
                height="24"
                style={{ color: "#BA324F" }}
              />
              Hapus
            </button>
          </div>
        </div>
      ))}

      <div className="flex justify-center my-4 pb-10">
        <button
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          className={`mx-1 px-3 py-1 rounded ${
            currentPage === 1
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-[#BA324F] text-white"
          }`}>
          {"<"}
        </button>

        <span className="mx-2 px-3 py-1 bg-gray-200 text-gray-800 rounded">
          {currentPage}
        </span>

        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className={`mx-1 px-3 py-1 rounded ${
            currentPage === totalPages
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-[#BA324F] text-white"
          }`}>
          {">"}
        </button>
      </div>
    </div>
  );
}

export default ListPengajuanKasus;
