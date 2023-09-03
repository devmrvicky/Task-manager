import allTasks, {
  getUsersFromLocalStorage,
  taskManagerContent,
  users,
} from "../main.js";
import { addDashboardElement } from "../pages/dashboard.js";
import { getRecentTaskPage } from "../pages/recentTask.js";
import { getTextEditorMainArea } from "./getTextEditorMainArea.js";
import { getTaskList, getTextEditorSideBar } from "./getTextEditorSideBar.js";

let selectedObj;
let isSelected = false;
let nestedTaskName;
let nestedDateTimeObj = {};
let nestedTags = [];
let tags = [];

// re-render pages
const reRenderPages = (textEditor) => {
  getUsersFromLocalStorage();
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

// get time obj
const getTimeObj = () => {
  const dateObj = new Date();
  const year = dateObj.getFullYear();
  const month = ("0" + (dateObj.getMonth() + 1)).slice(-2);
  const day = ("0" + dateObj.getDay()).slice(-2);
  const date = ("0" + dateObj.getDate()).slice(-2);
  const hour = ("0" + dateObj.getHours()).slice(-2);
  const minute = ("0" + dateObj.getMinutes()).slice(-2);
  return { year, month, day, date, hour, minute };
};

const initTaskDateTime = (date, init, end) => ({ date, init, end });

// get current user
const getCurrentUser = () => {
  getUsersFromLocalStorage();
  let user = users.find((user) => user.current_user);
  return user;
};

// update users tasks list
const updateUsersTasksList = (tasks, nested = false) => {
  let currentUser = getCurrentUser();
  let remainingUsers = users.filter((user) => user !== currentUser);
  if (nested) {
    const filteredTask = currentUser.user_task.filter(
      (userTask) => userTask.name !== tasks.name
    );
    currentUser.user_task = [tasks, ...filteredTask];
  } else {
    currentUser.user_task = tasks;
  }
  let newUsersArr = [currentUser, ...remainingUsers];
  localStorage.setItem("users", JSON.stringify(newUsersArr));
};

// update task lists
const updateAllTasksList = (name, folder, date = [], tags = []) => {
  const currentUser = getCurrentUser();
  const newTaskObj = {};
  newTaskObj.id = `task_${currentUser.user_task.length + 1}`;
  newTaskObj.name = name;
  newTaskObj.folder = folder;
  newTaskObj.status = "uncompleted";
  newTaskObj.time = date;
  newTaskObj.tags = tags;
  if (folder) {
    newTaskObj.isFolderOpen = false;
    newTaskObj.completedTask = 0;
    newTaskObj.tasks = [];
  }
  // const newTaskList = [].concat(newTaskObj);
  allTasks.recentTask = [newTaskObj, ...allTasks.recentTask];
  updateUsersTasksList(allTasks.recentTask);
};

const getNestedTaskList = () => {
  const nestedObj = {};
  nestedObj.id = `nested_task_${selectedObj.tasks.length + 1}`;
  nestedObj.name = nestedTaskName;
  nestedObj.time = nestedDateTimeObj;
  nestedObj.status = "uncompleted";
  nestedObj.tags = nestedTags;
  let nestedList = [].concat(nestedObj);
  return nestedList;
};

const setDefaultDateTime = (form) => {
  const dateElem = form.querySelector("#date");
  const timeElem = form.querySelectorAll('input[type="time"]');
  const timeObj = getTimeObj();
  const date = `${timeObj.year}-${timeObj.month}-${timeObj.date}`;
  const time = `${timeObj.hour}:${timeObj.minute}`;
  dateElem.value = date;
  timeElem.forEach((elem) => {
    elem.value = time;
  });
};

export const getTextEditor = () => {
  const textEditor = document.createElement("div");
  textEditor.className =
    "text-editor border bg-white w-full max-w-[1200px] max-h-[800px] h-[90vh] rounded-xl flex relative overflow-hidden shadow";
  const editorSideBar = getTextEditorSideBar();
  const editorMainArea = getTextEditorMainArea();

  textEditor.insertAdjacentElement("afterbegin", editorSideBar);
  textEditor.insertAdjacentElement("beforeend", editorMainArea);
  textEditor.innerHTML += `
  <button class="close-editor text-xl absolute right-[20px] top-[10px]">
    <i class="fa-solid fa-xmark"></i>
  </button>
  `;

  const tasksListElem = textEditor.querySelector(".task-lists");
  const editorForm = textEditor.querySelector(".editor-form");
  setDefaultDateTime(editorForm);
  const dateElem = editorForm.querySelector("#date");
  const initTimeElem = editorForm.querySelector("#init-time");
  const endTimeElem = editorForm.querySelector("#end-time");
  const tagsElem = editorForm.querySelectorAll(".tag");
  const parentElemOfTag = tagsElem[0].parentElement.previousElementSibling;

  const updateAndGetTagElem = (tag) => {
    if (tags.includes(tag) || parentElemOfTag.children.length >= 5) return;
    tags.push(tag);
    let tagElem = document.createElement("span");
    tagElem.className =
      "tag text-xs border rounded-xl py-1 px-2 bg-white hover:bg-zinc-50 cursor-default";
    tagElem.textContent = `#${tag}`;
    parentElemOfTag.prepend(tagElem);
  };

  const tagInput = parentElemOfTag.querySelector("input");
  tagInput.addEventListener("input", (e) => {
    if (e.data === ",") {
      const tag = tagInput.value.replace(",", "");
      updateAndGetTagElem(tag);
      tagInput.value = "";
      tagInput.focus();
    }
  });

  tagsElem.forEach((tagElem) => {
    tagElem.addEventListener("click", (e) => {
      const tag = e.currentTarget.dataset.tag;
      updateAndGetTagElem(tag);
    });
  });

  editorForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const taskInitTime = initTaskDateTime(
      dateElem.value,
      initTimeElem.value,
      endTimeElem.value
    );
    const tagsForTask = [...tags];
    tags = [];
    const input = e.currentTarget[0];
    if (!input.value) return;
    if (!isSelected) {
      updateAllTasksList(input.value, false, taskInitTime, tagsForTask);
    } else {
      nestedTaskName = input.value;
      nestedDateTimeObj = taskInitTime;
      nestedTags = tags;
      tags = [];
      selectedObj.tasks.push(...getNestedTaskList());
      updateUsersTasksList(selectedObj, true);
    }
    reRenderPages(textEditor);
    input.value = "";
    input.focus();
    Array.from(parentElemOfTag.children).forEach((elem) => {
      if (elem.tagName === "SPAN") {
        elem.remove();
      }
    });
  });

  getActiveListElem(tasksListElem);

  // create-file-folder
  const createFileFolderBtns = textEditor.querySelectorAll(
    ".create-file-folder"
  );
  createFileFolderBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      let isLiExit =
        tasksListElem.children[0]?.dataset.listType === "create-folder";
      if (btn.title === "create file" || isLiExit) return;
      const folderInitTime = initTaskDateTime(
        dateElem.value,
        initTimeElem.value,
        endTimeElem.value
      );
      const li = document.createElement("li");
      li.className = `flex gap-3 cursor-default flex-col`;
      li.setAttribute("data-list-type", "create-folder");
      li.innerHTML = `
      <div class="w-full flex gap-3">
        <div class="hover:bg-zinc-100 focus-within:bg-zinc-100 flex flex-1 items-center py-3 px-4 rounded-xl">
          <i class="fa fa-folder text-[1.5rem]"></i>
          <form class="create-folder-form flex-1 ml-4 w-[170px]">
            <input type="text" class="border outline-none w-full text-xs p-[2px]" autofocus />
          </form>
        </div>
      </div>
      `;

      const createFolderForm = li.querySelector(".create-folder-form");
      const input = createFolderForm.querySelector("input");

      const addFolder = () => {
        if (!input.value) {
          li.remove();
          return;
        }
        updateAllTasksList(input.value, true, folderInitTime);
        reRenderPages(textEditor);
      };

      input.addEventListener("blur", () => {
        li.remove();
      });

      createFolderForm.addEventListener("submit", (e) => {
        e.preventDefault();
        addFolder();
      });

      tasksListElem.insertAdjacentElement("afterbegin", li);
    });
  });

  const btn = textEditor.querySelector(".editor-side-bar-btn");
  const editorSideBarElem = textEditor.querySelector(".text-editor-side-bar");
  btn.addEventListener("click", () => {
    editorSideBarElem.classList.toggle("show-side-bar");
    btn.classList.toggle("translate-btn");
  });

  return textEditor;
};

const appendFolderHeading = (name) => {
  const folderNameHeading = document.querySelector(".folder-name-heading");
  const folderName = folderNameHeading.getAttribute("data-folder-name");
  if (folderNameHeading?.children[0] && name === folderName) {
    folderNameHeading.removeAttribute("data-folder-name");
    folderNameHeading.innerHTML = "";
    return;
  }
  const h4 = document.createElement("h4");
  h4.setAttribute("data-folder-name", name);
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
      if (list.classList.contains("active")) {
        list.classList.remove("active");
        if (list.nextElementSibling?.tagName === "UL") {
          list.nextElementSibling.remove();
        }
        isSelected = false;
        return;
      }
      for (let listElem of Array.from(listsElem.children)) {
        listElem.classList.remove("active");
      }
      list.classList.add("active");
      let ul = getNestedTaskListElem();
      list.insertAdjacentElement("afterend", ul);
      isSelected = true;
    });
  });
}

export { updateUsersTasksList };
