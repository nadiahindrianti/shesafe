import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "../../assets/css/HomePage.module.css";
import Card from "./Card";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { fetchCommunity } from "../../features/communitySlice";
import { Link } from "react-router-dom";

function CasesSection() {
  const dispatch = useDispatch();
  const { community, loading } = useSelector((state) => state.communities);

  useEffect(() => {
    dispatch(fetchCommunity({ page: 1, perPage: 6 }));
  }, [dispatch]);

  function NextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, right: "-5px", zIndex: "10", top: "40%" }}
        onClick={onClick}
      />
    );
  }

  function PrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, left: "-10px", zIndex: "10", top: "40%" }}
        onClick={onClick}
      />
    );
  }

  var settings = {
    dots: true,
    infinite: community.length > 1,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    initialSlide: 0,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    vertical: false,
  };

  return (
    <div className={`${style["cases-section"]}`}>
      <div className={`${style["cases-heading"]}`}>
        <h4 className={`text-xl`}>Cerita Perempuan</h4>
        <Link to="/community"> Selengkapnya</Link>
      </div>

      <div className={`${style["cases-info"]} mt-2`}>
        <p>
          Lihat kisah nyata dari para perempuan pemberani. Dukung mereka dengan
          memberikan semangat atau bagikan pengalamanmu sendiri
        </p>
      </div>

      <div className={`${style["cases-content"]} my-3 slider-container`}>
        {loading ? (
          <Slider {...settings}>
            {[...Array(6)].map((_, index) => (
              <div
                className="w-full h-48 bg-gray-200 rounded-lg animate-pulse"
                key={index}>
                <div className="w-full h-32 bg-gray-300 rounded-t-lg mb-4"></div>
                <div className="w-3/4 h-4 bg-gray-300 rounded mb-2"></div>
                <div className="w-1/2 h-4 bg-gray-300 rounded"></div>
              </div>
            ))}
          </Slider>
        ) : (
          <Slider {...settings}>
            {community.map((item) => (
              <Card key={item._id} data={item} /> // Show actual cards once loaded
            ))}
          </Slider>
        )}
      </div>
    </div>
  );
}

export default CasesSection;
