import { appendNewPage } from "./components/appendNewPage.js";
import { getTextEditor } from "./components/getTextEditor.js";
import "./pages/dashboard.js";

const mainApp = document.querySelector("main");
const mainSideBar = document.querySelector(".task-manager-side-bar");
const menuOptions = document.querySelectorAll(".menu-option");
const profImg = document.querySelector(".prof img");
const taskManagerContent = document.querySelector(".task-manager-content");
const openTextEditorBtn = document.querySelector(".open-text-editor");

// global variable
let allTaskList = [];
let noOfCompletedTask = 0;
let allFolders = [];
let allTags = [];

// task object
const allTasks = {
  recentTask: [
    {
      folder: true,
      name: "Call Mattew",
      status: "uncompleted",
      tags: ["web", "design"],
      time: {
        date: "19 may",
        init: "17:30",
        end: "18:00",
      },
      completedTask: 1,
      tasks: [
        {
          name: "Approve header",
          time: {
            date: "19 may",
            init: "17:30",
            end: "18:00",
          },
          status: "completed",
          tags: ["web", "design"],
        },
        {
          name: "Book a meeting with team",
          time: {
            date: "19 may",
            init: "17:30",
            end: "18:00",
          },
          status: "uncompleted",
          tags: ["web", "design"],
        },
      ],
    },
    {
      folder: false,
      name: "Write to council",
      status: "completed",
      tags: [],
      time: {
        date: "19 may",
        init: "",
        end: "",
      },
    },
    {
      folder: true,
      name: "Buy watercolor",
      status: "uncompleted",
      tags: ["party", "office"],
      time: {
        date: "19 may",
        init: "",
        end: "",
      },
      completedTask: 0,
      tasks: [
        {
          name: "Approve header",
          time: {
            date: "19 may",
            init: "17:30",
            end: "18:00",
          },
          status: "completed",
          tags: ["web", "design"],
        },
        {
          name: "Book a meeting with team",
          time: {
            date: "19 may",
            init: "17:30",
            end: "18:00",
          },
          status: "uncompleted",
          tags: ["web", "design"],
        },
      ],
    },
  ],
  completedTask: [],
};

function getNoOfAllTask() {
  allTaskList = [];
  noOfCompletedTask = 0;
  allFolders = [];
  allTags = [];
  for (let task of allTasks.recentTask) {
    allTags = allTags.concat(task.tags);
    if (task.folder) {
      allTaskList = allTaskList.concat(task.tasks);
      noOfCompletedTask += task.completedTask;
      allFolders = allFolders.concat(task);
    } else {
      allTaskList = allTaskList.concat(task);
      if (task.status === "completed") noOfCompletedTask += 1;
    }
  }
}

menuOptions.forEach((menuOption) => {
  menuOption.addEventListener("click", (e) => {
    for (const menu of menuOptions) {
      if (menu.classList.contains("active")) {
        menu.classList.remove("active");
      }
    }
    e.currentTarget.classList.toggle("active");
    appendNewPage(e.currentTarget.dataset.page);
  });
});

profImg.addEventListener("click", (e) => {
  console.log("clicked");
  mainSideBar.classList.toggle("show-side-bar");
  e.stopPropagation();
});

const openTextEditor = () => {
  const textEditorContainer = document.createElement("div");
  textEditorContainer.className =
    "text-editor-container w-full h-full fixed top-0 shadow bg-white/50 backdrop-blur-sm flex items-center justify-center p-24";
  const pageName = taskManagerContent.children[0].dataset.page;
  textEditorContainer.setAttribute("data-page-name", pageName);
  if (document.querySelector(".text-editor-container")) return;
  const textEditor = getTextEditor();
  textEditorContainer.append(textEditor);
  mainApp.append(textEditorContainer);

  const closeButton = textEditor.querySelector(".close-editor");
  closeButton.addEventListener("click", () => {
    textEditorContainer.remove();
  });
};
// add event listener for open text editor btn
openTextEditorBtn.addEventListener("click", openTextEditor);

// export something
export default allTasks;
export {
  allTaskList,
  taskManagerContent,
  allFolders,
  getNoOfAllTask,
  noOfCompletedTask,
  allTags,
  allTasks,
};
