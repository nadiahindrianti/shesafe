import { Icon } from "@iconify/react";
import foto from "../../assets/images/fp1.png";
import { useNavigate } from "react-router-dom";

function Card({ data }) {
  const navigate = useNavigate();
  const formattedDate = new Date(data.approved).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const formattedTime = new Date(data.approved).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const truncatedTitle =
    data.title.length > 60 ? data.title.slice(0, 60) + "..." : data.title;
  const truncatedDesc =
    data.description.length > 100
      ? data.description.slice(0, 80) + "..."
      : data.description;
  return (
    <>
      <div className={`px-5 py-2 my-2`}>
        <div
          className={`px-5 py-6  bg-white rounded-t-[10px] box-shadow: shadow-sm shadow-md; `}>
          <div className={`flex flex-row gap-8  items-center justify-start `}>
            {!data.createdBy.avatar ? (
              <img src={foto} className={`rounded w-[50px] object-cover`} />
            ) : (
              <img
                className={`rounded-full w-[50px] h-[50px] object-cover`}
                src={data.createdBy.avatar}
              />
            )}
            <div className={`flex flex-col gap-1`}>
              <h6 className={`text-[#BA324F] font-bold text-md`}>
                {data.isAnonimous}
              </h6>
              <p className={`text-[#8c8c8c] font-light`}>
                {/* 11 Oktober 2024 | 02:40pm */}
                {formattedDate} | {formattedTime}
              </p>
            </div>
          </div>

          <div
            className={`flex flex-col gap-2 ustify-items-start mt-5 cursor-pointer `}
            onClick={() => navigate(`${data._id}`)}>
            <h5 className={`text-black text-md font-bold`}>
              {/* {data.title} */}
              {truncatedTitle}
            </h5>
            <p
              className={`text-[#8c8c8c] font-medium`}
              dangerouslySetInnerHTML={{ __html: truncatedDesc }}></p>
            <h5 className={`text-[#BA324F] font-bold text-md text-left`}>
              #{data.category.name}
            </h5>
          </div>
        </div>

        <div
          className={`flex flex-row bg-[#f5f5f5] justify-between items-center px-5 py-3 rounded-b-[10px]`}>
          <div className={`flex gap-2`}>
            <Icon
              icon="lets-icons:comment-light"
              width="24"
              height="24"
              style={{ color: "#8c8c8c" }}
            />
            <p className={`text-[#8c8c8c]`}>
              {data.commentCounter || 0} Komentar
            </p>
          </div>

          <div className={`flex gap-2 rounded-[10px] px-2 py-2`}>
            <Icon
              icon="mingcute:love-line"
              width="24"
              height="24"
              style={{ color: "#BA324F" }}
            />
            <p className={`text-[#BA324F]`}>{data.supportCounter} Dukungan</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
