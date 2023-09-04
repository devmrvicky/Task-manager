import { appendNewPage } from "../components/appendNewPage.js";
import {
  allFolders,
  allTaskList,
  getNoOfAllTask,
  getUsersFromLocalStorage,
  taskManagerContent,
  updateNavigationList,
} from "../main.js";
const logo = document.querySelector(".logo");
const mainTile = document.querySelector(".main-title");

// get all section
// get section head that is common in all section
const getSectionElem = (sectionName) => {
  const section = document.createElement("section");
  section.className = `bg-[#EAF1F1] shadow rounded-3xl p-1 md:p-5 ${sectionName}-section overflow-auto mb-3 sm:mb-0 border sm:w-full max-w-[400px] mx-auto relative`;
  // const sectionHead = getSectionElem("Recent task");
  const sectionHead = document.createElement("div");
  sectionHead.className =
    "section-head flex justify-between items-center sticky top-0 py-3 px-5 md:m-0 m-2 bg-white rounded-3xl";
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

// function for inserting data when user have not written tasks and notes and have not create any folder
const insertEmptyMessage = (parameter, parentElem) => {
  if (!parameter.length) {
    parentElem.innerHTML = `
      <li class="text-xs text-center py-10 px-8 text-zinc-500">You have not Written any task.<br>To write a task please click on floating plus button</li>
    `;
  }
};
// get recent-task-section
const getRecentTaskSection = () => {
  const section = getSectionElem("recent-tasks");
  const recentTasks = document.createElement("ul");
  recentTasks.className =
    "recent-tasks flex flex-col overflow-auto md:pt-6 gap-2 py-5 max-h-[250px]";
  insertEmptyMessage(allTaskList, recentTasks);
  for (let task of allTaskList) {
    // console.log(task);
    const taskItem = document.createElement("li");
    taskItem.className =
      "recent-task flex items-center md:gap-2 py-3 px-5 hover:bg-gray-50 cursor-default rounded-md text-sm";
    taskItem.innerHTML = `
    <i class="fa-regular fa-square${
      task.status === "completed" ? `-check` : ``
    }"></i>
    <p class="task pl-4">${
      task.name.length > 20 ? task.name.slice(0, 20) + "..." : task.name
    }</p>
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
  folderList.className =
    "folders flex gap-2 pt-4 overflow-auto mb-2 mx-2 relative";
  insertEmptyMessage(allFolders, folderList);
  for (let folder of allFolders) {
    const folderItem = document.createElement("li");
    folderItem.className =
      "folder flex flex-col items-center hover:bg-gray-50 bg-[#719191]/20 cursor-default gap-2 py-4 rounded-2xl min-w-[100px] max-w-[100px] w-full flex-1";
    folderItem.innerHTML = `
    <i class="fa fa-folder text-3xl  text-[#719191]"></i>
    <span class="text-xs">${folder.name}</span>
    `;
    folderList.append(folderItem);
  }
  folders.innerHTML += `
    <div class="min-w-[100px] h-full flex items-center p-2 absolute top-0 left-0 group">
      <button class="slide-btn min-w-[20px] h-[20px] mt-5 rounded-full bg-white border hidden items-center justify-center group-hover:flex" id="left">
        <i class="fa-solid fa-angle-left text-sm"></i>
      </button>
    </div>
    <div class="min-w-[100px] h-full flex items-center justify-end p-2 absolute top-0 right-0 group text-right">
      <button class="slide-btn min-w-[20px] h-[20px] mt-5 rounded-full bg-white border hidden items-center justify-center group-hover:flex" id="right">
        <i class="fa-solid fa-angle-right text-sm"></i>
      </button>
    </div>
  `;

  const slideBtns = folders.querySelectorAll(".slide-btn");

  slideBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      if (btn.id === "left") {
        folderList.scrollLeft += folderList.clientWidth;
      } else {
        folderList.scrollLeft -= folderList.clientWidth;
      }
    });
  });

  folders.append(folderList);
  return folders;
};
// get statistic section
const getStatisticSection = () => {
  const statisticSection = getSectionElem("statistic");
  statisticSection.classList.add("cursor-not-allowed");
  const statisticContent = document.createElement("ul");
  statisticContent.innerHTML = `
   <li class="text-xs text-center py-10 px-8 text-zinc-500">This section is currently isn't working.</li>
  `;
  statisticSection.append(statisticContent);
  return statisticSection;
};
// get notes section
const getNoteSection = () => {
  const noteSection = getSectionElem("notes");
  const notesLists = document.createElement("ul");
  insertEmptyMessage(false, notesLists);
  noteSection.append(notesLists);
  return noteSection;
};

// add dashboard content
export const addDashboardElement = (isFromBackBtn = false) => {
  // when addDashboardElement function will be call dashboard push in navigation list
  updateNavigationList(isFromBackBtn, "dashboard");
  getUsersFromLocalStorage();
  mainTile.textContent = "Dashboard";
  getNoOfAllTask();
  // fist clear all html from taskManagerContent
  taskManagerContent.innerHTML = "";
  // add task area element
  const taskArea = document.createElement("div");
  taskArea.setAttribute("data-page", "dashboard");
  taskArea.className = "task-area gap-5 sm:grid w-full lg:w-[70%]";
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
  dateTimeArea.className = "date-time-area pl-10 hidden lg:block";
  dateTimeArea.textContent = "this is date time area";

  // append these element to taskManagerContent
  taskManagerContent.insertAdjacentElement("beforeend", taskArea);
  taskManagerContent.insertAdjacentElement("beforeend", dateTimeArea);

  taskManagerContent.parentElement.style.height = "auto";
};
// addDashboardElement();
logo.addEventListener("click", () => {
  addDashboardElement();
});
