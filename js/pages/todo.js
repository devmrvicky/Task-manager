import { getTodoSidebar } from "../components/todo/getTodoSidebar";
import getTodoMainContent from "../components/todo/getTodoMainContent";
import {
  getUsersFromLocalStorage,
  taskManagerContent,
  updateNavigationList,
  users,
} from "../main";
import getTimeObj from "../components/getTimeObj";

const getLatestTodoLists = () => {
  // get latest todo lists
  getUsersFromLocalStorage();
  return users.find((user) => user.current_user).user_todo || [];
};

// * get current date
const dateObj = getTimeObj();
const currentDate = `${dateObj.year}-${dateObj.month}-${dateObj.date}`;

const getTodoPage = (isFromBackBtn = false) => {
  taskManagerContent.style.height = 90 + "vh";

  const todo = getLatestTodoLists();

  const todayTodo = todo.filter((todo) => todo.dueDate === currentDate);
  const headingTitle = `<div><p class="text-[1.2rem] pb-1">My day</p> <p class="text-sm">${currentDate}</p></div>`;

  // update navigation lists
  updateNavigationList(isFromBackBtn, "todo");
  const fragment = document.createDocumentFragment();

  const todoSidebar = getTodoSidebar();
  const todoMainContent = getTodoMainContent(todayTodo, headingTitle);

  const todoSidebarItems = todoSidebar.querySelectorAll("li");
  todoSidebarItems.forEach((sidebarItem) => {
    sidebarItem.addEventListener("click", () => {
      todoSidebar.classList.remove("show-side-bar");
      const todo = getLatestTodoLists();
      const todoMainContentElem = document.querySelector(".todo-main-content");
      const sectionName = sidebarItem.dataset.sectionName;
      if (sectionName === "All Todo") {
        const headingTitle = `<i class="fa-solid fa-house"></i><span>${sectionName}</span>`;
        todoMainContentElem.replaceWith(getTodoMainContent(todo, headingTitle));
      } else if (sectionName === "Important") {
        const headingTitle = `<i class="fa-regular fa-star"></i><span>${sectionName}</span>`;
        const importantTodo = todo.filter((todo) => todo.isImportant);
        todoMainContentElem.replaceWith(
          getTodoMainContent(importantTodo, headingTitle)
        );
      } else if (sectionName === "Completed") {
        const headingTitle = `<i class="fa-regular fa-circle-check"></i><span>${sectionName}</span>`;
        const completedTodo = todo.filter((todo) => todo.isCompleted);
        todoMainContentElem.replaceWith(
          getTodoMainContent(completedTodo, headingTitle)
        );
      } else if (sectionName === "My day") {
        const todayTodo = todo.filter((todo) => todo.dueDate === currentDate);
        todoMainContentElem.replaceWith(
          getTodoMainContent(todayTodo, headingTitle)
        );
      } else {
        todoMainContentElem.replaceWith(getTodoMainContent([], "Add todo"));
      }
    });
  });
  fragment.append(todoSidebar, todoMainContent);
  return fragment;
};

export default getTodoPage;
export { currentDate, getLatestTodoLists };
