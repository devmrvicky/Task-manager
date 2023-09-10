import { appendNewPage } from "./components/appendNewPage.js";
import { getLoginForm } from "./components/form/getLoginForm.js";
import { getSignupForm } from "./components/form/getSignupForm.js";
import { getTaskEditor } from "./components/Text-editor/getTextEditor.js";
import { showAllLoginUsers } from "./components/showAllLoginUsers.js";
import { addDashboardElement, mainTitle } from "./pages/dashboard.js";
import "./components/navigation.js";
import { navigationBtn } from "./components/navigation.js";
import { getNotesEditor } from "./components/Text-editor/getNotesEditor.js";

const mainApp = document.querySelector("main");
const mainSideBar = document.querySelector(".task-manager-side-bar");
const mainSideBarBtn = mainSideBar.querySelector("button");
const menuOptions = document.querySelectorAll(".menu-option");
const profileElem = document.querySelector(".prof");
const dialogBoxElem = document.querySelector("#d");
const userNameElem = document.querySelector(".user-name");
const taskManagerContent = document.querySelector(".task-manager-content");
const openTextEditorBtn = document.querySelector(".open-text-editor");

// global variable
let allTaskList = [];
let noOfCompletedTask = 0;
let allFolders = [];
let allTags = [];
let navigationList = ["dashboard"];

let users = [];
let allTasks = {
  recentTask: [],
  notes: [
    {
      id: "note_1",
      title: "note title",
      note_body: "this is note body",
      folder: false,
      history: {
        date: "2023-09-06",
        time: "16:26",
      },
      tags: [],
    },
    {
      id: "note_2",
      title: "folder name or note title",
      folder: true,
      history: {
        date: "2023-09-06",
        time: "16:26",
      },
      tags: [],
      notes: [
        {
          id: "nested_note_1",
          title: "note title",
          note_body: "this is note body",
          history: {
            date: "2023-09-06",
            time: "16:26",
          },
          tags: [],
        },
      ],
    },
  ],
};

// get all task from user
const getUserTasks = (user) => {
  if (user) {
    allTasks.recentTask = user.user_task;
  }
};

// set user in localStorage
const getUsersFromLocalStorage = () => {
  let usersFromLocalStorage = JSON.parse(localStorage.getItem("users"));
  if (!usersFromLocalStorage) usersFromLocalStorage = [];
  users = usersFromLocalStorage;
  const currentUser = users.find((user) => user.current_user);
  getUserTasks(currentUser);
};

const getUpdatedUsers = (users) => {
  let updatedUsers = [];
  for (let user of users) {
    if (user.current_user) {
      user = { ...user, current_user: false };
      updatedUsers.push(user);
    } else {
      updatedUsers.push(user);
    }
  }
  return updatedUsers;
};

// getIdUpdatedUsers
const getIdUpdatedUsers = (users) => {
  let arr = [];
  for (let user of users) {
    user = { ...user, id: `user_${arr.length + 1}` };
    arr.push(user);
  }
  return arr;
};

const login = (loginUser, isLogin = false) => {
  getUsersFromLocalStorage();
  // change user img on click on user
  const imgElem = profileElem.querySelector(".user-img");
  if (loginUser.user_img) {
    imgElem.innerHTML = `
    <img src=${loginUser.user_img} alt="user img" class="w-full"/>
  `;
  } else {
    imgElem.innerHTML = `
      <i class="fa-solid fa-user text-xl md:text-2xl"></i>
    `;
  }
  const updatedUser = { ...loginUser, current_user: true, user_hide: false };
  let updatedRemainingUsers;
  if (isLogin) {
    const remainingUsers = users.filter((user) => user.id !== loginUser.id);
    updatedRemainingUsers = getUpdatedUsers(remainingUsers);
  } else {
    updatedRemainingUsers = getUpdatedUsers(users);
  }
  users = [...updatedRemainingUsers, updatedUser];
  let idUpdatedUsers = getIdUpdatedUsers(users);
  localStorage.setItem("users", JSON.stringify(idUpdatedUsers));
  getUserTasks(updatedUser);
  userNameElem.textContent = updatedUser.user_name;
  addDashboardElement();
};

// check if user available
const userAvailable = (userId, userPassword) => {
  for (let user of users) {
    if (user.user_id === userId && user.user_password === userPassword) {
      return user;
    }
  }
  return false;
};

// login form submitted
const handleLoginFormSubmit = (e) => {
  e.preventDefault();
  const idInput = e.currentTarget[0];
  const passwordInput = e.currentTarget[1];
  const userId = idInput.value;
  const userPassword = passwordInput.value;
  const user = userAvailable(userId, userPassword);
  if (!user) {
    let warningElem =
      idInput.parentElement.parentElement.querySelector(".warning-text");
    warningElem?.remove();
    warningElem = document.createElement("span");
    warningElem.className = "warning-text text-xs text-red-500";
    warningElem.textContent = `User id ${userId} doesn't exit`;
    idInput.parentElement.insertAdjacentElement("afterend", warningElem);
    idInput.select();
    setTimeout(() => {
      warningElem.remove();
    }, 1000);
    return;
  }
  login(user, true);
};

// handle signup form submit
const handleSignupFormSubmit = (e) => {
  e.preventDefault();
  const userNameElem = e.currentTarget[0];
  const userIdElem = e.currentTarget[1];
  const userPassElem = e.currentTarget[2];

  let userName = userNameElem.value;
  let userId = userIdElem.value;
  let userPassword = userPassElem.value;

  // if user id is already exit then alert that user id is already exit and return
  for (let user of users) {
    if (user.user_id === userId) {
      alert("this user id is already exist");
      return;
    }
  }

  getUsersFromLocalStorage();
  let newUser = {};
  newUser.id = `user_${users.length + 1}`;
  newUser.user_name = userName;
  newUser.user_id = userId;
  newUser.user_password = userPassword;
  newUser.user_hide = false;
  newUser.user_task = [];
  newUser.user_notes = [];
  login(newUser, false);
  showAllLoginUsers();
};

