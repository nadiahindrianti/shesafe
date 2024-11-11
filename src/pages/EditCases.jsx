import { useNavigate, useParams } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
// import EditForm from "../components/Cases/EditForm";
import asset from "../assets/images/asset_login.png";
import Edit from "../components/Cases/Edit";
import EditForm from "../components/Cases/EditForm";

function EditCases() {
  const { id } = useParams();
  const navigate = useNavigate();
  return (
    <>
      <div className="wrapper-mobile bg-white">
        <div className="flex pt-10 px-5 items-center justify-between">
          <Icon
            onClick={() => navigate(-1)}
            icon="ep:arrow-left-bold"
            width="32"
            height="32"
            style={{ color: "#BA324F" }}
          />
          <p className="text-black text-xl">Formulir Pengajuan Kasus</p>
          <div></div>
        </div>

        <div className="px-5 mt-10 pb-[6rem]">
          <EditForm caseId={id} />
        </div>

        <div className="flex flex-col justify-center items-center gap-4">
          <img src={asset} alt="" />
        </div>
      </div>
    </>
  );
}

export default EditCases;
