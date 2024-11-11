import { Icon } from "@iconify/react";
import foto from "../../assets/images/fp1.png";
import Commentar from "./Commentar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  deleteComment,
  fetchCommentar,
  resetCommentar,
} from "../../features/commentarSlice";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

function DetailContent({ data }) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const comment = useSelector((state) => state.commentars.commentar);
  const pagination = useSelector((state) => state.commentars.pagination);
  const { userData } = useSelector((state) => state.users);
  const { total_data, per_page, current_page, total_pages } = pagination;

  const validComments = Array.isArray(comment) ? comment : [];
  const [page, setPage] = useState(current_page);

  // Fetch comments when page changes
  useEffect(() => {
    dispatch(resetCommentar());
    dispatch(fetchCommentar({ id, page, perPage: per_page }));
  }, [dispatch, id, page, per_page]);

  // Page change handler
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= total_pages) {
      setPage(newPage);
    }
  };

  // Handle comment deletion
  const handleDeleteComment = (idcomment) => {
    Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Komentar ini akan dihapus dan tidak bisa dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus komentar!",
      cancelButtonText: "Batal",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteComment({ _id: idcomment, casesID: id }));
        // dispatch(
        //   fetchCommentar({
        //     id,
        //     page,
        //     perPage: per_page,
        //   })
        // );
        Swal.fire("Terhapus!", "Komentar telah dihapus.", "success");
        window.location.reload();
      } else {
        Swal.fire("Dibatalkan", "Komentar tidak dihapus.", "info");
      }
    });
  };

  const formattedDate = new Date(data.approved).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const formattedTime = new Date(data.approved).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <>
      {/* Content rendering */}
      <div className="flex flex-row gap-8 items-center justify-start">
        <img
          src={data.createdBy.avatar || foto}
          className="rounded-full w-[50px] h-[50px] object-cover"
        />
        <div className="flex flex-col gap-1">
          <h6 className="text-[#BA324F] font-bold text-md">
            {data.isAnonimous}
          </h6>
          <p className="text-[#8c8c8c] font-light">
            {formattedDate} | {formattedTime}
          </p>
        </div>
      </div>

      <div className="mt-6 flex justify-between items-center">
        <h6 className="text-[#BA324F] font-bold text-m">
          #{data.category.name}
        </h6>
        <div className="flex gap-2">
          <Icon
            icon="mingcute:love-line"
            width="24"
            height="24"
            style={{ color: "#BA324F" }}
          />
          <p className="text-[#BA324F] text-md">
            {data.supportCounter} Dukungan
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-4 mt-3">
        <h5 className="text-black text-lg font-bold">{data.title}</h5>
        <p
          className="text-black font-light text-sm"
          dangerouslySetInnerHTML={{ __html: data.description }}></p>

        <div className="flex flex-col gap-2">
          <h5 className="text-black text-md font-bold">
            Pesan untuk Komunitas
          </h5>
          <p className="text-black font-light text-sm">
            {!data.message ? "Tidak ada Pesan untuk Komunitas" : data.message}
          </p>
        </div>
      </div>

      {/* Comments section */}
      <div className="mt-10 pb-[5rem]">
        <h6 className="text-black font-bold text-lg">
          Komentar ({total_data || 0})
        </h6>
        {validComments.length > 0 ? (
          validComments.map((item) => (
            <Commentar
              commentar={item}
              key={item._id}
              page={current_page}
              totalPages={total_pages}
              perPage={per_page}
              delCom={
                userData?.userId === item.createdBy._id ? (
                  <Icon
                    icon="mi:delete"
                    width="24"
                    height="24"
                    style={{ color: "#BA324F" }}
                    onClick={() => handleDeleteComment(item._id)}
                  />
                ) : null
              }
            />
          ))
        ) : (
          <h6 className="text-black mt-6">Belum Ada Komentar</h6>
        )}

        {/* Pagination */}
        <div className="flex justify-center mt-8">
          <nav aria-label="Pagination">
            <ul className="flex items-center space-x-3">
              <li>
                <button
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page <= 1}
                  className="px-4 py-2 text-sm font-medium text-white bg-[#BA324F] rounded-md disabled:opacity-50">
                  Previous
                </button>
              </li>
              <li>
                <span className="text-sm font-medium">
                  Page {page} of {total_pages}
                </span>
              </li>
              <li>
                <button
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page >= total_pages}
                  className="px-4 py-2 text-sm font-medium text-white bg-[#BA324F] rounded-md disabled:opacity-50">
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}

export default DetailContent;
