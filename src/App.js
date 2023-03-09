import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import PaginaPrincipal from "./components/PaginaPrincipal";
import Signup from "./components/Signup";
import Home from "./components/Home";
import AuthContext from "./contexts/AuthContext";
import Timeline from "./pages/Timeline";
import Hashtag from "./pages/Hashtag";
import UpdateHashtagContext from "./contexts/UpdataHashtagContext";
import UserTimeline from "./pages/UserTimeline";

export default function App() {
  const [userData, setUserData] = useState({
    email: "",
    name: "",
    Password: "",
    token: "",
    _id: "",
  });
  const [updataHashtags, setUpdataHashtags] = useState(false);

  return (
    <UpdateHashtagContext.Provider value={[updataHashtags, setUpdataHashtags]}>
      <AuthContext.Provider value={{ userData, setUserData }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<PaginaPrincipal />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/home" element={<Home />} />
            <Route path="/timeline" element={Timeline()} />
            <Route path="hashtag/:hashtag" element={<Hashtag />} />
            <Route path="/usertimeline/:id" element={<UserTimeline />} />
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
    </UpdateHashtagContext.Provider>
  );
}
