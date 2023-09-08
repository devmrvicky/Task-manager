import { getContentPage } from "../components/common/getContentPage.js";
import { showContentItemsList } from "../components/common/showContentItemsList.js";
import { allTasks, updateNavigationList, openTextEditorBtn } from "../main.js";

const getRecentTaskPage = (isFromBackBtn = false) => {
  // when getRecentTaskPage function will be call "recent task" push string will in navigation list
  updateNavigationList(isFromBackBtn, "recent-tasks");
  const recentTaskPage = getContentPage("recent-tasks", allTasks.recentTask);
  // change open text editor btn
  openTextEditorBtn.title = "add tasks";
  return recentTaskPage;
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

export { getRecentTaskPage, showFolderTags };
