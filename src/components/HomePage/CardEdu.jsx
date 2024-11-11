import { useNavigate } from "react-router-dom";
import style from "../../assets/css/HomePage.module.css";

function CardEdu({ data }) {
  const navigate = useNavigate();
  return (
    <>
      <div className={`${style["tips-card"]}  `}>
        <div
          className={`${style.image}`}
          onClick={() => navigate(`/education/${data._id}`)}>
          <img
            className={`w-[300px] rounded-[10px] object-cover`}
            src={data.file}
          />
        </div>

        <div className={`${style.title}`}>
          <h6>{data.title}</h6>
        </div>
      </div>
    </>
  );
}

export default CardEdu;
