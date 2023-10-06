import { Navigate, Outlet } from "react-router-dom";

import { getUserCredential } from "../utils/helpers/storageHelper";
import { authRoute } from "./routeKeys";
import ForumMenu from "../components/layout/ForumMenu";

export default function PrivateRoute() {
  const userCredential = getUserCredential();

  if (userCredential === null) {
    return <Navigate to={authRoute} />;
  }

  return (
    <ForumMenu>
      <Outlet />
    </ForumMenu>
  );
}
