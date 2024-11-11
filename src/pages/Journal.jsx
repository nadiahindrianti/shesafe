import { Link, Outlet, useLocation } from "react-router-dom";
import NavBottom from "../components/NavBottom";

function Journal() {
  const location = useLocation();

  return (
    <>
      <div className={`wrapper-mobile bg-white mb-10`}>
        <div className="flex justify-between items-center">
        <Link
            to="/journal"
            className={`${
              location.pathname === "/journal" ? "bg-[#04395E]" : "bg-transparent"
            } border-2 border-[#04395E] rounded-b-[10px] flex justify-center items-center w-full py-3`}
          >
            <div className="flex justify-center items-center w-full">
              <p
                className={`${
                  location.pathname === "/journal" ? "text-white" : "text-[#04395E]"
                } font-bold text-md`}
              >
                My Journal
              </p>
            </div>
          </Link>

          <Link
            to="/journal/mycases"
            className={`${
              location.pathname === "/journal/mycases" ? "bg-[#04395E]" : "bg-transparent"
            } border-2 border-[#04395E] rounded-b-[10px] flex justify-center items-center w-full py-3`}
          >
            <div className="flex justify-center items-center w-full">
              <p
                className={`${
                  location.pathname === "/journal/mycases" ? "text-white" : "text-[#04395E]"
                } font-bold text-md`}
              >
                Pengajuan Kasus
              </p>
            </div>
          </Link>
        </div>

        <div>
          <Outlet />
        </div>

        <NavBottom />
      </div>
    </>
  );
}

export default Journal;
