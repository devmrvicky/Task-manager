import { taskManagerContent } from "../main";
import { getRecentTaskPage } from "../pages/recentTask";
const mainTitle = document.querySelector(".main-title");

export const appendNewPage = (newPageType) => {
  taskManagerContent.innerHTML = "";
  if (newPageType === "recent-tasks") {
    const recentTaskPage = getRecentTaskPage();
    taskManagerContent.append(recentTaskPage);
    mainTitle.textContent = "Recent Task";
  } else if (newPageType === "statistic") {
    // const statisticPage = getStatisticPage();
    // mainTitle.textContent = "Statistic";
    // taskManagerContent.append(statisticPage);
  }
};
