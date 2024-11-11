import { useEffect, useRef, useState } from "react";
import style from "../assets/css/Navbottom.module.css";
import { Link, useLocation } from "react-router-dom";
import { Icon } from "@iconify/react";

function NavBottom() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const popupRef = useRef(null);
  const location = useLocation();

  const showMenuPopUp = () => {
    setIsPopupOpen(!isPopupOpen);

    setTimeout(() => {
      document.addEventListener("click", closePopupOnClickOutside);
    }, 0);
    //   console.log("show");
  };

  const closePopupOnClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setIsPopupOpen(false);
      document.removeEventListener("click", closePopupOnClickOutside);
      //   console.log("close");
    }
  };

  return (
    <>
      <div className={`${style["navigation-container-bottom"]}`}>
        <div className={`${style["navigation-bottom"]}`} id="navigation-bottom">
          <Link
            to="/home"
            className={`${style["nav-content"]} ${
              location.pathname === "/home" ? style.active : ""
            }`}>
            <div className="w-[30px] h-[30px]">
              <Icon
                icon="fluent:home-28-regular"
                width="33"
                height="33"
                style={{
                  color: location.pathname === "/home" ? "#ba324f" : "#8c8c8c",
                }}
              />
            </div>
            <p className="text-sm">Beranda</p>
          </Link>

          <Link
            to="/journal"
            className={`${style["nav-content"]} ${
              location.pathname === "/journal" ||
              location.pathname === "/journal/mycases"
                ? style.active
                : ""
            }`}>
            <div className="w-[30px] h-[30px]">
              <Icon
                icon="material-symbols-light:history-edu-outline"
                width="33"
                height="33"
                style={{
                  color:
                    location.pathname === "/journal" ||
                    location.pathname === "/journal/mycases"
                      ? "#ba324f"
                      : "#8c8c8c",
                }}
              />
            </div>
            <p className="text-sm">Jurnal</p>
          </Link>

          <div className={`${style["nav-content"]} `} onClick={showMenuPopUp}>
            <div className={`${style["pop-button"]}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="41"
                height="41"
                viewBox="0 0 41 41"
                fill="none">
                <path
                  d="M20.5 35.5C17.7433 35.5 15.5 33.2567 15.5 30.5L15.5883 25.4117L10.53 25.5C7.74333 25.5 5.5 23.2567 5.5 20.5C5.5 17.7433 7.74333 15.5 10.5 15.5L15.5883 15.41L15.5 10.53C15.5 7.74333 17.7433 5.5 20.5 5.5C23.2567 5.5 25.5 7.74333 25.5 10.5L25.5917 15.41L30.53 15.5C33.2567 15.5 35.5 17.7433 35.5 20.5C35.5 23.2567 33.2567 25.5 30.5 25.5L25.5917 25.4117L25.5 30.53C25.5 33.2567 23.2567 35.5 20.5 35.5ZM18.8333 22.1667V30.53C18.8333 31.4183 19.5817 32.1667 20.5 32.1667C21.4183 32.1667 22.1667 31.4183 22.1667 30.5V22.1667H30.53C31.4183 22.1667 32.1667 21.4183 32.1667 20.5C32.1667 19.5817 31.4183 18.8333 30.5 18.8333H22.1667V10.5C22.1667 9.55167 21.4183 8.83333 20.5 8.83333C19.5817 8.83333 18.8333 9.58167 18.8333 10.5V18.8333H10.5C9.55167 18.8333 8.83333 19.5817 8.83333 20.5C8.83333 21.4183 9.58167 22.1667 10.5 22.1667H18.8333Z"
                  fill="white"
                />
              </svg>
            </div>
          </div>

          <Link
            to="/community"
            className={`${style["nav-content"]} ${
              location.pathname === "/community" ? style.active : ""
            }`}>
            <div className="w-[30px] h-[30px]">
              <Icon
                icon="fluent:people-chat-24-regular"
                width="30"
                height="30"
                style={{
                  color:
                    location.pathname === "/community" ? "#ba324f" : "#8c8c8c",
                }}
              />
            </div>
            <p className="text-sm">Komunitas</p>
          </Link>

          <Link
            to="/profile"
            className={`${style["nav-content"]} ${
              location.pathname === "/profile" ? style.active : ""
            }`}>
            <div className="w-[30px] h-[30px]">
              <Icon
                icon="iconamoon:profile-light"
                width="33"
                height="33"
                style={{
                  color:
                    location.pathname === "/profile" ? "#ba324f" : "#8c8c8c",
                }}
              />
            </div>
            <p className="text-sm">Akun</p>
          </Link>
        </div>
      </div>

      <div className={`${style["popup-container"]}`}>
        <div
          className={`${style["popup-menu"]} ${isPopupOpen ? style.show : ""}`}
          id="popup-menu"
          ref={popupRef}>
          <div className={`${style.rectangle}`}></div>

          <div className={`${style["popup-detail"]}`}>
            <Link to="/addCases" className={`${style["popup-content"]}`}>
              <Icon
                icon="healthicons:i-note-action-outline"
                width="51"
                height="36"
                style={{ color: "#BA324F" }}
              />
              <p className="text-sm">Ajukan Kasus</p>
            </Link>
            <Link to="/addJurnal" className={`${style["popup-content"]}`}>
              <Icon
                icon="material-symbols-light:history-edu-outline"
                width="51"
                height="36"
                style={{ color: "#BA324F" }}
              />
              <p className="text-sm">Buat Jurnal</p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default NavBottom;
