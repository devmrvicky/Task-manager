import allTasks from "../main";
// import { showRecentTaskList } from "../pages/recentTask";

export const getTaskList = (tasks, taskListElem, isFromFolder = false) => {
  for (let task of tasks) {
    const li = document.createElement("li");
    li.className = `flex gap-3 cursor-default flex-col`;
    li.setAttribute("data-list-name", task.name);
    li.innerHTML = `
    <div class="w-full flex gap-3">
      ${
        isFromFolder
          ? `<div class="m-3 self-center w-6"><img src="/curved-arrow.png"></div>`
          : ""
      }
      <div class="hover:bg-zinc-100 flex flex-1 py-3 px-4 rounded-xl">
        ${
          task.folder
            ? `<i class="fa fa-folder text-[1.5rem]"></i>`
            : `<i class="fa-solid fa-file"></i>`
        }
       <div class="flex-1 ml-4">
        <div class="flex flex-col">
          <div>
            <p class="group text-xs">${task.name}</p>
            ${
              task.folder
                ? `<p class="text-[.7rem] text-zinc-400">dkdfldk</p>`
                : ``
            }
          </div>
        </div>
        </div>
       ${
         task.folder
           ? `<div class="ml-4">
         <i class="fa-solid fa-angle-down text-xs"></i>
       </div>`
           : ""
       }
      </div>
      </div>
      `;
    taskListElem.append(li);
  }
};

export const getTextEditorSideBar = () => {
  const editorSideBar = document.createElement("div");
  editorSideBar.className = "text-editor-side-bar border-r relative";
  const editorSideBarHead = document.createElement("div");
  editorSideBarHead.className = "editor-head px-4 py-2 border-b";
  editorSideBarHead.innerHTML = `
    <select>
      <option value="task" selected>Task</option>
      <option option value="note">Note</option>
    </select>
  `;
  const createFileOrFolder = document.createElement("div");
  createFileOrFolder.className = "flex items-center p-4";
  createFileOrFolder.innerHTML = `
    <h3 class="text-sm">file name</h3>
    <div class="flex gap-2 ml-auto">
      <button type="button" title="create folder" class="create-file-folder">
        <i class="fa-solid fa-folder text-xs"></i>
      </button>
      <button type="button" title="create file" class="create-file-folder">
        <i class="fa-solid fa-file text-xs"></i>
      </button>
    </div>
  `;
  const recentTaskList = document.createElement("ul");
  recentTaskList.className = "task-lists flex flex-col";
  getTaskList(allTasks.recentTask, recentTaskList);
  // for (let task of allTasks.recentTask) {
  //   const li = getTaskList(task);
  //   recentTaskList.append(li);
  // }

  // append all created element to its parent element
  editorSideBar.append(editorSideBarHead);
  editorSideBar.append(createFileOrFolder);
  editorSideBar.append(recentTaskList);

  // getAllTaskLists();

  return editorSideBar;
};
