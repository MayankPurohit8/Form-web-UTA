import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/Home";
import RuleList from "./pages/RuleList";
import UserRegistration from "./pages/UserRegistration";
import UserRegistration2 from "./pages/UserRegistration2";
import UserLogin from "./pages/UserLogin";
import EditDetails from "./pages/editDetails";
import { ToastContainer } from "react-toastify";
import AdminPage from "./pages/AdminPage";
function App() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/registration" element={<UserRegistration />} />
          <Route path="/registrationnext" element={<UserRegistration2 />} />
          <Route path="/rules" element={<RuleList />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/edit" element={<EditDetails />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
