import { getContentHead } from "../components/common/getContentHead.js";
import { getContentSideBar } from "../components/common/getContentSideBar.js";
import { showContentItemsList } from "../components/common/showContentItemsList.js";
import { getConfirmationPage } from "../components/getConfirmationPage.js";
import { getInsertedItemOnSameIndex } from "../components/getInsertedItemOnSameIndex.js";
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

const getRecentTaskPage = (isFromBackBtn = false) => {
  // when getRecentTaskPage function will be call "recent task" push string will in navigation list
  updateNavigationList(isFromBackBtn, "recent-tasks");
  getUsersFromLocalStorage();
  getNoOfAllTask();
  const recentTaskContent = document.createElement("div");
  recentTaskContent.className = "w-full flex gap-5 overflow-hidden relative";
  recentTaskContent.setAttribute("data-page", "recent-task");
  const recentTaskSideBar = getContentSideBar("recent-tasks");

  const recentTaskMainContent = document.createElement("div");
  recentTaskMainContent.className =
    "border flex-1 bg-[#EAF1F1] p-3 rounded-xl overflow-auto";
  const recentTaskHead = getContentHead("recent-tasks");
  recentTaskMainContent.append(recentTaskHead);

  const taskList = document.createElement("ul");
  taskList.className = "main-task-list mt-4 flex flex-col gap-4";

  // by default show recent task list
  showContentItemsList(allTasks.recentTask, taskList);

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
        showContentItemsList(
          allTasks.recentTask,
          taskList,
          false,
          "recent-tasks",
          "cell"
        );
      } else {
        showContentItemsList(
          allTasks.recentTask,
          taskList,
          false,
          "recent-tasks",
          "horizontal"
        );
      }
    });
  });

  // clear all btn
  const clearAllBtn = recentTaskHead.querySelector("#clear-all-items");
  clearAllBtn?.addEventListener("click", () => {
    const confirmationBox = getConfirmationPage();
    mainApp.append(confirmationBox);
    const btns = confirmationBox.querySelectorAll("button");
    btns.forEach((btn) => {
      btn.addEventListener("click", () => {
        if (btn.id === "delete-items") {
          confirmationBox.remove();
          getUsersFromLocalStorage();
          const currentUser = users.find((user) => user.current_user);
          // update user tasks
          allTasks.recentTask = [];
          currentUser.user_task = allTasks.recentTask;
          // update user
          let filteredUsers = getInsertedItemOnSameIndex(currentUser, users);
          localStorage.setItem("users", JSON.stringify(filteredUsers));

          const taskList = document.querySelector(".main-task-list");
          showContentItemsList(currentUser.user_task, taskList);
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
          showContentItemsList(allTasks.recentTask, taskList);
        } else if (item.dataset.name === "completed") {
          let completedTask = allTaskList.filter(
            (task) => task.status === "completed"
          );
          showContentItemsList(completedTask, taskList);
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
    ".recent-tasks-side-menu"
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
        showContentItemsList([item], taskList);
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
    showContentItemsList([newItem], taskList);
    // select.value = item;
  }
}

export { getRecentTaskPage };
