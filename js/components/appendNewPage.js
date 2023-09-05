import { taskManagerContent } from "../main";
import { getRecentTaskPage } from "../pages/recentTask";
import { getConstructionPage } from "./getConstructionPage";
const mainTitle = document.querySelector(".main-title");

export const appendNewPage = (newPageType, isFromBackBtn = false) => {
  taskManagerContent.innerHTML = "";
  if (newPageType === "recent-tasks") {
    const recentTaskPage = getRecentTaskPage(isFromBackBtn);
    taskManagerContent.append(recentTaskPage);
    mainTitle.textContent = "Recent Task";
    return;
  } else if (newPageType === "statistic") {
    mainTitle.textContent = "Statistic";
  } else if (newPageType === "notes") {
    mainTitle.textContent = "Notes";
  } else if (newPageType === "setting") {
    mainTitle.textContent = "Setting";
  } else if (newPageType === "calender") {
    mainTitle.textContent = "Calender";
  }
  const constructionPage = getConstructionPage(isFromBackBtn);
  taskManagerContent.append(constructionPage);
};
