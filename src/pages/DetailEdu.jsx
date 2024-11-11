import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import { fetchEduById } from "../features/eduSlice";
import { useEffect } from "react";

function DetailEdu() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { edu, loading, error } = useSelector((state) => state.educations);

  useEffect(() => {
    if (id) {
      dispatch(fetchEduById(id));
    }
  }, [id, dispatch]);

  // Loading and error handling
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // Format the date
  const formattedDate = new Date(edu.created).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const formattedTime = new Date(edu.created).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="wrapper-mobile bg-white">
      <div className="flex pt-10 px-5 items-center justify-between">
        <Icon
          onClick={() => navigate(-1)}
          icon="ep:arrow-left-bold"
          width="32"
          height="32"
          style={{ color: "#BA324F" }}
        />
        <p className="text-black text-xl">Detail</p>
        <div> </div>
      </div>

      {edu && (
        <div className="px-5 mt-10 pb-[6rem]">
          <div className="mt-10 flex flex-col gap-8">
            <div className="flex flex-col gap-2 items-left">
              <h5 className="text-black text-lg font-bold">{edu.title}</h5>
              <p className="text-light text-[#858585]">
                {formattedDate} | {formattedTime} WIB
              </p>
            </div>

            {edu.file && (
              <div className="mt-5">
                <img
                  src={edu.file}
                  alt={edu.title}
                  className="w-full object-cover rounded-md"
                />
              </div>
            )}
            <div className="mt-5">
              <p
                className="text-black text-sm"
                dangerouslySetInnerHTML={{ __html: edu.description }}></p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DetailEdu;
