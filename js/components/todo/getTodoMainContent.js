import { getUsersFromLocalStorage, users } from "../../main";
import { currentDate, getLatestTodoLists } from "../../pages/todo";
import getAddTodoInput from "./getAddTodoInput";
import getTodoHead from "./getTodoHead";
import getTodoLists from "./getTodoLists";

class createTodo {
  constructor(id, todo, dueDate, isCompleted, isImportant, createdDate) {
    this.id = id;
    this.todo = todo;
    this.dueDate = dueDate;
    this.isCompleted = isCompleted;
    this.isImportant = isImportant;
    this.createdDate = createdDate;
  }
}

let filteredTodoLists = [];

const updateTodoListsDom = (sectionName, newTodo) => {
  const todo = getLatestTodoLists();
  if (sectionName.includes("All todo")) {
    filteredTodoLists = todo;
  } else if (sectionName.includes("Important")) {
    filteredTodoLists = todo.filter((todo) => todo.isImportant);
  } else if (sectionName.includes("Completed")) {
    filteredTodoLists = todo.filter((todo) => todo.isCompleted);
  } else if (sectionName.includes("My day")) {
    filteredTodoLists = todo.filter((todo) => todo.dueDate === currentDate);
  } else {
    filteredTodoLists.unshift(newTodo);
  }
  const todoListElem = document.querySelector(".todo-lists");
  todoListElem.replaceWith(getTodoLists(filteredTodoLists));
};

const getTodoMainContent = (todo, sectionName) => {
  const todoMainContent = document.createElement("div");
  todoMainContent.className =
    "todo-main-content flex flex-col border flex-1 bg-[#EAF1F1] p-3 rounded-xl overflow-auto";
  const fragment = document.createDocumentFragment();
  const todoHead = getTodoHead(sectionName);
  const todoLists = getTodoLists(todo);
  const addTodoInput = getAddTodoInput(sectionName);

  const updateTodoLists = (newTodo) => {
    getUsersFromLocalStorage();
    const updatedUsers = users.map((user) =>
      user.current_user
        ? Array.isArray(user.user_todo)
          ? { ...user, user_todo: [newTodo, ...user.user_todo] }
          : { ...user, user_todo: [newTodo] }
        : user
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    updateTodoListsDom(sectionName, newTodo);
  };

  const todoInput = addTodoInput.querySelector("input");
  todoInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      let newTodo = new createTodo(
        Date.now(),
        todoInput.value,
        currentDate,
        false,
        false,
        currentDate
      );
      if (
        sectionName.includes("Add todo") ||
        sectionName.includes("Important") ||
        sectionName.includes("All todo")
      ) {
        if (sectionName.includes("Important")) {
          newTodo.isImportant = true;
        }
        const inputs = todoHead.querySelectorAll("input");
        inputs.forEach((input) => {
          if (input.type === "date") {
            newTodo.dueDate = input.value;
          } else {
            newTodo.dueTime = input.value;
          }
        });
        updateTodoLists(newTodo);
        todoInput.value = "";
        return;
      } else if (sectionName.includes("My day")) {
        newTodo.dueDate = currentDate;
      }
      updateTodoLists(newTodo);
      todoInput.value = "";
    }
  });

  if (sectionName.includes("Completed")) {
    fragment.append(todoHead, todoLists);
  } else {
    fragment.append(todoHead, todoLists, addTodoInput);
  }
  todoMainContent.appendChild(fragment);
  return todoMainContent;
};
export default getTodoMainContent;
export { updateTodoListsDom };
