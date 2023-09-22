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
const mainSideBarBtn = mainSideBar.querySelector(".collapse-side-bar-btn");
const morePageBtn = mainSideBar.querySelector("#more-page-toggle-btn");
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
  notes: [],
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

//* Here we are doing logout current user
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

const getUpdatedUsers2 = (users) => {
  return users.map((user) =>
    user.current_user ? (user = { ...user, current_user: false }) : user
  );
};

// * getIdUpdatedUsers function rearrange id of all user or we can call reset of id
const getIdUpdatedUsers = (users) => {
  let arr = [];
  for (let user of users) {
    user = { ...user, id: `user_${arr.length + 1}` };
    arr.push(user);
  }
  return arr;
};

// * update profile image
const updateProfileImg = (user) => {
  // change user icon on user login -> if user has user img then set img else set user icon
  const imgElem = profileElem.querySelector(".user-img");
  if (user.user_img) {
    imgElem.innerHTML = `
      <img src=${user.user_img} alt="user img" class="w-full"/>
    `;
  } else {
    imgElem.innerHTML = `
        <i class="fa-solid fa-user text-xl md:text-2xl"></i>
      `;
  }
};

// * handle new user signup and existing user login
const loginOrSignupUser = (currentUser, isUserExist = false) => {
  getUsersFromLocalStorage();
  // update profile image
  updateProfileImg(currentUser);

  const loginUser = { ...currentUser, current_user: true, user_hide: false };
  let updatedRemainingUsers;
  // * check if user exist means that is user already create account
  // * if user has already created account then login otherwise signup
  if (isUserExist) {
    // * we have filtered these users from all users which id doesn't match with current pass user. After that update all filtered users' current_user property true to false
    const remainingUsers = users.filter((user) => user.id !== currentUser.id);
    updatedRemainingUsers = getUpdatedUsers(remainingUsers);
  } else {
    // * user doesn't already exist. then update all users' current_user property true to false
    updatedRemainingUsers = getUpdatedUsers(users);
  }
  // * here we add all remaining users and current user that was passed by function in main users
  users = [...updatedRemainingUsers, loginUser];
  let idUpdatedUsers = getIdUpdatedUsers(users);
  localStorage.setItem("users", JSON.stringify(idUpdatedUsers));
  getUserTasks(loginUser);
  userNameElem.textContent = loginUser.user_name;
  // * after login or signup land on dashboard
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

// it handle user login form submit
const handleLoginFormSubmit = (e) => {
  e.preventDefault();
  const idInput = e.currentTarget[0];
  const passwordInput = e.currentTarget[1];
  const userId = idInput.value;
  const userPassword = passwordInput.value;

  // check if user is available for login
  const user = userAvailable(userId, userPassword);
  // if user doesn't exist
  if (!user) {
    // check if warningElem is available. If available remove it and append it again
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
  loginOrSignupUser(user, true);
  // here login function take two parameter
  // first parameter is user
  // second parameter is a boolean value for checking is it new user or not
};

// constructor for creating multiple user
class createUser {
  constructor(id, userName, userId, userPassword, userHide) {
    this.id = id;
    this.user_name = userName;
    this.user_id = userId;
    this.user_password = userPassword;
    this.user_hide = userHide;
    this.user_task = [];
    this.user_notes = [];
  }
}

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
  // call class construction for creating new user
  let newUser = new createUser(
    `user_${users.length + 1}`,
    userId,
    userName,
    userPassword,
    false
  );
  loginOrSignupUser(newUser, false);
  showAllLoginUsers();
};

// show all login user when click on profile
profileElem.addEventListener("click", () => {
  showAllLoginUsers();
});

// * this function for updating navigation list that is an array
// * It take two parameter first condition it check user has come back or not
// * If condition false then push particular page name on navigation list
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
  // * get all users from local storage
  getUsersFromLocalStorage();

  // change user img on top bar
  const currentUser = users.find((user) => user.current_user);
  if (currentUser?.user_img) {
    const imgElem = profileElem.querySelector(".user-img");
    imgElem.innerHTML = `
      <img src=${currentUser.user_img} alt="user img" class="w-full"/>
    `;
  }
  // * set all users in local storage
  localStorage.setItem("users", JSON.stringify(users));
  // * get login form
  let loginFormContainer = getLoginForm();
  const loginForm = loginFormContainer.querySelector("form");
  loginForm.addEventListener("submit", handleLoginFormSubmit);
  // * get signup form
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
    // * traverse user list element and clear all user for appending new users
    addUserBtn.parentElement.parentElement.parentElement.nextElementSibling.innerHTML =
      "";
    dialogBoxElem.close();
    taskManagerContent.append(signupFormContainer);
  });

  // check if current user is present or not if present then login with that if not open sign up form for adding new user
  const user = users.find((user) => user.current_user);
  if (user) {
    loginOrSignupUser(user, true);
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

  // toggle more page option container
  morePageBtn.addEventListener("click", () => {
    document
      .querySelector(".more-page-opt-container")
      .classList.toggle("show-more-page-opt-container");
  });
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

// * get all menus of side bar and loop it to get individual menu button and add click event listener to each individual button and call appendNewPage function that is take page name
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

// * this openTextEditor function open text editor on the basis of editor type which editor you want to open
const openTextEditor = (editorType) => {
  const textEditorContainer = document.createElement("div");
  textEditorContainer.className = `text-editor-container w-full h-full fixed top-0 shadow bg-black/50 backdrop-blur-sm flex ${
    editorType === "add tasks" ? `items-center justify-center md:p-24 p-0` : ""
  } z-20`;
  // * here set attribute called 'data-page-name' to pageName for updating this particular page when save task or note
  const pageName = taskManagerContent.children[0].dataset.page;
  textEditorContainer.setAttribute("data-page-name", pageName);
  // * return when text editor already appended
  if (document.querySelector(".text-editor-container")) return;
  let textEditor;
  if (editorType === "add tasks") {
    textEditor = getTaskEditor();
  } else {
    textEditor = getNotesEditor();
  }
  const fragment = document.createDocumentFragment();
  textEditorContainer.append(textEditor);
  fragment.appendChild(textEditorContainer);
  mainApp.append(fragment);

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
  loginOrSignupUser,
  mainApp,
  profileElem,
  navigationList,
  updateNavigationList,
  openTextEditorBtn,
  menuOptions,
};
