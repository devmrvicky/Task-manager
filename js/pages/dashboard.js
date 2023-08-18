import {
  allFolders,
  allTaskList,
  getNoOfAllTask,
  taskManagerContent,
} from "../main.js";
const logo = document.querySelector(".logo");

// get all section
// get section head that is common in all section
const getSectionHead = (headTitle) => {
  const sectionHead = document.createElement("div");
  sectionHead.className = "section-head flex justify-between items-center";
  const headTitleElem = document.createElement("h3");
  headTitleElem.textContent = headTitle;
  const headButton = document.createElement("button");
  headButton.className = "show-all";
  headButton.innerHTML = `
  <span>${headTitle === "Statistic" ? `Show` : `All`}</span>
  <i class="fa-solid fa-angle-right"></i>
  `;
  sectionHead.insertAdjacentElement("beforeend", headTitleElem);
  sectionHead.insertAdjacentElement("beforeend", headButton);
  return sectionHead;
};
// get recent-task-section
const getRecentTaskSection = () => {
  const section = document.createElement("section");
  section.className = "bg-white shadow rounded-xl p-5 recent-tasks-section";
  const sectionHead = getSectionHead("Recent task");
  const recentTasks = document.createElement("ul");
  recentTasks.className = "recent-tasks flex flex-col overflow-auto pt-6";
  for (let task of allTaskList) {
    // console.log(task);
    const taskItem = document.createElement("li");
    taskItem.className =
      "recent-task flex items-center gap-2  p-3 hover:bg-gray-50 cursor-default";
    taskItem.innerHTML = `
    <i class="fa-regular fa-square${
      task.status === "completed" ? `-check` : ``
    }"></i>
    <p class="task">${task.name}</p>
    <span class="task-init-day  ml-auto text-sm">${task.time.date}</span>
    `;
    recentTasks.append(taskItem);
  }

  section.insertAdjacentElement("beforeend", sectionHead);
  section.insertAdjacentElement("beforeend", recentTasks);
  return section;
};
// get folder section
const getFolderSection = () => {
  const folderSection = document.createElement("section");
  folderSection.className = "bg-white shadow rounded-xl p-5 folders-section";
  const sectionHead = getSectionHead("Folders");
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

  folderSection.append(sectionHead);
  folderSection.append(folderList);
  return folderSection;
};
// get statistic section
const getStatisticSection = () => {
  const statisticSection = document.createElement("section");
  statisticSection.className =
    "bg-white shadow rounded-xl p-5 statistic-section";
  const sectionHead = getSectionHead("Statistic");
  statisticSection.insertAdjacentElement("beforeend", sectionHead);
  return statisticSection;
};
// get notes section
const getNoteSection = () => {
  const noteSection = document.createElement("section");
  noteSection.className = "bg-white shadow rounded-xl p-5 notes-section";
  const sectionHead = getSectionHead("Note");
  noteSection.insertAdjacentElement("beforeend", sectionHead);
  return noteSection;
};

// add dashboard content
const addDashboardElement = () => {
  getNoOfAllTask();
  // fist clear all html from taskManagerContent
  taskManagerContent.innerHTML = "";
  // add task area element
  const taskArea = document.createElement("div");
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
  dateTimeArea.className = "date-time-area";
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
