// import { flip } from "./dashboard.js";

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

const getRecentTaskSideBar = () => {
  const recentTaskSideBar = document.createElement("ul");
  recentTaskSideBar.className =
    "recent-task-sidebar-item p-3 bg-[#EAF1F1] w-3/12 rounded-xl text-[#719191] flex flex-col gap-3 border";
  recentTaskSideBar.innerHTML = `
  <li class="task-item active hover:bg-white cursor-default flex items-center gap-2 py-2 px-4 rounded-full" data-role="show-task" data-name="recent"><i class="fa-solid fa-clock"></i><span>Recent</span><span class="ml-auto">${allTaskList.length}</span></li>
  <li class="task-item hover:bg-white cursor-default flex items-center gap-2 py-2 px-4 rounded-full" data-role="show-task" data-name="completed"><i class="fa-solid fa-circle-check"></i><span>Completed</span><span class="ml-auto">${noOfCompletedTask}</span></li>
  <li class="task-item hover:bg-white cursor-default flex items-center gap-2 py-2 px-4 rounded-full" data-role="show-task" data-name="archived"><i class="fa-solid fa-box-archive"></i><span>Archived</span><span class="ml-auto"></span></li>
  <li class="task-item hover:bg-white cursor-default flex items-center gap-2 py-2 px-4 rounded-full" data-role="show-task" data-name="deleted"><i class="fa-solid fa-trash"></i><span>Deleted</span><span class="ml-auto"></span></li>

  <li class="task-item folder mt-10 overflow-hidden flex items-center flex-col gap-3" data-name="folder">
    <div class="hover:bg-white cursor-default flex items-center gap-2 py-2 px-4 w-full rounded-full ">
      <i class="fa-solid fa-angle-down"></i><span>Folders</span><span class="ml-auto">${allFolders.length}</span>
    </div>
  </li>
  <li class="task-item tags cursor-default flex flex-col gap-3 items-center overflow-hidden" data-name="tags">
    <div class="hover:bg-white cursor-default flex items-center gap-2 py-2 px-4 w-full rounded-full">
    <i class="fa-solid fa-angle-down"></i><span>Tags</span><span class="ml-auto">${allTags.length}</span>
    </div>
  </li>
`;
  return recentTaskSideBar;
};
const getRecentTaskList = (task, isFromFolder = false) => {
  const li = document.createElement("li");
  li.className = `flex gap-3 cursor-default flex-col ${
    isFromFolder ? "" : "main-li"
  }`;
  li.innerHTML = `
  <div class="w-full flex gap-3">
    <div class="bg-white p-4 flex items-center rounded-xl">
      ${
        task.status === "completed"
          ? `<i class="fa-solid fa-square-check"></i>`
          : `<i class="fa-regular fa-square"></i>`
      }
    </div>
    ${
      isFromFolder
        ? `<div class="m-3 self-center w-6"><img src="/curved-arrow.png"></div>`
        : ""
    }
    <div class="bg-white flex flex-1 gap-2 p-4 rounded-xl">
      ${task.folder ? `<i class="fa fa-folder text-4xl"></i>` : ""}
     <div class="flex-1 ml-4">
      <div class="flex">
        <div>
          <p class="group">${task.name} ${
    task.folder
      ? ""
      : `<span class="ml-2 text-xs text-[#999]/0 group-hover:text-[#999]/50">from ${task.name}</span>`
  }</p>
          <div class="text-[#719191] text-xs"><i class="fa fa-calendar"></i> ${
            task.time.date
          } ${
    task.time.init && task.time.end
      ? `, ${task.time.init} - ${task.time.end}`
      : ""
  }</div>
        </div>
        <ul class="tags flex items-center gap-4 ml-auto text-xs">
          ${task.tags.map((tag) => `<li>${tag}</li>`).join("")}
        </ul>
       </div>
      ${
        task.folder
          ? `<div class="text-xs flex items-center mt-2 gap-4">
        <div class="flex-1 h-1.5 bg-[#999]/10 rounded-full overflow-hidden"><div style="width: calc((${
          task.completedTask * 100
        }% / ${task.tasks.length}));
        " class="progress bg-[#719191] h-full"></div></div>
        <div>${task.completedTask} / ${task.tasks.length} tasks completed</div>`
          : ""
      }
      </div>
     </div>
     ${
       task.folder
         ? `<div class="self-center ml-4">
       <i class="fa-solid fa-angle-down text-2xl"></i>
     </div>`
         : ""
     }
    </div>
    </div>
    `;
  return li;
};
const showRecentTaskList = (tasks, taskList, isFromFolder) => {
  for (let task of tasks) {
    // if (task.folder) {
    let li = getRecentTaskList(task, isFromFolder);
    const downAngle = li.querySelector("i.fa-angle-down");
    downAngle?.addEventListener("click", (e) => {
      li.classList.toggle("show");
      if (!li.children[1]) {
        if (task.folder) {
          const nestedTaskList = document.createElement("ul");
          nestedTaskList.className = "nested mt-2 flex flex-col gap-2";
          showRecentTaskList(task.tasks, nestedTaskList, true);
          li.insertAdjacentElement("beforeend", nestedTaskList);
        }
      } else {
        li.children[1].remove();
      }
    });
    taskList.insertAdjacentElement("beforeend", li);
    // }
  }
};
const getRecentTaskPage = () => {
  // isAppend = true;
  // flip();
  getNoOfAllTask();
  const recentTaskContent = document.createElement("div");
  recentTaskContent.className = "w-full flex gap-5";
  const recentTaskSideBar = getRecentTaskSideBar();

  const recentTaskMainContent = document.createElement("div");
  recentTaskMainContent.className = "border flex-1 bg-[#EAF1F1] p-3 rounded-xl";
  recentTaskMainContent.innerHTML = `
  <div class="recent-task-head w-full flex items-center gap-3 text-[#719191]">
    <select class="tags rounded-full p-2 px-5">
      <option value="all tag" disabled selected>All tags</option>
      ${allTags.map((tag) => `<option value="${tag}">${tag}</option>`).join("")}
    </select>
    <div class="ml-auto flex items-center gap-4 cursor-default hover:bg-white/50 px-4 py-2 rounded-full">
      <span>Sort by</span>
      <i class="fa-solid fa-arrow-down-wide-short"></i>
    </div>
  </div>
  `;
  const taskList = document.createElement("ul");
  taskList.className = "main-task-list mt-4 flex flex-col gap-4";

  // by default show recent task list
  showRecentTaskList(allTasks.recentTask, taskList);

  const recentTaskSideBarItems = recentTaskSideBar.querySelectorAll("li");
  recentTaskSideBarItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      item.classList.toggle("show");
      if (e.currentTarget.dataset.role === "show-task") {
        taskList.innerHTML = "";
        // show active item
        for (let sideBarItem of recentTaskSideBarItems) {
          if (sideBarItem.classList.contains("active")) {
            sideBarItem.classList.remove("active");
          }
        }
        item.classList.toggle("active");
        if (item.dataset.name === "recent") {
          showRecentTaskList(allTasks.recentTask, taskList);
        } else if (item.dataset.name === "completed") {
          let completedTask = allTaskList.filter(
            (task) => task.status === "completed"
          );
          showRecentTaskList(completedTask, taskList);
        }
      } else {
        const ul = document.createElement("ul");
        ul.className =
          "nested-folder-tags flex items-center gap-3 flex-wrap border w-full";
        if (!item.children[1]) {
          if (item.dataset.name === "folder") {
            showFolderTags(allFolders, ul);
          } else if (item.dataset.name === "tags") {
            showFolderTags(allTags, ul);
          }
          item.insertAdjacentElement("beforeend", ul);
        } else {
          if (
            !(
              e.target.classList.contains("nested-folder-tags") ||
              e.target.parentElement.classList.contains("nested-folder-tags") ||
              e.target.parentElement.parentElement.classList.contains(
                "nested-folder-tags"
              )
            )
          ) {
            item.querySelector(".nested-folder-tags").remove();
          }
        }
      }
    });
  });

  recentTaskMainContent.insertAdjacentElement("beforeend", taskList);
  recentTaskContent.insertAdjacentElement("afterbegin", recentTaskSideBar);
  recentTaskSideBar.insertAdjacentElement("afterend", recentTaskMainContent);
  return recentTaskContent;
};

