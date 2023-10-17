import {
  activeUsersDashboardTag,
  newUsersDashboardTag,
} from "../../service/queryTags";
import { activeUsersText, newUsersText } from "../../utils/string";
import UsersPanelDashboard from "../user/UsersPanelDashboard";
import StatsPanel from "./StatsPanel";

export default function ForumHomePage() {
  return (
    <>
      <StatsPanel />
      <UsersPanelDashboard
        title={newUsersText}
        queryTag={newUsersDashboardTag}
      />
      <UsersPanelDashboard
        title={activeUsersText}
        queryTag={activeUsersDashboardTag}
      />
    </>
  );
}
