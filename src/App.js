import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import PaginaPrincipal from "./components/PaginaPrincipal";
import Signup from "./components/Signup";
import AuthContext from "./contexts/AuthContext";
import Timeline from "./pages/Timeline";
import Hashtag from "./pages/Hashtag";
import UpdateHashtagContext from "./contexts/UpdataHashtagContext";
import UserTimeline from "./pages/UserTimeline";
import UpdateUserPage from "./contexts/UpdateUserPage";
import FollowersContext from "./contexts/FollowersContext";
import IsFollowingContext from "./contexts/IsFollowingContext";
import TimelineTest from "./pages/TimelineTest";

export default function App() {
  const [userData, setUserData] = useState();
  const [updataHashtags, setUpdataHashtags] = useState(false);
  const [updateUserPage, setUpdateUserPage] = useState(false);
  const [followers, setFollowers] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);

  return (
    <UpdateUserPage.Provider value={[updateUserPage, setUpdateUserPage]}>
      <UpdateHashtagContext.Provider value={[updataHashtags, setUpdataHashtags]}>
        <AuthContext.Provider value={{ userData, setUserData }}>
          <FollowersContext.Provider value={[followers, setFollowers]}>
            <IsFollowingContext.Provider value={[isFollowing, setIsFollowing]}>
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<PaginaPrincipal />} />
                  <Route path="/sign-up" element={<Signup />} />
                  <Route path="/timeline" element={<TimelineTest />} />
                  <Route path="hashtag/:hashtag" element={<Hashtag />} />
                  <Route path="/user/:id" element={<UserTimeline />} />
                </Routes>
              </BrowserRouter>
            </IsFollowingContext.Provider>
          </FollowersContext.Provider>
        </AuthContext.Provider>
      </UpdateHashtagContext.Provider>
    </UpdateUserPage.Provider>
  );
}
