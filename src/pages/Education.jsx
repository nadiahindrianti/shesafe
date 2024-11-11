import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "@iconify/react/dist/iconify.js";
import Card from "../components/Education/Card";
import { fetchEdu } from "../features/eduSlice";
import { useNavigate } from "react-router-dom";

function Education() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { edu, loading, error } = useSelector((state) => state.educations);

  useEffect(() => {
    dispatch(fetchEdu());
  }, [dispatch]);

  return (
    <>
      <div className={`wrapper-mobile bg-white`}>
        <div className={`flex pt-10 px-5 items-center justify-between`}>
          <Icon
            onClick={() => navigate(-1)}
            icon="ep:arrow-left-bold"
            width="32"
            height="32"
            style={{ color: "#BA324F" }}
          />
          <p className="text-black text-xl"> Modul Edukasi</p>
          <div></div>
        </div>

        <div
          className={`px-5 mt-10 pb-[6rem] columns-2 justify-center items-center`}>
          {loading ? (
            <div className="flex flex-wrap gap-4">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="w-full mb-4">
                  {/* Replace Skeleton with individual divs for loading */}
                  <div className="w-full bg-gray-300 h-48 mb-4"></div>{" "}
                  {/* Placeholder for the content */}
                  <div className="w-3/5 bg-gray-300 h-6"></div>{" "}
                  {/* Placeholder for text */}
                </div>
              ))}
            </div>
          ) : error ? (
            <p>Error: {error}</p>
          ) : Array.isArray(edu) && edu.length > 0 ? (
            edu.map((item, index) => <Card key={index} data={item} />)
          ) : (
            <p>No educational modules available.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default Education;