// show folder and tags items
function showFolderTags(itemsList, ul) {
  for (let item of itemsList) {
    const li = document.createElement("li");
    li.className = "rounded-xl bg-white p-3 flex items-center flex-col gap-2";
    li.innerHTML = `
    ${
      item.folder
        ? `<i class="fa-solid fa-folder fa-2x"></i>
           <span class="text-xs">${item.name}</span>`
        : `<span class="text-sm">${item}</span>`
    }
    `;

    // add eventListener
    li.addEventListener("click", (e) => {
      const taskList = document.querySelector(".main-task-list");
      taskList.innerHTML = "";
      if (item.folder) {
        showRecentTaskList([item], taskList);
      } else {
        for (let newItem of allTasks.recentTask) {
          showTaskFromTags(item, newItem);
        }
      }
    });

    ul.append(li);
  }
}

// show task from tags
function showTaskFromTags(item, newItem) {
  const taskList = document.querySelector(".main-task-list");
  if (newItem.tags.includes(item)) {
    showRecentTaskList([newItem], taskList);
    // select.value = item;
  }
}

const getStatisticPage = () => {
  const h1 = document.createElement("h1");
  h1.textContent = "Hello there..., this is statistic page";
  return h1;
};

const appendNewPage = (newPageType) => {
  taskManagerContent.innerHTML = "";
  if (newPageType === "task-opt") {
    const recentTaskPage = getRecentTaskPage();
    taskManagerContent.append(recentTaskPage);
  } else if (newPageType === "statistic-opt") {
    const statisticPage = getStatisticPage();
    taskManagerContent.append(statisticPage);
  }
};

menuOptions.forEach((menuOption) => {
  menuOption.addEventListener("click", (e) => {
    for (const menu of menuOptions) {
      if (menu.classList.contains("active")) {
        menu.classList.remove("active");
      }
    }
    e.currentTarget.classList.toggle("active");
    appendNewPage(e.currentTarget.id);
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
export { allTaskList, taskManagerContent, allFolders, getNoOfAllTask };
