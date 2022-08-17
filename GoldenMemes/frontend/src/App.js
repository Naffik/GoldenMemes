import HomePage from "./pages/HomePage/HomePage";
import { Routes, Route } from "react-router-dom";
import Registration from "./pages/RegisterPage/Registration";
import RegistrationSuccess from "./pages/RegisterPage/RegistrationSuccess";
import Login from "./pages/LoginPage/Login";
import AddPost from "./pages/AddPostPage/AddPost";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/register/success" element={<RegistrationSuccess />} />
        <Route path="/login" element={<Login />} />
        <Route path="/add" element={<AddPost />} />
      </Routes>
    </div>
  );
}

export default App;
