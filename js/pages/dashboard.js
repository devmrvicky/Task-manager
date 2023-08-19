import { appendNewPage } from "../components/appendNewPage.js";
import {
  allFolders,
  allTaskList,
  getNoOfAllTask,
  taskManagerContent,
} from "../main.js";
import { getRecentTaskPage } from "./recentTask.js";
const logo = document.querySelector(".logo");
const mainTile = document.querySelector(".main-title");

// get all section
// get section head that is common in all section
const getSectionElem = (sectionName) => {
  const section = document.createElement("section");
  section.className = `bg-white shadow rounded-3xl p-5 ${sectionName}-section overflow-auto`;
  // const sectionHead = getSectionElem("Recent task");
  const sectionHead = document.createElement("div");
  sectionHead.className =
    "section-head flex justify-between items-center sticky top-0";
  const headTitleElem = document.createElement("h3");
  headTitleElem.textContent =
    sectionName[0].toUpperCase() + sectionName.slice(1);
  const headButton = document.createElement("button");
  headButton.className = "show-all text-[#75BAC2]";
  headButton.innerHTML = `
  <span>${sectionName === "Statistic" ? `Show` : `All`}</span>
  <i class="fa-solid fa-angle-right"></i>
  `;
  sectionHead.insertAdjacentElement("beforeend", headTitleElem);
  sectionHead.insertAdjacentElement("beforeend", headButton);
  section.append(sectionHead);

  sectionHead.onclick = () => {
    let pageName = sectionName;
    pageName = pageName === "folders" ? "recent-tasks" : pageName;
    appendNewPage(pageName);
  };

  return section;
};
// get recent-task-section
const getRecentTaskSection = () => {
  const section = getSectionElem("recent-tasks");
  const recentTasks = document.createElement("ul");
  recentTasks.className = "recent-tasks flex flex-col overflow-auto pt-6 gap-2";
  for (let task of allTaskList) {
    // console.log(task);
    const taskItem = document.createElement("li");
    taskItem.className =
      "recent-task flex items-center gap-2  py-3 px-5 hover:bg-gray-50 cursor-default rounded-md text-sm";
    taskItem.innerHTML = `
    <i class="fa-regular fa-square${
      task.status === "completed" ? `-check` : ``
    }"></i>
    <p class="task pl-4">${task.name}</p>
    <span class="task-init-day ml-auto text-xs text-[#75BAC2]">${
      task.time.date
    }</span>
    `;
    recentTasks.append(taskItem);
  }
  section.insertAdjacentElement("beforeend", recentTasks);
  return section;
};
// get folder section
const getFolderSection = () => {
  const folders = getSectionElem("folders");
  const folderList = document.createElement("ul");
  folderList.className = "folders flex pt-4";
  for (let folder of allFolders) {
    // console.log(folder);
    const folderItem = document.createElement("li");
    folderItem.className =
      "folder flex flex-col items-center hover:bg-gray-50 cursor-default gap-2 py-4 rounded-2xl w-28";
    folderItem.innerHTML = `
    <i class="fa fa-folder text-3xl"></i>
    <span class="text-xs">${folder.name}</span>
    `;
    folderList.append(folderItem);
  }
  folders.append(folderList);
  return folders;
};
// get statistic section
const getStatisticSection = () => {
  const statisticSection = getSectionElem("statistic");
  return statisticSection;
};
// get notes section
const getNoteSection = () => {
  const noteSection = getSectionElem("notes");
  return noteSection;
};

// add dashboard content
export const addDashboardElement = () => {
  mainTile.textContent = "Dashboard";
  getNoOfAllTask();
  // fist clear all html from taskManagerContent
  taskManagerContent.innerHTML = "";
  // add task area element
  const taskArea = document.createElement("div");
  taskArea.setAttribute("data-page", "dashboard");
  taskArea.className = "task-area gap-5";
  const recentTaskSection = getRecentTaskSection();
  const folderSection = getFolderSection();
  const statisticSection = getStatisticSection();
  const noteSection = getNoteSection();

  taskArea.insertAdjacentElement("beforeend", recentTaskSection);
  taskArea.insertAdjacentElement("beforeend", folderSection);
  taskArea.insertAdjacentElement("beforeend", statisticSection);
  taskArea.insertAdjacentElement("beforeend", noteSection);

  // add date time area
  const dateTimeArea = document.createElement("div");
  dateTimeArea.className = "date-time-area pl-10";
  dateTimeArea.textContent = "this is date time area";

  // append these element to taskManagerContent
  taskManagerContent.insertAdjacentElement("beforeend", taskArea);
  taskManagerContent.insertAdjacentElement("beforeend", dateTimeArea);
};
// addDashboardElement();
logo.addEventListener("click", addDashboardElement);
window.onload = () => {
  addDashboardElement();
};
