import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { lazy } from "@loadable/component";
import "./App.css";

// components
import HomeMenu from "./components/layout/HomeMenu";
import HeroPage from "./components/home/HeroPage";
import PrivateRoute from "./routes/PrivateRoute";

import { homeRoute, forumRoute, authRoute } from "./routes/routeKeys";

// const HomeComponent = lazy(() => import )
const ForumHomePage = lazy(() => import("./components/forum/ForumHomePage"));
const AuthPage = lazy(() => import("./components/auth/AuthPage"));

function App() {
  return (
    <div className="App">
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route
            path={homeRoute}
            element={
              <HomeMenu>
                <>
                  <HeroPage />
                </>
              </HomeMenu>
            }
          />

          <Route path={authRoute} element={<AuthPage />} />
          <Route path={forumRoute} element={<PrivateRoute />}>
            <Route path={forumRoute} element={<ForumHomePage />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
