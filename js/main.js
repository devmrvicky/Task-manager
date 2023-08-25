import { appendNewPage } from "./components/appendNewPage.js";
import { getLoginForm } from "./components/getLoginForm.js";
import { getTextEditor } from "./components/getTextEditor.js";
// import "./pages/dashboard.js";
import { addDashboardElement } from "./pages/dashboard.js";

const mainApp = document.querySelector("main");
// const mainSideBar = document.querySelector(".task-manager-side-bar");
const menuOptions = document.querySelectorAll(".menu-option");
const dialogBoxElem = document.querySelector("#d");
const profImg = document.querySelector(".prof img");
const userNameElem = document.querySelector(".user-name");
const taskManagerContent = document.querySelector(".task-manager-content");
const openTextEditorBtn = document.querySelector(".open-text-editor");

// global variable
let allTaskList = [];
let noOfCompletedTask = 0;
let allFolders = [];
let allTags = [];

// user
let users = [
  {
    id: "user_1",
    user_name: "vikash kumar",
    user_id: "mrvikashkumar",
    user_password: "@(mrvikash396)_Login",
    current_user: true,
    user_task: [
      {
        folder: true,
        name: "Call Mattew",
        status: "uncompleted",
        tags: ["web", "design"],
        time: {
          date: "19 may",
          init: "17:30",
          end: "18:00",
        },
        completedTask: 1,
        tasks: [
          {
            name: "Approve header",
            time: {
              date: "19 may",
              init: "17:30",
              end: "18:00",
            },
            status: "completed",
            tags: ["web", "design"],
          },
          {
            name: "Book a meeting with team",
            time: {
              date: "19 may",
              init: "17:30",
              end: "18:00",
            },
            status: "uncompleted",
            tags: ["web", "design"],
          },
        ],
      },
      {
        folder: false,
        name: "Write to council",
        status: "completed",
        tags: [],
        time: {
          date: "19 may",
          init: "",
          end: "",
        },
      },
    ],
  },
  {
    id: "user_2",
    user_name: "vicky k.",
    user_id: "devmrvicky",
    user_password: "@(devmrvicky)_Login",
    current_user: false,
    user_task: [
      {
        folder: true,
        name: "Hello word",
        status: "uncompleted",
        tags: ["web", "design"],
        time: {
          date: "19 may",
          init: "17:30",
          end: "18:00",
        },
        completedTask: 1,
        tasks: [
          {
            name: "Personal work",
            time: {
              date: "19 may",
              init: "17:30",
              end: "18:00",
            },
            status: "completed",
            tags: ["web", "design"],
          },
          {
            name: "private meeting",
            time: {
              date: "19 may",
              init: "17:30",
              end: "18:00",
            },
            status: "uncompleted",
            tags: ["web", "design"],
          },
        ],
      },
      {
        folder: false,
        name: "meeting with girlfriend",
        status: "completed",
        tags: [],
        time: {
          date: "19 may",
          init: "",
          end: "",
        },
      },
    ],
  },
];
// task object
let allTasks = {
  recentTask: [
    // {
    //   folder: true,
    //   name: "Call Mattew",
    //   status: "uncompleted",
    //   tags: ["web", "design"],
    //   time: {
    //     date: "19 may",
    //     init: "17:30",
    //     end: "18:00",
    //   },
    //   completedTask: 1,
    //   tasks: [
    //     {
    //       name: "Approve header",
    //       time: {
    //         date: "19 may",
    //         init: "17:30",
    //         end: "18:00",
    //       },
    //       status: "completed",
    //       tags: ["web", "design"],
    //     },
    //     {
    //       name: "Book a meeting with team",
    //       time: {
    //         date: "19 may",
    //         init: "17:30",
    //         end: "18:00",
    //       },
    //       status: "uncompleted",
    //       tags: ["web", "design"],
    //     },
    //   ],
    // },
    // {
    //   folder: false,
    //   name: "Write to council",
    //   status: "completed",
    //   tags: [],
    //   time: {
    //     date: "19 may",
    //     init: "",
    //     end: "",
    //   },
    // },
    // {
    //   folder: true,
    //   name: "Buy watercolor",
    //   status: "uncompleted",
    //   tags: ["party", "office"],
    //   time: {
    //     date: "19 may",
    //     init: "",
    //     end: "",
    //   },
    //   completedTask: 0,
    //   tasks: [
    //     {
    //       name: "Approve header",
    //       time: {
    //         date: "19 may",
    //         init: "17:30",
    //         end: "18:00",
    //       },
    //       status: "completed",
    //       tags: ["web", "design"],
    //     },
    //     {
    //       name: "Book a meeting with team",
    //       time: {
    //         date: "19 may",
    //         init: "17:30",
    //         end: "18:00",
    //       },
    //       status: "uncompleted",
    //       tags: ["web", "design"],
    //     },
    //   ],
    // },
  ],
  completedTask: [],
};

