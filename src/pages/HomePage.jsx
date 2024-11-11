import NavBottom from "../components/NavBottom"
import logo from '../assets/images/lg_ss.png'
import CasesSection from "../components/HomePage/CasesSection"
import style from "../assets/css/HomePage.module.css"
import EmergencyInfo from "../components/HomePage/EmergencyInfo"
import EducationSection from "../components/HomePage/EducationSection"


function HomePage(){
    return (
        <>
        <div className={`${style['content-home']} wrapper-mobile`}>
        <div className={`${style['welcome-section']}`}>
        <div className={`${style.logo}`}>
          <img className={`max-w-full`} src={logo}/>
        </div>

        <div className={`${style.greetings} mt-4`}>
          <h6>Halo <span id="nama_lengkap"></span>, Bagaimana Kabarmu?</h6>
        </div>
      </div>
            <CasesSection />
            <EmergencyInfo/>
            <EducationSection/>
        </div>
        <NavBottom />
        </>
    )
}

export default HomePage