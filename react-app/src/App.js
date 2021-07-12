import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import UserPage from "./components/userPage/userPage";
import Group from "./components/groups/group";
import NewGroup from "./components/groups/newgroup";
import UserCard from "./components/finder-cards/usercard";
import GroupCard from "./components/finder-cards/groupcard";
import MatchedGroups from "./components/matches/matched_groups";
import ChatsList from "./components/chats/chats_list";
import Chat from "./components/chats/chat";
import { authenticate } from "./store/session";
import SplashPage from "./components/splash/splash";
import Footer from "./components/footer/footer";

function App() {
  // const [authenticated, setAuthenticated] = useState(false);
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  const user = useSelector((state) => ({ ...state.session.user }));

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <div className="app_container__div">
        <NavBar />
        <Switch>
          <Route path="/login" exact={true}>
            <LoginForm />
          </Route>
          <Route path="/sign-up" exact={true}>
            <SignUpForm />
          </Route>
          <ProtectedRoute path="/me" exact={true}>
            <UserPage />
          </ProtectedRoute>
          <ProtectedRoute path="/group" exact={true}>
            <Group />
          </ProtectedRoute>
          <ProtectedRoute path="/groups/new" exact={true}>
            <NewGroup />
          </ProtectedRoute>
          <ProtectedRoute path="/recruit">
            <UserCard />
          </ProtectedRoute>
          <ProtectedRoute path="/join">
            <GroupCard />
          </ProtectedRoute>
          <ProtectedRoute path="/matches/groups">
            <MatchedGroups />
          </ProtectedRoute>
          <Route path="/" exact={true}>
            {user.username  ? <UserPage /> : <SplashPage />}
          </Route>
        </Switch>
        <ProtectedRoute path="/chats">
          <ChatsList />
        </ProtectedRoute>
        <ProtectedRoute path="/chats/:chatId">
          <Chat />
        </ProtectedRoute>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