const renderDashboard = () => {
  for (let user of users) {
    if (user.current_user) {
      userNameElem.textContent = user.user_name;
      addDashboardElement();
      return true;
    }
  }
  return false;
};

const login = (loginUser) => {
  if (loginUser) {
    const updatedUser = { ...loginUser, current_user: true };
    const remainingUsers = users.filter((user) => user !== loginUser);
    users = [updatedUser, ...remainingUsers];
    allTasks.recentTask = [...loginUser.user_task];
    renderDashboard();
  } else {
    // Handle login failure
  }
};

const showAllLoginUsers = () => {
  const ul = document.createElement("ul");
  ul.className = "pb-5";
  for (let user of users) {
    let li = document.createElement("li");
    li.className = `user-list px-3 py-2 rounded-lg hover:bg-zinc-50 flex gap-3 items-center cursor-default ${
      user.current_user ? "active" : ""
    }`;
    li.innerHTML = `
      <i class="fa-solid fa-user fa-2x"></i>
      <div class="flex flex-col">
        <p class="text-base">${user.user_name}</p>
        <span class="text-xs text-zinc-500">${user.user_id}</span>
      </div>
    `;

    li.onclick = () => {
      login(user);
      dialogBoxElem.close();
    };

    ul.append(li);
  }
  const userList = ul.querySelectorAll(".user-list");
  console.log(userList);
  userList.forEach((list) => {
    list.addEventListener("click", () => {
      for (let user of userList) {
        user.classList.remove("active");
      }
      list.classList.add("active");
    });
  });
  dialogBoxElem.insertAdjacentElement("afterbegin", ul);
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
const handleSubmit = (e) => {
  e.preventDefault();
  const idInput = e.currentTarget[1];
  const passwordInput = e.currentTarget[2];
  const userId = idInput.value;
  const userPassword = passwordInput.value;
  const user = userAvailable(userId, userPassword);
  if (!user) {
    const span = document.createElement("span");
    span.className = "text-xs text-red-500";
    span.textContent = `User id ${userId} doesn't exit`;
    idInput.insertAdjacentElement("afterend", span);
    idInput.select();
    setTimeout(() => {
      span.remove();
    }, 500);
    return;
  }
  login(user);
};

window.onload = () => {
  showAllLoginUsers();
  const user = users.find((user) => user.current_user);
  if (user) {
    login(user);
  } else {
    let loginForm = getLoginForm();
    const form = loginForm.querySelector("form");
    form.addEventListener("submit", handleSubmit);
    taskManagerContent.append(loginForm);
  }
};

function getNoOfAllTask() {
  allTaskList = [];
  noOfCompletedTask = 0;
  allFolders = [];
  allTags = [];
  for (let task of allTasks.recentTask) {
    allTags = allTags.concat(task.tags);
    if (task.folder) {
      allTaskList = allTaskList.concat(task.tasks);
      noOfCompletedTask += task.completedTask;
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

const openTextEditor = () => {
  const textEditorContainer = document.createElement("div");
  textEditorContainer.className =
    "text-editor-container w-full h-full fixed top-0 shadow bg-white/50 backdrop-blur-sm flex items-center justify-center p-24";
  const pageName = taskManagerContent.children[0].dataset.page;
  textEditorContainer.setAttribute("data-page-name", pageName);
  if (document.querySelector(".text-editor-container")) return;
  const textEditor = getTextEditor();
  textEditorContainer.append(textEditor);
  mainApp.append(textEditorContainer);

  const closeButton = textEditor.querySelector(".close-editor");
  closeButton.addEventListener("click", () => {
    textEditorContainer.remove();
  });
};
// add event listener for open text editor btn
openTextEditorBtn.addEventListener("click", openTextEditor);

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
};
