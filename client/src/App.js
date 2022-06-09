import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginUser, clearUser } from "./reducer/userSlice";
import firebase from "./firebase";

import List from "./components/post/List";
import Upload from "./components/post/Upload";
import Heading from "./components/Heading";
import Detail from "./components/post/Detail";
import Edit from "./components/post/Edit";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((userInfo) => {
      console.log("userInfo : ", userInfo);
      if (userInfo !== null) {
        dispatch(loginUser(userInfo.multiFactor.user));
      } else {
        dispatch(clearUser());
      }
    });
  }, []);

  useEffect(() => {
    console.log("user : ", user);
  }, [user]);

  useEffect(() => {
    // firebase.auth().signOut();
  }, []);

  return (
    <div className="App">
      <Heading />
      <Routes>
        <Route path="/" element={<List />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/detail/:postNum" element={<Detail />} />
        <Route path="/edit/:postNum" element={<Edit />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
