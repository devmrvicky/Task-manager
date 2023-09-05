export const showContentItemsList = (
  items,
  contentItemListElem,
  isFromFolder,
  contentType,
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
          showRecentTaskList(item.tasks, nestedTaskList, true);
          li.insertAdjacentElement("beforeend", nestedTaskList);
        } else {
          li.children[1].remove();
        }
      });
    } else {
      li = `<h1>notes</h1>`;
    }
    contentItemListElem.insertAdjacentElement("beforeend", li);

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
