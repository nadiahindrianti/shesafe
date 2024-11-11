import { Icon } from "@iconify/react/dist/iconify.js";
import AddForm from "../components/Cases/AddForm";
import asset from "../assets/images/asset_login.png";
import { Link, useNavigate } from "react-router-dom";

function AddCases() {
  const navigate = useNavigate();
  return (
    <>
      <div className={`wrapper-mobile bg-white `}>
        <div className={`flex pt-10 px-5 items-center justify-between`}>
          <Link to="/journal/mycases">
            <Icon
              onClick={() => navigate(-1)}
              icon="ep:arrow-left-bold"
              width="32"
              height="32"
              style={{ color: "#BA324F" }}
            />
          </Link>
          <p className="text-black text-xl">Formulir Pengajuan Kasus</p>
          <div> </div>
        </div>

        <div className={`px-5 mt-10 pb-[6rem]`}>
          <AddForm />
        </div>

        <div className={`flex flex-col justify-center items-center gap-4`}>
          <img src={asset} alt="" />
        </div>
      </div>
    </>
  );
}

export default AddCases;
