import {
  allFolders,
  allTags,
  allTaskList,
  getNoOfAllTask,
  getUsersFromLocalStorage,
  mainApp,
  taskManagerContent,
  users,
} from "../../main";
import { showFolderTags } from "../../pages/recentTask";
import { getConfirmationPage } from "../getConfirmationPage";
import { getInsertedItemOnSameIndex } from "../getInsertedItemOnSameIndex";
import { getContentHead } from "./getContentHead";
import { getContentSideBar } from "./getContentSideBar";
import { showContentItemsList } from "./showContentItemsList";

export const getContentPage = (pageName, items) => {
  getUsersFromLocalStorage();
  getNoOfAllTask();
  const contentPage = document.createElement("div");
  contentPage.className = "w-full flex gap-5 overflow-hidden relative";
  contentPage.setAttribute("data-page", pageName);
  const contentSideBar = getContentSideBar(pageName);

  const mainContent = document.createElement("div");
  mainContent.className =
    "border flex-1 bg-[#EAF1F1] p-3 rounded-xl overflow-auto";
  const contentHead = getContentHead(pageName);
  mainContent.append(contentHead);

  const contentItemListElem = document.createElement("ul");
  contentItemListElem.className = `main-task-list mt-4 flex flex-col overflow-x-hidden ${
    pageName === "recent-tasks" ? `gap-4` : `gap-1`
  }`;

  // by default show recent task list or note list
  showContentItemsList(items, contentItemListElem, false, pageName);

  // show more options
  const showMoreOptsBtn = mainContent.querySelector(".more-opt-btn");
  showMoreOptsBtn.addEventListener("click", () => {
    const container = document.createElement("div");
    container.className = `container w-full h-screen fixed top-0 right-0 z-[9]`;
    const moreOptsElem = mainContent.querySelector(".more-opts");
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

  const layoutBtns = mainContent.querySelectorAll(".layouts button");
  layoutBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      for (let layoutBtn of layoutBtns) {
        layoutBtn.classList.remove("active");
      }
      btn.classList.add("active");
      if (e.currentTarget.id === "cell") {
        showContentItemsList(
          items,
          contentItemListElem,
          false,
          pageName,
          "cell"
        );
      } else {
        showContentItemsList(
          items,
          contentItemListElem,
          false,
          pageName,
          "horizontal"
        );
      }
    });
  });

  // clear all btn
  const clearAllBtn = contentHead.querySelector("#clear-all-items");
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
          items = [];
          const contentItemListElem = document.querySelector(".main-task-list");
          if (pageName === "recent-tasks") {
            currentUser.user_task = items;
            // update user
            showContentItemsList(currentUser.user_task, contentItemListElem);
          } else {
            currentUser.user_notes = items;
            showContentItemsList(currentUser.user_notes, contentItemListElem);
          }

          const filteredUsers = getInsertedItemOnSameIndex(currentUser, users);
          localStorage.setItem("users", JSON.stringify(filteredUsers));
        } else {
          confirmationBox.remove();
        }
      });
    });
  });

  const contentSideBarItems = contentSideBar.querySelectorAll("li");
  contentSideBarItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      item.classList.toggle("show");
      if (e.currentTarget.dataset.role === "show-task") {
        contentItemListElem.innerHTML = "";
        // show active item
        for (let sideBarItem of contentSideBarItems) {
          if (sideBarItem.classList.contains("active")) {
            sideBarItem.classList.remove("active");
          }
        }
        item.classList.toggle("active");
        if (item.dataset.name === "recent") {
          showContentItemsList(items, contentItemListElem, false, pageName);
        } else if (item.dataset.name === "completed") {
          let completedTask = allTaskList.filter(
            (task) => task.status === "completed"
          );
          showContentItemsList(completedTask, contentItemListElem);
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
  const sideBarBtn = mainContent.querySelector(".content-side-menu");
  sideBarBtn.addEventListener("click", () => {
    contentSideBar.classList.toggle("show-side-bar");
    if (!sideBarBtn.classList.contains("translate-btn")) {
      sideBarBtn.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
    } else {
      sideBarBtn.innerHTML = `<i class="fa-solid fa-bars"></i>`;
    }
    sideBarBtn.classList.toggle("translate-btn");
  });

  mainContent.insertAdjacentElement("beforeend", contentItemListElem);
  contentPage.insertAdjacentElement("afterbegin", contentSideBar);
  contentSideBar.insertAdjacentElement("afterend", mainContent);

  taskManagerContent.parentElement.style.height = 100 + "vh";

  return contentPage;
};
