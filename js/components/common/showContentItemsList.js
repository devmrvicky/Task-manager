import allTasks from "../../main";
import { updateUsersTasksList } from "../Text-editor/getTextEditor";
import { getRecentTaskList } from "../recent-tasks/getRecentTaskList";
import { showUpdatedTasks } from "../recent-tasks/showUpdatedTasks";
import { getContextMenu } from "./getContextMenu";
import { getParentFolder } from "./getParentFolder";
import { getUpdatedIdTasks } from "./getUpdatedIdTasks";

export const showContentItemsList = (
  items,
  contentItemListElem,
  isFromFolder = false,
  contentType = "recent-tasks",
  layout = "horizontal"
) => {
  const isContentTasks = contentType === "recent-tasks";

  contentItemListElem.innerHTML = ``;
  let isLayoutCell = layout === "cell";
  if (!items.length) {
    contentItemListElem.innerHTML = `
      <li class="text-xs text-center py-10 px-8 text-zinc-500">You have not Written any task.<br>To write a task please click on floating plus button</li>
    `;
  }
  if (isLayoutCell) {
    contentItemListElem.classList.remove("flex");
    contentItemListElem.classList.add("grid-layout");
  } else {
    contentItemListElem.classList.add("flex");
    contentItemListElem.classList.remove("grid-layout");
  }
  for (let item of items) {
    let li;
    if (isContentTasks) {
      li = getRecentTaskList(item, isFromFolder, layout);
      const downAngle = li.querySelector("i.fa-angle-down");
      downAngle?.addEventListener("click", () => {
        li.classList.toggle("show");
        if (!li.children[1]) {
          const nestedTaskList = document.createElement("ul");
          nestedTaskList.className = "nested mt-2 flex flex-col gap-2";
          showContentItemsList(item.tasks, nestedTaskList, true);
          li.insertAdjacentElement("beforeend", nestedTaskList);
        } else {
          li.children[1].remove();
        }
      });
      // click on checkbox element
      let isNestedTask = item.id.split("_")[0] === "nested";
      const checkboxElem = li.querySelector(".checkbox");
      checkboxElem.addEventListener("click", () => {
        showUpdatedTasks(item, items, isNestedTask, li);
      });
      const taskShowArea = li.querySelector(".task-show-area");
      taskShowArea.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        const contextMenu = getContextMenu(e);
        taskShowArea.append(contextMenu);

        let deleteBtn = contextMenu.querySelector("li");
        deleteBtn.onclick = () => {
          let remainingTasks;
          if (isNestedTask) {
            const parentFolder = getParentFolder(li);
            const remainingNestedTasks = parentFolder.tasks.filter(
              (nestedTask) => nestedTask.id !== item.id
            );
            const updatedRemainingNestedTasks = getUpdatedIdTasks(
              remainingNestedTasks,
              true
            );
            parentFolder.tasks = updatedRemainingNestedTasks;
            if (item.status === "completed") {
              parentFolder.completedTask =
                parseInt(parentFolder.completedTask) - 1;
            }
            let filteredTasks = getInsertedItemOnSameIndex(
              parentFolder,
              allTasks.recentTask
            );
            remainingTasks = filteredTasks;
          } else {
            remainingTasks = items.filter(
              (remainTask) => remainTask.id !== item.id
            );
          }
          const updatedRemainingTasks = getUpdatedIdTasks(remainingTasks);
          allTasks.recentTask = updatedRemainingTasks;
          updateUsersTasksList(updatedRemainingTasks);
          // render whole recent task page after update user task
          // taskManagerContent.innerHTML = "";
          // const recentTaskPage = getRecentTaskPage();
          // taskManagerContent.append(recentTaskPage);
        };
      });
    } else {
      li = document.createElement("li");
      li.innerHTML = `<h1>notes</h1>`;
    }
    contentItemListElem.insertAdjacentElement("beforeend", li);
  }
};
