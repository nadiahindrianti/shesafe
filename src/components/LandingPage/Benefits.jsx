import { Icon } from "@iconify/react/dist/iconify.js";
import style from "../../assets/css/LandingPage.module.css";
import image from "../../assets/images/asset_2.png";

function Benefits() {
  return (
    <>
      <div className={`${style["benefits-section"]}`} id="advantages-section">
        <div className={`${style["benefits-title"]}`}>
          <h4 className="text-lg">Kenapa Memilih SheSafe ?</h4>
        </div>

        <div
          className={`${style["benefits-content"]} flex flex-col gap-4 my-5`}>
          <div className={`${style["benefits-card"]} mt-6 `}>
            <div className={`${style.title}`}>
              {/* <h5>1. Kerahasiaan Dijamin</h5> */}
              <p className="font-bold text-[#BA324F]">
                Di SheSafe, kami percaya bahwa setiap perempuan berhak untuk
                merasa aman dan didukung. Kami berkomitmen menjadi tempat yang
                memberikan kenyamanan, keberanian, dan kesempatan untuk tumbuh
                lebih kuat bersama-sama.
              </p>
            </div>
          </div>

          {/* <div className={`${style["benefits-img"]} mt-12`}>
            <img className={`${style[("img-fluid", "img-2")]}`} src={image} />
          </div> */}
        </div>
      </div>
    </>
  );
}

export default Benefits;