// show all login user when click on profile
profileElem.addEventListener("click", () => {
  showAllLoginUsers();
});

const updateNavigationList = (condition, navItem) => {
  // update navigation list
  if (!condition && navigationList.at(-1) !== navItem) {
    navigationList.push(navItem);
  }
  if (navigationList.length > 1) {
    navigationBtn.style.display = "flex";
    mainTitle.style.paddingLeft = 0;
  }
};

window.onload = () => {
  getUsersFromLocalStorage();

  // change user img on top bar
  const currentUser = users.find((user) => user.current_user);
  if (currentUser?.user_img) {
    const imgElem = profileElem.querySelector(".user-img");
    imgElem.innerHTML = `
      <img src=${currentUser.user_img} alt="user img" class="w-full"/>
    `;
  }

  localStorage.setItem("users", JSON.stringify(users));
  let loginFormContainer = getLoginForm();
  const loginForm = loginFormContainer.querySelector("form");
  loginForm.addEventListener("submit", handleLoginFormSubmit);

  let signupFormContainer = getSignupForm();
  let signupForm = signupFormContainer.querySelector("form");
  signupForm.addEventListener("submit", handleSignupFormSubmit);

  // open sign up and login form from login form and sign up form
  const goToSignupFormBtn = loginForm.querySelector("#signup-btn");
  goToSignupFormBtn.addEventListener("click", () => {
    loginFormContainer.remove();
    taskManagerContent.append(signupFormContainer);
  });
  const goToLoginFormBtn = signupForm.querySelector("#login-btn");
  goToLoginFormBtn.addEventListener("click", () => {
    signupFormContainer.remove();
    taskManagerContent.append(loginFormContainer);
  });

  const addUserBtn = dialogBoxElem.querySelector("#add-user-btn");
  addUserBtn.addEventListener("click", () => {
    addUserBtn.parentElement.parentElement.parentElement.nextElementSibling.innerHTML =
      "";
    dialogBoxElem.close();
    taskManagerContent.append(signupFormContainer);
  });

  // check if current user is present or not if present then login with that if not open sign up form for adding new user
  const user = users.find((user) => user.current_user);
  if (user) {
    login(user, true);
  } else {
    taskManagerContent.append(loginFormContainer);
  }

  // toggle side bar
  mainSideBarBtn.addEventListener("click", () => {
    toggleMainSideBar();
  });
  if (innerWidth <= 430) {
    mainSideBar.classList.add("toggle-side-bar");
  }
};

function toggleMainSideBar() {
  if (mainSideBar.classList.contains("toggle-side-bar")) {
    taskManagerContent.parentElement.style.paddingLeft = 80 + "px";
  } else {
    taskManagerContent.parentElement.style.paddingLeft = 20 + "px";
  }
  mainSideBar.classList.toggle("toggle-side-bar");
}

function getNoOfAllTask() {
  allTaskList = [];
  noOfCompletedTask = 0;
  allFolders = [];
  allTags = [];
  for (let task of allTasks.recentTask) {
    allTags = allTags.concat(task.tags);
    if (task.folder) {
      allTaskList = allTaskList.concat(task.tasks);
      noOfCompletedTask += parseInt(task.completedTask);
      allFolders = allFolders.concat(task);
    } else {
      allTaskList = allTaskList.concat(task);
      if (task.status === "completed") noOfCompletedTask += 1;
    }
  }
}

menuOptions.forEach((menuOption) => {
  menuOption.addEventListener("click", (e) => {
    for (const menu of menuOptions) {
      if (menu.classList.contains("active")) {
        menu.classList.remove("active");
      }
    }
    e.currentTarget.classList.toggle("active");
    appendNewPage(e.currentTarget.dataset.page);
  });
});

const openTextEditor = (editorType) => {
  const textEditorContainer = document.createElement("div");
  textEditorContainer.className = `text-editor-container w-full h-full fixed top-0 shadow bg-black/50 backdrop-blur-sm flex ${
    editorType === "add tasks" ? `items-center justify-center md:p-24 p-0` : ""
  } z-20`;
  const pageName = taskManagerContent.children[0].dataset.page;
  textEditorContainer.setAttribute("data-page-name", pageName);
  if (document.querySelector(".text-editor-container")) return;
  let textEditor;
  if (editorType === "add tasks") {
    textEditor = getTaskEditor();
  } else {
    textEditor = getNotesEditor();
  }
  textEditorContainer.append(textEditor);
  mainApp.append(textEditorContainer);

  const closeButton = textEditor.querySelector(".close-editor");
  closeButton?.addEventListener("click", () => {
    textEditorContainer.remove();
  });
};
// add event listener for open text editor btn
openTextEditorBtn.addEventListener("click", (e) => {
  openTextEditor(e.currentTarget.title);
});

// export something
export default allTasks;
export {
  allTaskList,
  taskManagerContent,
  allFolders,
  getNoOfAllTask,
  noOfCompletedTask,
  allTags,
  allTasks,
  users,
  getUsersFromLocalStorage,
  dialogBoxElem,
  getUpdatedUsers,
  login,
  mainApp,
  profileElem,
  navigationList,
  updateNavigationList,
  openTextEditorBtn,
};
