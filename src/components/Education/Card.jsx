import { useNavigate } from "react-router-dom";

function Card({ data }) {
  const navigate = useNavigate();
  const truncatedTitle =
    data.title.length > 40 ? data.title.slice(0, 40) + "..." : data.title;
  return (
    <>
      <div className={`px-3 py-3 flex flex-col gap-4`}>
        <img
          onClick={() => navigate(`/education/${data._id}`)}
          className={`w-[300px] rounded-[10px] object-cover`}
          src={data.file}
        />
        <h6 className={`text-[#BA324F] text-sm font-medium`}>
          {truncatedTitle}
        </h6>
      </div>
    </>
  );
}

export default Card;
