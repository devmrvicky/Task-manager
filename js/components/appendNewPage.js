import { openTextEditorBtn, taskManagerContent } from "../main";
import getBugReportingPage from "../pages/bugsReporting";
import { getNotesPage } from "../pages/notes";
import { getRecentTaskPage } from "../pages/recentTask";
import getSuggestionPage from "../pages/suggestions";
import getTodoPage from "../pages/todo";
import { getConstructionPage } from "./getConstructionPage";
const mainTitle = document.querySelector(".main-title");

export const appendNewPage = (newPageType, isFromBackBtn = false) => {
  openTextEditorBtn.style.display = "block";
  // if more page option container is open close it when new page append
  document
    .querySelector(".more-page-opt-container")
    .classList.remove("show-more-page-opt-container");
  taskManagerContent.innerHTML = "";
  if (newPageType === "recent-tasks") {
    const recentTaskPage = getRecentTaskPage(isFromBackBtn);
    taskManagerContent.append(recentTaskPage);
    mainTitle.textContent = "Recent Task";
    return;
  } else if (newPageType === "statistic") {
    mainTitle.textContent = "Statistic";
  } else if (newPageType === "notes") {
    const notesPage = getNotesPage(isFromBackBtn);
    taskManagerContent.append(notesPage);
    mainTitle.textContent = "Notes";
    return;
  } else if (newPageType === "todo") {
    const notesPage = getTodoPage(isFromBackBtn);
    taskManagerContent.append(notesPage);
    mainTitle.textContent = "todo";
    openTextEditorBtn.style.display = "none";
    return;
  } else if (newPageType === "setting") {
    mainTitle.textContent = "Setting";
  } else if (newPageType === "calender") {
    mainTitle.textContent = "Calender";
  } else if (newPageType === "bugs") {
    const bugsReportingPage = getBugReportingPage(isFromBackBtn);
    taskManagerContent.append(bugsReportingPage);
    mainTitle.textContent = "Bugs";
    return;
  } else if (newPageType === "suggestion") {
    const suggestionsPage = getSuggestionPage(isFromBackBtn);
    taskManagerContent.append(suggestionsPage);
    mainTitle.textContent = "Suggestion";
    return;
  }
  const constructionPage = getConstructionPage(isFromBackBtn);
  taskManagerContent.append(constructionPage);
};
