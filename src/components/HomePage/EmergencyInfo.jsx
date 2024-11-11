import { useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Icon } from "@iconify/react";
import Slider from "react-slick";

function EmergencyInfo() {
  const emergencyNumbers = [
    "110", // Layanan Polisi (KDRT & Darurat)
    "119", // Layanan Kesehatan & Ambulans
    "021-3903963 / 021-3903962", // Hotline KDRT Nasional (Komnas Perempuan)
    "021-3950535", // Layanan Perlindungan Perempuan (LBH APIK)
    "021-8370211", // Layanan Konseling KDRT (Konselor Perempuan)
    "0800-180-0010", // Nomor Darurat BP3TKI (Badan Perlindungan Pekerja Migran Indonesia)
  ];

  const emergencyTitles = [
    "Layanan Polisi (KDRT & Darurat)",
    "Layanan Kesehatan & Ambulans",
    "Hotline KDRT Nasional",
    "Layanan Perlindungan Perempuan",
    "Layanan Konseling KDRT",
    "Nomor Darurat BP3TKI",
  ];

  const [text, setText] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = (textToCopy) => {
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        setText(textToCopy);
        setIsCopied(!isCopied);
        setTimeout(() => setIsCopied(false), 1000);
      })
      .catch((err) => {
        console.error("Gagal menyalin teks: ", err);
      });
  };

  const handleClick = (number) => {
    copyToClipboard(number);
  };

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
    infinite: false,
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
    <>
      <div className="relative p-4">
        <div className="mb-4">
          <h4 className="text-xl font-bold">Info Pusat Bantuan</h4>
        </div>

        <div
          className={`${
            isCopied ? "block" : "hidden"
          } absolute right-0 top-0 z-10 px-2 py-1 my-2 bg-[#BA324F] gap-2 text-white text-[12px] rounded-[10px] inline-flex justify-center items-center`}>
          <Icon
            icon="stash:copy-duotone"
            width="32"
            height="32"
            style={{ color: "#ffffff" }}
          />
          Nomor Berhasil Disalin
        </div>

        <div className="slider-container">
          <Slider {...settings}>
            {emergencyNumbers.map((number, index) => (
              <div className="mx-1" key={index}>
                <div className="flex flex-col justify-between h-[110px] bg-[#f8ebed] p-4 rounded-xl shadow-md">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      <Icon
                        icon="line-md:phone-twotone"
                        width="24"
                        height="24"
                        style={{ color: "#BA324F" }}
                      />
                      <h5>{number}</h5>
                    </div>

                    <Icon
                      icon="stash:copy-duotone"
                      width="32"
                      height="32"
                      style={{ color: "#BA324F", cursor: "pointer" }}
                      onClick={() => handleClick(number)}
                    />
                  </div>
                  <div className="mt-2 text-sm font-medium text-[#BA324F]">
                    {emergencyTitles[index]}
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </>
  );
}

export default EmergencyInfo;
