import HomePage from "./pages/HomePage/HomePage";
import { Routes, Route } from "react-router-dom";
import Registration from "./pages/RegisterPage/Registration";
import RegistrationSuccess from "./pages/RegisterPage/RegistrationSuccess";
import Login from "./pages/LoginPage/Login";
import AddPost from "./pages/AddPostPage/AddPost";
import store, { Persistor } from "./store/configureStore";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { injectStore } from "./api/apiCalls";

function App() {
  injectStore(store); //I can now use redux store in my apiCalls.js file

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={Persistor}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/register/success" element={<RegistrationSuccess />} />
          <Route path="/login" element={<Login />} />
          <Route path="/add" element={<AddPost />} />
        </Routes>
      </PersistGate>
    </Provider>
  );
}

export default App;
