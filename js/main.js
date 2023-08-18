import { appendNewPage } from "./components/appendNewPage.js";
import "./pages/dashboard.js";

const menuOptions = document.querySelectorAll(".menu-option");
const taskManagerContent = document.querySelector(".task-manager-content");

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

window.addEventListener("DOMContentLoaded", () => {
  menuOptions.forEach((menu) => {
    if (menu.id === "task-opt") {
      // menu.click();
    }
  });
});

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
