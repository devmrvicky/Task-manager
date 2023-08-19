import allTasks, { taskManagerContent } from "../main.js";
import { addDashboardElement } from "../pages/dashboard.js";
import { getRecentTaskPage } from "../pages/recentTask.js";
import { getTextEditorMainArea } from "./getTextEditorMainArea.js";
import { getTaskList, getTextEditorSideBar } from "./getTextEditorSideBar.js";

let selectedObj;
let isSelected = false;
let nestedTaskName;

// re-render pages
const reRenderPages = (textEditor) => {
  const tasksListElem = textEditor.querySelector(".task-lists");
  tasksListElem.innerHTML = "";
  getTaskList(allTasks.recentTask, tasksListElem);
  getActiveListElem(tasksListElem);
  const pageName = textEditor.parentElement.dataset.pageName;
  if (pageName === "dashboard") {
    addDashboardElement();
  } else if (pageName === "recent-task") {
    taskManagerContent.innerHTML = "";
    const recentTaskPage = getRecentTaskPage();
    taskManagerContent.append(recentTaskPage);
  }
};

// update task lists
const updateAllTasksList = (name, folder) => {
  const newTaskObj = {};
  newTaskObj.name = name;
  newTaskObj.folder = folder;
  newTaskObj.status = "uncompleted";
  newTaskObj.time = {
    date: "19 may",
    init: "",
    end: "",
  };
  newTaskObj.tags = [];
  if (folder) {
    newTaskObj.completedTask = 0;
    newTaskObj.tasks = [];
  }
  const newTaskList = [].concat(newTaskObj);
  allTasks.recentTask.push(...newTaskList);
};

// add new folder
const addNewFolder = (folderName) => {
  updateAllTasksList(folderName, true);
};

const getNestedTaskList = () => {
  const nestedObj = {};
  nestedObj.name = nestedTaskName;
  nestedObj.time = {
    date: "19 may",
    init: "17:30",
    end: "18:00",
  };
  nestedObj.status = "completed";
  nestedObj.tags = [];
  let nestedList = [].concat(nestedObj);
  return nestedList;
};

export const getTextEditor = () => {
  const textEditor = document.createElement("div");
  textEditor.className =
    "text-editor border bg-white w-full max-w-[1200px] h-[500px] flex relative";
  const editorSideBar = getTextEditorSideBar();
  const editorMainArea = getTextEditorMainArea();

  textEditor.insertAdjacentElement("afterbegin", editorSideBar);
  textEditor.insertAdjacentElement("beforeend", editorMainArea);
  textEditor.innerHTML += `
  <button class="close-editor text-xl absolute right-[-30px]">
    <i class="fa-solid fa-xmark"></i>
  </button>
  `;

  const tasksListElem = textEditor.querySelector(".task-lists");
  const editorForm = textEditor.querySelector(".editor-form");
  editorForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = e.currentTarget[0];
    if (!input.value) return;
    if (!isSelected) {
      updateAllTasksList(input.value, false);
    } else {
      nestedTaskName = input.value;
      selectedObj.tasks.push(...getNestedTaskList());
    }
    reRenderPages(textEditor);
  });

  getActiveListElem(tasksListElem);

  // create-file-folder
  const createFileFolderBtns = textEditor.querySelectorAll(
    ".create-file-folder"
  );
  createFileFolderBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      let isLiExit =
        tasksListElem.children[0].dataset.listType === "create-folder";
      if (btn.title === "create file" || isLiExit) return;
      const li = document.createElement("li");
      li.className = `flex gap-3 cursor-default flex-col`;
      li.setAttribute("data-list-type", "create-folder");
      li.innerHTML = `
      <div class="w-full flex gap-3">
        <div class="hover:bg-zinc-100 flex flex-1 py-3 px-4 rounded-xl">
          <i class="fa fa-folder text-[1.5rem]"></i>
          <form class="create-folder-form flex-1 ml-4">
            <input type="text" class="border outline-none" autofocus />
          </form>
        </div>
      </div>
      `;

      const createFolderForm = li.querySelector(".create-folder-form");
      const input = createFolderForm.querySelector("input");
      input.addEventListener("blur", () => {
        li.remove();
      });

      createFolderForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const input = e.currentTarget[0];
        if (!input.value) return;
        addNewFolder(input.value);
        reRenderPages(textEditor);
      });

      tasksListElem.insertAdjacentElement("afterbegin", li);
    });
  });

  return textEditor;
};

const appendFolderHeading = (name) => {
  const folderNameHeading = document.querySelector(".folder-name-heading");
  const h4 = document.createElement("h4");
  h4.className = "folder-name-heading flex gap-4 items-center pb-3";
  h4.innerHTML = `
    <i class="fa-solid fa-folder"></i>
    <span>${name}</span>
  `;
  folderNameHeading.replaceWith(h4);
};

const getNestedTaskListElem = () => {
  const ul = document.createElement("ul");
  getTaskList(selectedObj.tasks, ul, true);
  return ul;
};

const getSelectedListObj = (name) => {
  for (let list of allTasks.recentTask) {
    if (list.name === name && list.folder) {
      appendFolderHeading(list.name);
      selectedObj = list;
    }
  }
};

function getActiveListElem(listsElem) {
  Array.from(listsElem.children)?.forEach((list) => {
    list.addEventListener("click", () => {
      const listName = list.dataset.listName;
      getSelectedListObj(listName);
      let ul = getNestedTaskListElem();
      list.insertAdjacentElement("beforeend", ul);
      if (list.classList.contains("active")) {
        list.classList.remove("active");
        isSelected = false;
        return;
      }
      for (let listElem of Array.from(listsElem.children)) {
        listElem.classList.remove("active");
      }
      list.classList.add("active");
      isSelected = true;
    });
  });
}
