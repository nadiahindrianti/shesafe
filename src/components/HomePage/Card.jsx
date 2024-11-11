import { useNavigate } from "react-router-dom";
import style from "../../assets/css/HomePage.module.css";
// import { formatDate } from "../../utils/formatDate";

function Card({ data }) {
  const navigate = useNavigate();
  const truncatedTitle =
    data.title.length > 40 ? data.title.slice(0, 40) + "..." : data.title;

  return (
    <>
      <div className={`${style["cases-card"]}  `}>
        <div className={`${style["cases-user"]}`}>
          <p className={`${style.username} `}>{data.isAnonimous}</p>
          {/* <p>11 Oktober 2024 | 02:40pm</p> */}
          <p className="font-light text-[#8C8C8C]">
            {new Date(data.approved).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
        <div
          className={`${style["cases-desc"]} `}
          onClick={() => navigate(`/community/${data._id}`)}>
          <p>{truncatedTitle}</p>
        </div>
        <h6 className="font-bold text-sm text-[#BA324F]">
          # {data.category.name}
        </h6>
        <button className={`${style["btn-support"]} `}>
          {data.supportCounter || 0} Dukungan
        </button>
      </div>
    </>
  );
}

export default Card;
