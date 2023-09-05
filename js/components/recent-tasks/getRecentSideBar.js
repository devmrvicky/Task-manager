import { getContentSideBar } from "../common/getContentSideBar.js";

export const getRecentTaskSideBar = () => {
  const recentTaskSideBar = getContentSideBar("recent-tasks");
  return recentTaskSideBar;
};
