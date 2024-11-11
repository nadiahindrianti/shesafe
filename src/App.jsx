import { Route, Routes } from "react-router-dom";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import Login from "./components/Login-Regist/Login";
import Register from "./components/Login-Regist/Register";
import AddJurnal from "./pages/AddJurnal";
import HomePage from "./pages/HomePage";
import Community from "./pages/Community";
import DetailCom from "./pages/DetailCom";
import Profile from "./pages/Profile";
import Education from "./pages/Education";
import DetailEdu from "./pages/DetailEdu";
import AddCases from "./pages/AddCases";
import Journal from "./pages/Journal";
import MyJournal from "./pages/MyJournal";
// import MyCases from './pages/MyCases'
import ListPengajuanKasus from "./pages/ListPengajuanKasus";
import DetailJurnal from "./pages/DetailJurnal";
import ProtectedRoutes from "./components/ProtectedRoutes";
import EditJurnal from "./pages/EditJurnal";
// import { useDispatch } from "react-redux";
// import { checkAuth } from "./features/userSlice";
// import { useEffect } from "react";
import DetailCase from "./pages/DetailCase";
// import Edit from "./components/Cases/Edit";
import EditCases from "./pages/EditCases";
// import EditCases from "./pages/EditCases";

function App() {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(checkAuth());
  // }, [dispatch]);

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/regist" element={<Register />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/addJurnal" element={<AddJurnal />} />
          <Route path="/editJurnal/:id" element={<EditJurnal />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/community" element={<Community />} />
          <Route path="/community/:id" element={<DetailCom />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/education" element={<Education />} />
          <Route path="/education/:id" element={<DetailEdu />} />
          <Route path="/addCases" element={<AddCases />} />
          <Route path="/journal" element={<Journal />}>
            <Route path="/journal" element={<MyJournal />} />
            <Route path="/journal/mycases" element={<ListPengajuanKasus />} />
          </Route>
          <Route path="/journal/mycases/edit/:id" element={<EditCases />} />
          <Route path="/journal/mycases/detail/:id" element={<DetailCase />} />
          <Route path="/journal/:id" element={<DetailJurnal />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
