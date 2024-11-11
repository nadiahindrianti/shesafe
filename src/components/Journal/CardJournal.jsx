import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function CardJournal({ journal }) {
  const [error, setError] = useState(null);
  // const API_BASE_URL = "http://localhost:4000"

  const handleEdit = async () => {
    const result = await Swal.fire({
      title: "Anda yakin?",
      text: "Anda akan mengedit jurnal ini.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Edit",
      cancelButtonText: "Batal",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      window.location.href = `/editJurnal/${journal._id}`;
    }
  };
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Anda yakin?",
      text: "Jurnal ini akan dihapus.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Hapus",
      cancelButtonText: "Batal",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      try {
        const response = await axios.delete(`${API_BASE_URL}/journal/${id}`, {
          withCredentials: true,
        });
        Swal.fire("Dihapus!", "Jurnal Anda telah dihapus.", "success");
        console.log("Journal dihapus", response.data);
        window.location.reload();
      } catch (error) {
        console.error("error deleting journal: ", error);
        setError("gagal hapus journal");
        Swal.fire("Gagal!", "Gagal menghapus jurnal.", "error");
      }
    }
  };

  if (error) return <p>{error}</p>;
  const truncatedTitle =
    journal.title.length > 60
      ? journal.title.slice(0, 60) + "..."
      : journal.title;
  const truncatedDesc =
    journal.description.length > 100
      ? journal.description.slice(0, 80) + "..."
      : journal.description;

  return (
    <>
      <div key={journal._id} className="bg-white border w-full rounded-lg ">
        <div className="flex justify-between items-center items-center px-4 mt-5">
          <span
            className={`text-[#BA324F] bg-red-100 text-sm font-semibold px-2 py-2 rounded`}>
            {journal.category.name || "No Category"}
          </span>
          <span className="text-sm text-[#04395E]  px-2 py-2 rounded mr-2">
            {journal.created
              ? new Date(journal.created).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })
              : "No date"}
          </span>
        </div>

        <div className="px-4 py-3">
          <Link to={`/journal/${journal._id}`}>
            <h4 className="font-semibold text-gray-900 text-lg">
              {/* {journal.title} */}
              {truncatedTitle}
            </h4>
          </Link>
          <p
            className="text-gray-600 text-sm mt-2"
            dangerouslySetInnerHTML={{ __html: truncatedDesc }}></p>
        </div>

        <div
          style={{ backgroundColor: "rgba(245, 245, 245, 1)" }}
          className="flex justify-between px-4 py-2 border-t  rounded-b-lg">
          {/* <Link to={`/editJurnal/${journal._id}`}> */}
          <button
            onClick={handleEdit}
            className="flex gap-2 items-center text-[#04395E] hover:text-blue-700  px-3 py-1 rounded border border-[#04395E]">
            <Icon
              icon="tabler:edit"
              width="24"
              height="24"
              style={{ color: "#04395E" }}
            />
            Edit
          </button>
          {/* </Link> */}
          <button
            onClick={() => handleDelete(journal._id)} //pass id ke handleDelete
            className="flex gap-2 items-center text-[#BA324F] hover:text-red-700   px-3 py-1 rounded border border-red-600">
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
    </>
  );
}

CardJournal.propTypes = {
  journal: PropTypes.object.isRequired,
};

export default CardJournal;
