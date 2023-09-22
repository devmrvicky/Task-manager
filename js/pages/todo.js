import { getTodoSidebar } from "../components/todo/getTodoSidebar";
import getTodoMainContent from "../components/todo/getTodoMainContent";
import { taskManagerContent, updateNavigationList } from "../main";
import getTimeObj from "../components/getTimeObj";

const todo = [
  {
    id: "todo_1",
    dueDate: "22/09/2023",
    todo: "this is todo",
    isImportant: true,
    isCompleted: false,
  },
  {
    id: "todo_2",
    dueDate: "22/09/2023",
    todo: "this is todo",
    isImportant: false,
    isCompleted: true,
  },
  {
    id: "todo_3",
    dueDate: "21/03/2024",
    todo: "this is todo",
    isImportant: false,
    isCompleted: true,
  },
  {
    id: "todo_4",
    dueDate: "21/03/2024",
    todo: "this is todo",
    isImportant: false,
    isCompleted: false,
  },
  {
    id: "todo_5",
    dueDate: "22/03/2024",
    todo: "this is todo",
    isImportant: false,
    isCompleted: false,
  },
];

const getTodoPage = (isFromBackBtn = false) => {
  taskManagerContent.parentElement.style.height = 100 + "vh";
  // * get current date
  const dateObj = getTimeObj();
  const currentDate = `${dateObj.date}/${dateObj.month}/${dateObj.year}`;
  const todayTodo = todo.filter((todo) => todo.dueDate === currentDate);
  const headingTitle = `<div><p class="text-xl font-semibold pb-2">My day</p> <p>${currentDate}</p></div>`;

  // update navigation lists
  updateNavigationList(isFromBackBtn, "todo");
  const fragment = document.createDocumentFragment();
  const todoSidebar = getTodoSidebar();
  let todoMainContent = getTodoMainContent(todayTodo, headingTitle);
  const todoSidebarItems = todoSidebar.querySelectorAll("li");
  todoSidebarItems.forEach((sidebarItem) => {
    sidebarItem.addEventListener("click", () => {
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
