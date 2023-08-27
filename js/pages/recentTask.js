import { getRecentTaskSideBar } from "../components/getRecentSideBar.js";
import { getRecentTaskList } from "../components/getRecentTaskList.js";
import { updateUsersTasksList } from "../components/getTextEditor.js";
import {
  getNoOfAllTask,
  allTaskList,
  allFolders,
  allTags,
  allTasks,
  taskManagerContent,
} from "../main.js";

const showRecentTaskList = (tasks, taskList, isFromFolder) => {
  for (let task of tasks) {
    let li = getRecentTaskList(task, isFromFolder);
    const downAngle = li.querySelector("i.fa-angle-down");
    downAngle?.addEventListener("click", () => {
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

    // get updated tasks list
    const getUpdatedTasksList = (status) => {
      let updatedTaskObj = {};
      let updatedNestedTasks = [];
      if (task.folder) {
        for (let nestedTask of task.tasks) {
          nestedTask = { ...nestedTask, status };
          updatedNestedTasks.push(nestedTask);
        }
        updatedTaskObj.completedTask = `${
          status === "completed" ? task.tasks.length : 0
        }`;
      }
      updatedTaskObj = {
        ...task,
        ...updatedTaskObj,
        status,
        tasks: updatedNestedTasks,
      };
      return updatedTaskObj;
    };

    // click on checkbox element
    const checkboxElem = li.querySelector(".checkbox");
    checkboxElem.addEventListener("click", () => {
      let updatedTask = {};
      if (task.status === "completed") {
        updatedTask = { ...getUpdatedTasksList("uncompleted") };
      } else {
        updatedTask = { ...getUpdatedTasksList("completed") };
      }
      let filteredTasks = tasks.filter(
        (filteredTask) => filteredTask.id !== task.id
      );
      task = { ...updatedTask };
      const indexToInsert = task.id.slice(-1) - 1;
      filteredTasks.splice(indexToInsert, 0, task);
      let updatedTasks = filteredTasks;
      allTasks.recentTask = updatedTasks;
      updateUsersTasksList(updatedTasks);
      // render whole recent task page after update user task
      taskManagerContent.innerHTML = "";
      const recentTaskPage = getRecentTaskPage();
      taskManagerContent.append(recentTaskPage);
    });

    const getContextMenu = (e) => {
      let contextMenu = document.querySelector(".context-menu");
      contextMenu?.remove();
      const ul = document.createElement("ul");
      ul.className =
        "context-menu bg-white w-[100px] flex flex-col gap-2 p-1 border shadow absolute";
      const li = document.createElement("li");
      li.className =
        "flex w-full gap-2 items-center p-2 hover:bg-zinc-50 text-sm";
      li.innerHTML = `
        <i class="fa-solid fa-trash-alt"></i>
        <span>Delete</span>
      `;

      let x = e.offsetX,
        y = e.offsetY;
      let xDistance = e.currentTarget.clientWidth - x >= 90;
      ul.style.left = (xDistance ? x : x - 90) + "px";
      ul.style.top = y + "px";

      ul.append(li);

      setTimeout(() => {
        ul.remove();
      }, 2000);

      return ul;
    };

    const taskShowArea = li.querySelector(".task-show-area");
    taskShowArea.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      const contextMenu = getContextMenu(e);
      taskShowArea.append(contextMenu);

      const getUpdatedRemainingTasks = (tasks) => {
        let arr = [];
        for (let task of tasks) {
          task = { ...task, id: `task_${arr.length + 1}` };
          arr.push(task);
        }
        return arr;
      };

      let deleteBtn = contextMenu.querySelector("li");
      deleteBtn.onclick = () => {
        const remainingTasks = tasks.filter(
          (remainTask) => remainTask.id !== task.id
        );
        const updatedRemainingTasks = getUpdatedRemainingTasks(remainingTasks);
        allTasks.recentTask = updatedRemainingTasks;
        updateUsersTasksList(updatedRemainingTasks);
        // render whole recent task page after update user task
        taskManagerContent.innerHTML = "";
        const recentTaskPage = getRecentTaskPage();
        taskManagerContent.append(recentTaskPage);
      };
    });
  }
};

const getRecentTaskPage = () => {
  getNoOfAllTask();
  const recentTaskContent = document.createElement("div");
  recentTaskContent.className = "w-full flex gap-5 overflow-hidden relative";
  recentTaskContent.setAttribute("data-page", "recent-task");
  const recentTaskSideBar = getRecentTaskSideBar();

  const recentTaskMainContent = document.createElement("div");
  recentTaskMainContent.className =
    "border flex-1 bg-[#EAF1F1] p-3 rounded-xl overflow-auto";
  recentTaskMainContent.innerHTML = `
  <div class="recent-task-head w-full flex items-center gap-3 text-[#719191]">
    <button type="button" class="recent-task-side-menu hidden min-w-[44px] h-11 border rounded-full bg-white items-center justify-center">
      <i class="fa-solid fa-bars sm:text-xl"></i>
    </button>
    <select class="tags rounded-full p-2 px-5 sm:text-base text-xs">
      <option value="all tag" disabled selected>All tags</option>
      ${allTags.map((tag) => `<option value="${tag}">${tag}</option>`).join("")}
    </select>
    <div class="ml-auto flex items-center gap-4 cursor-default hover:bg-white/50 px-4 py-2 rounded-full sm:text-base text-xs">
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

  // get recent side bar button
  const sideBarBtn = recentTaskMainContent.querySelector(
    ".recent-task-side-menu"
  );
  sideBarBtn.addEventListener("click", () => {
    recentTaskSideBar.classList.toggle("show-side-bar");
    if (!sideBarBtn.classList.contains("translate-btn")) {
      sideBarBtn.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
    } else {
      sideBarBtn.innerHTML = `<i class="fa-solid fa-bars"></i>`;
    }
    sideBarBtn.classList.toggle("translate-btn");
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
    li.addEventListener("click", () => {
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

export { getRecentTaskPage };
