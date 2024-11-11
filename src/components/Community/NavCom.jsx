import { Icon } from "@iconify/react";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { postCommentar } from "../../features/commentarSlice";
import { useEffect } from "react";
import {
  deleteSupportById,
  postSupport,
  fetchSupport,
  detailCommunity,
} from "../../features/communitySlice";

function NavCom({ casesID, page }) {
  const dispatch = useDispatch();
  const pagination = useSelector((state) => state.commentars.pagination);

  const { support } = useSelector((state) => state.communities);

  useEffect(() => {
    dispatch(fetchSupport(casesID));
  }, [casesID, dispatch]);

  useEffect(() => {
    if (support.length > 0) {
      dispatch(detailCommunity(casesID));
    }
  }, [support, casesID, dispatch]);

  const currentSupportStatus =
    Array.isArray(support) &&
    support.some((supportItem) => supportItem.casesID === casesID);

  // Fungsi untuk menangani klik Tambah Komentar
  const handleComment = () => {
    Swal.fire({
      input: "textarea",
      inputLabel: "Berikan Komentar",
      inputPlaceholder: "Tulis komentar Anda di sini...",
      inputAttributes: {
        "aria-label": "Type your message here",
      },
      allowOutsideClick: false,
      showCloseButton: true,
      reverseButtons: true,
      showCancelButton: true,
      buttonsStyling: false,
      customClass: {
        confirmButton:
          "bg-[#BA324F] text-white px-6 py-2 rounded-md font-semibold hover:bg-[#9c2545] focus:outline-none",
        cancelButton:
          "bg-gray-200 text-gray-700 px-6 py-2 rounded-md font-semibold hover:bg-gray-300 focus:outline-none",
        actions: "flex justify-between w-full px-5",
      },
      confirmButtonText: "Kirim Komentar",
      cancelButtonText: "Batal",
      showLoaderOnConfirm: true,
      preConfirm: (text) => {
        // Validasi input: pastikan input tidak kosong
        if (!text) {
          Swal.showValidationMessage("Komentar tidak boleh kosong");
          return false;
        }
        return text;
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        const text = result.value;

        try {
          await dispatch(
            postCommentar({
              casesID,
              description: text,
            })
          );
          // Tampilkan pesan sukses setelah komentar terkirim
          Swal.fire({
            title: "Komentar Anda Terkirim",
            text: `Komentar: ${text}`,
            icon: "success",
          });

          window.location.reload();
          console.log("Komentar berhasil dikirim:", text);
        } catch (error) {
          Swal.fire({
            title: "Terjadi Kesalahan",
            text: "Komentar gagal dikirim.",
            icon: "error",
          });
        }
      }
    });
  };

  // Fungsi untuk menangani klik Tambah Dukungan
  const handleSupport = () => {
    if (currentSupportStatus) {
      // Batalkan dukungan
      Swal.fire({
        title: "Batalkan Dukungan?",
        text: "Apakah Anda yakin ingin membatalkan dukungan?",
        icon: "warning",
        reverseButtons: true,
        showCancelButton: true,
        confirmButtonText: "Ya, Batalkan",
        cancelButtonText: "Batal",
        buttonsStyling: false,
        customClass: {
          confirmButton:
            "bg-[#BA324F] text-white px-6 py-2 rounded-md font-semibold hover:bg-[#9c2545] focus:outline-none",
          cancelButton:
            "bg-gray-200 text-gray-700 px-6 py-2 rounded-md font-semibold hover:bg-gray-300 focus:outline-none",
          actions: "flex justify-between w-full px-5",
        },
      }).then(async (result) => {
        if (result.isConfirmed) {
          await dispatch(deleteSupportById(casesID));
          await dispatch(fetchSupport(casesID));
          await dispatch(detailCommunity(casesID));
          Swal.fire("Dukungan Dibatalkan", "", "success");
        }
      });
    } else {
      // Berikan dukungan
      Swal.fire({
        title: "Berikan Dukungan",
        text: "Apakah Anda yakin ingin memberikan dukungan?",
        icon: "question",
        reverseButtons: true,
        showCancelButton: true,
        confirmButtonText: "Ya, Berikan Dukungan",
        cancelButtonText: "Batal",
        buttonsStyling: false,
        customClass: {
          confirmButton:
            "bg-[#BA324F] text-white px-6 py-2 rounded-md font-semibold hover:bg-[#9c2545] focus:outline-none",
          cancelButton:
            "bg-gray-200 text-gray-700 px-6 py-2 rounded-md font-semibold hover:bg-gray-300 focus:outline-none",
          actions: "flex justify-between w-full px-5",
        },
      }).then(async (result) => {
        if (result.isConfirmed) {
          await dispatch(postSupport({ casesID, count: 1 }));
          await dispatch(fetchSupport(casesID));
          await dispatch(detailCommunity(casesID));
          Swal.fire("Dukungan Diberikan", "", "success");
        }
      });
    }
  };

  return (
    <>
      <div className="flex shadow-lg justify-center items-center">
        <div
          style={{ boxShadow: "0px -4px 10px rgba(0, 0, 0, 0.1)" }}
          className="fixed bottom-0 px-5 w-[480px] max-[576px]:w-[375px] rounded-t-[10px] bg-white flex justify-between items-center px-5 py-3">
          <div
            className={`${
              currentSupportStatus ? "bg-[#BA324F]" : "bg-transparent"
            } cursor-pointer flex justify-between items-center gap-2 border-2 border-[#BA324F] rounded-[10px] px-2 py-2`}
            onClick={handleSupport}>
            <Icon
              icon="mingcute:love-line"
              width="24"
              height="24"
              style={{ color: currentSupportStatus ? "#FFFFFF" : "#BA324F" }}
            />
            <p
              className={`${
                currentSupportStatus ? "text-white" : "text-[#BA324F]"
              }`}>
              {currentSupportStatus ? "Dukungan" : "Dukungan"}
            </p>
          </div>

          <div
            className="flex justify-between items-center bg-[#BA324F] border-2 border-[#BA324F] px-2 py-2 rounded-[10px] gap-2 cursor-pointer"
            onClick={handleComment}>
            <Icon
              icon="hugeicons:comment-add-01"
              width="24"
              height="24"
              style={{ color: "#ffffff" }}
            />
            <p className="text-sm text-[#ffffff]">Komentar</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default NavCom;
