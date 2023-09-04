import { getRecentTaskSideBar } from "../components/getRecentSideBar.js";
import { getRecentTaskHead } from "../components/getRecentTaskHead.js";
import { getRecentTaskList } from "../components/getRecentTaskList.js";
import { updateUsersTasksList } from "../components/getTextEditor.js";
import {
  getNoOfAllTask,
  allTaskList,
  allFolders,
  allTags,
  allTasks,
  taskManagerContent,
  getUsersFromLocalStorage,
  mainApp,
  users,
  updateNavigationList,
} from "../main.js";

const showRecentTaskList = (
  tasks,
  taskList,
  isFromFolder,
  layout = "horizontal"
) => {
  taskList.innerHTML = ``;
  let isLayoutCell = layout === "cell";
  if (!tasks.length) {
    taskList.innerHTML = `
      <li class="text-xs text-center py-10 px-8 text-zinc-500">You have not Written any task.<br>To write a task please click on floating plus button</li>
    `;
  }
  if (isLayoutCell) {
    taskList.classList.remove("flex");
    taskList.classList.add("grid-layout");
  } else {
    taskList.classList.add("flex");
    taskList.classList.remove("grid-layout");
  }
  for (let task of tasks) {
    let li = getRecentTaskList(task, isFromFolder, layout);
    const downAngle = li.querySelector("i.fa-angle-down");
    downAngle?.addEventListener("click", () => {
      li.classList.toggle("show");
      if (!li.children[1]) {
        const nestedTaskList = document.createElement("ul");
        nestedTaskList.className = "nested mt-2 flex flex-col gap-2";
        showRecentTaskList(task.tasks, nestedTaskList, true);
        li.insertAdjacentElement("beforeend", nestedTaskList);
      } else {
        li.children[1].remove();
      }
    });
    taskList.insertAdjacentElement("beforeend", li);

    // get updated tasks list
    const changeTaskStatus = (status, isNestedTask = false) => {
      let updatedTaskObj = {};
      if (isNestedTask) {
        updatedTaskObj = { ...task, status };
        return updatedTaskObj;
      }
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

    // get parent folder
    const getParentFolder = () => {
      const parentElement = li.parentElement.parentElement;
      const id = parentElement.dataset.fileId;
      const parentFolder = allTasks.recentTask.find(
        (recentTask) => recentTask.id === id
      );
      return parentFolder;
    };

    // click on checkbox element
    let isNestedTask = task.id.split("_")[0] === "nested";
    const checkboxElem = li.querySelector(".checkbox");
    checkboxElem.addEventListener("click", () => {
      let updatedTask = {};
      if (task.status === "completed") {
        updatedTask = { ...changeTaskStatus("uncompleted", isNestedTask) };
      } else {
        updatedTask = { ...changeTaskStatus("completed", isNestedTask) };
      }
      task = { ...updatedTask };
      let filteredTasks = tasks.filter(
        (filteredTask) => filteredTask.id !== task.id
      );
      const indexToInsert = task.id.slice(-1) - 1;
      filteredTasks.splice(indexToInsert, 0, task);
      let updatedTasks = filteredTasks;
      if (isNestedTask) {
        const parentFolder = getParentFolder();
        parentFolder.tasks = [...updatedTasks];
        parentFolder.completedTask =
          task.status === "completed"
            ? parseInt(parentFolder.completedTask) + 1
            : parseInt(parentFolder.completedTask) - 1;
        const indexToInsert = parentFolder.id.slice(-1) - 1;
        let filteredTasks = allTasks.recentTask.filter(
          (filteredTask) => filteredTask.id !== parentFolder.id
        );
        filteredTasks.splice(indexToInsert, 0, parentFolder);
        allTasks.recentTask = filteredTasks;
        updateUsersTasksList(filteredTasks);
      } else {
        allTasks.recentTask = updatedTasks;
        updateUsersTasksList(updatedTasks);
      }
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

      const getUpdatedIdTasks = (tasks, isNestedTask = false) => {
        let arr = [];
        for (let task of tasks) {
          task = {
            ...task,
            id: `${isNestedTask ? "nested_" : ""}task_${arr.length + 1}`,
          };
          arr.push(task);
        }
        return arr;
      };

      let deleteBtn = contextMenu.querySelector("li");
      deleteBtn.onclick = () => {
        let remainingTasks;
        if (isNestedTask) {
          const parentFolder = getParentFolder();
          const remainingNestedTasks = parentFolder.tasks.filter(
            (nestedTask) => nestedTask.id !== task.id
          );
          const updatedRemainingNestedTasks = getUpdatedIdTasks(
            remainingNestedTasks,
            true
          );
          parentFolder.tasks = updatedRemainingNestedTasks;
          if (task.status === "completed") {
            parentFolder.completedTask =
              parseInt(parentFolder.completedTask) - 1;
          }
          const indexToInsert = parentFolder.id.slice(-1) - 1;
          let filteredTasks = allTasks.recentTask.filter(
            (filteredTask) => filteredTask.id !== parentFolder.id
          );
          filteredTasks.splice(indexToInsert, 0, parentFolder);
          remainingTasks = filteredTasks;
        } else {
          remainingTasks = tasks.filter(
            (remainTask) => remainTask.id !== task.id
          );
        }
        const updatedRemainingTasks = getUpdatedIdTasks(remainingTasks);
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

const getRecentTaskPage = (isFromBackBtn = false) => {
  // when getRecentTaskPage function will be call "recent task" push string will in navigation list
  updateNavigationList(isFromBackBtn, "recent-tasks");
  getUsersFromLocalStorage();
  getNoOfAllTask();
  const recentTaskContent = document.createElement("div");
  recentTaskContent.className = "w-full flex gap-5 overflow-hidden relative";
  recentTaskContent.setAttribute("data-page", "recent-task");
  const recentTaskSideBar = getRecentTaskSideBar();

  const recentTaskMainContent = document.createElement("div");
  recentTaskMainContent.className =
    "border flex-1 bg-[#EAF1F1] p-3 rounded-xl overflow-auto";
  const recentTaskHead = getRecentTaskHead();
  recentTaskMainContent.append(recentTaskHead);

  const taskList = document.createElement("ul");
  taskList.className = "main-task-list mt-4 flex flex-col gap-4";

  // by default show recent task list
  showRecentTaskList(allTasks.recentTask, taskList);

  // show more options
  const showMoreOptsBtn = recentTaskMainContent.querySelector(".more-opt-btn");
  showMoreOptsBtn.addEventListener("click", () => {
    const container = document.createElement("div");
    container.className = `container w-full h-screen fixed top-0 right-0 z-[9]`;
    const moreOptsElem = recentTaskMainContent.querySelector(".more-opts");
    moreOptsElem.classList.toggle("show-more-opts");
    container.addEventListener("click", (e) => {
      if (e.target.classList.contains("container")) {
        container.remove();
        moreOptsElem.classList.remove("show-more-opts");
      }
    });
    mainApp.append(container);

    setTimeout(() => {
      moreOptsElem.classList.remove("show-more-opts");
      container.remove();
    }, 10000);
  });

  const layoutBtns = recentTaskMainContent.querySelectorAll(".layouts button");
  layoutBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      for (let layoutBtn of layoutBtns) {
        layoutBtn.classList.remove("active");
      }
      btn.classList.add("active");
      if (e.currentTarget.id === "cell") {
        showRecentTaskList(allTasks.recentTask, taskList, false, "cell");
      } else {
        showRecentTaskList(allTasks.recentTask, taskList, false, "horizontal");
      }
    });
  });

  const getConfirmationPage = () => {
    const container = document.createElement("div");
    container.className =
      "container w-full h-full fixed top-0 right-0 bg-black/20 z-40 flex justify-center items-center";
    const box = document.createElement("div");
    box.className =
      "confirmation-box max-w-[400px] h-[200px] border bg-white flex items-center flex-col gap-10 p-10 rounded-lg";
    box.innerHTML = `
      <h1>Do you want to delete your all tasks?</h1>
      <div class="w-full flex justify-center gap-10">
        <button class="border px-3 py-2 bg-red-400 rounded hover:bg-red-500 text-white" id="delete-tasks">
          delete
        </button>
        <button class="border px-3 py-2 rounded hover:bg-zinc-100" id="cancel">
          cancel
        </button>
      </div>
    `;
    container.append(box);
    container.addEventListener("click", (e) => {
      if (e.target.classList.contains("container")) {
        container.remove();
      }
    });
    return container;
  };

  // clear all btn
  const clearAllBtn = recentTaskHead.querySelector("#clear-all-tasks");
  clearAllBtn?.addEventListener("click", () => {
    const confirmationBox = getConfirmationPage();
    mainApp.append(confirmationBox);
    const btns = confirmationBox.querySelectorAll("button");
    btns.forEach((btn) => {
      btn.addEventListener("click", () => {
        if (btn.id === "delete-tasks") {
          confirmationBox.remove();
          getUsersFromLocalStorage();
          const currentUser = users.find((user) => user.current_user);
          // update user tasks
          allTasks.recentTask = [];
          currentUser.user_task = allTasks.recentTask;
          // update user
          const filteredUsers = users.filter(
            (user) => user.user_id !== currentUser.user_id
          );
          const insertIndex = currentUser.id.split("_")[1] - 1;
          filteredUsers.splice(insertIndex, 0, currentUser);
          localStorage.setItem("users", JSON.stringify(filteredUsers));

          const taskList = document.querySelector(".main-task-list");
          showRecentTaskList(currentUser.user_task, taskList);
        } else {
          confirmationBox.remove();
        }
      });
    });
  });

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

  taskManagerContent.parentElement.style.height = 100 + "vh";

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
