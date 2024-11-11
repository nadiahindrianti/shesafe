import { Icon } from "@iconify/react";
import style from "../../assets/css/LandingPage.module.css";
function Guide() {
  return (
    <>
      <div className={`${style["guide-secion"]}`} id="guide-section">
        <div className={`${style["guide-title"]} `}>
          <h4 className="text-lg">Fitur Utama</h4>
        </div>

        <div
          className={`${style["guide-content"]} flex flex-col gap-4 my-5 mx-5`}>
          <div className={`${style["guide-card"]} `}>
            <div>
              <Icon
                icon="healthicons:i-note-action-outline"
                width="60"
                height="60"
                style={{ color: "#BA324F" }}
              />
            </div>
            <div className={`${style.title}`}>
              <h5 className="text-lg">1. Jurnal Pribadi</h5>
              <p>
                <b>Ceritakan pengalamanmu tanpa rasa takut.</b>
              </p>
              <p>
                SheSafe menyediakan ruang pribadi di mana kamu bisa menuliskan
                perasaan dan pengalaman secara aman dan nyaman.
              </p>
            </div>
          </div>

          <div className={`${style["guide-card"]} `}>
            <div>
              <Icon
                icon="solar:hand-heart-outline"
                width="60"
                height="60"
                style={{ color: "#BA324F" }}
              />
            </div>
            <div className={`${style.title} flex flex-col gap-1`}>
              <h5 className="text-lg">
                2. Pengajuan Kasus & Dukungan Komunitas
              </h5>
              <p>
                <b>Dapatkan dukungan nyata dari komunitas yang peduli.</b>{" "}
              </p>
              <p>
                {" "}
                Ajukan kasus dengan mudah dari jurnal pribadimu, dan biarkan
                cerita kamu membantu meningkatkan kesadaran.
              </p>
            </div>
          </div>

          <div className={`${style["guide-card"]} `}>
            <div>
              <Icon
                icon="hugeicons:message-favourite-01"
                width="60"
                height="60"
                style={{ color: "#BA324F" }}
              />
            </div>
            <div className={`${style.title}`}>
              <h5 className="text-lg">
                3. Refleksi Diri & Notifikasi Inspiratif
              </h5>
              <p>
                <b>Temukan kekuatan dari dalam.</b>
              </p>
              <p>
                Dapatkan notifikasi pengingat refleksi diri yang memberikan
                semangat, menanyakan kabar, dan memberikan saran untuk langkah
                selanjutnya.
              </p>
            </div>
          </div>

          <div className={`${style["guide-card"]} `}>
            <div>
              <Icon
                icon="iconoir:learning"
                width="60"
                height="60"
                style={{ color: "#BA324F" }}
              />
            </div>
            <div className={`${style.title}`}>
              <h5 className="text-lg">4. Modul Edukasi & Pelatihan</h5>
              <p>
                <b>Pelajari keterampilan baru untuk hari yang lebih baik.</b>
              </p>
              <p>
                {" "}
                SheSafe menawarkan modul edukasi yang relevan untuk
                memberdayakan diri dan meningkatkan pengetahuan kamu.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Guide;
