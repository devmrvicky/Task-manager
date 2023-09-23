import { getUsersFromLocalStorage, users } from "../../main";
import { currentDate, tempTodoLists } from "../../pages/todo";
import getAddTodoInput from "./getAddTodoInput";
import getTodoHead from "./getTodoHead";
import getTodoLists, { getIndividualTodo } from "./getTodoLists";

class createTodo {
  constructor(id, todo, dueDate, isCompleted, isImportant) {
    this.id = id;
    this.todo = todo;
    this.dueDate = dueDate;
    this.isCompleted = isCompleted;
    this.isImportant = isImportant;
  }
}

const getTodoMainContent = (todo, sectionName) => {
  const todoMainContent = document.createElement("div");
  todoMainContent.className =
    "todo-main-content flex flex-col border flex-1 bg-[#EAF1F1] p-3 rounded-xl overflow-auto";
  const fragment = document.createDocumentFragment();
  const todoHead = getTodoHead(sectionName);
  const todoLists = getTodoLists(todo);
  const addTodoInput = getAddTodoInput(sectionName);

  const updateTodoLists = (newTodo, sectionName = "") => {
    getUsersFromLocalStorage();
    const updatedUsers = users.map((user) =>
      user.current_user
        ? Array.isArray(user.user_todo)
          ? { ...user, user_todo: [newTodo, ...user.user_todo] }
          : { ...user, user_todo: [newTodo] }
        : user
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    if (sectionName === "Add todo") {
      tempTodoLists.unshift(newTodo);
      const todoListElem = document.querySelector(".todo-lists");
      todoListElem.replaceWith(getTodoLists(tempTodoLists));
    } else {
      const todoListElem = getIndividualTodo(newTodo);
      todoLists.prepend(todoListElem);
    }
    console.log(todoLists);
  };

  const todoInput = addTodoInput.querySelector("input");
  todoInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      let newTodo = new createTodo(
        Date.now(),
        todoInput.value,
        currentDate,
        false,
        false
      );
      if (sectionName.includes("My day")) {
        newTodo.dueDate = currentDate;
      } else if (sectionName.includes("Important")) {
        newTodo.isImportant = true;
      } else if (sectionName.includes("Add todo")) {
        const inputs = todoHead.querySelectorAll("input");
        inputs.forEach((input) => {
          if (input.type === "date") {
            newTodo.dueDate = input.value;
          } else {
            newTodo.dueTime = input.value;
          }
        });
        updateTodoLists(newTodo, "Add todo");
        todoInput.value = "";
        return;
      }
      updateTodoLists(newTodo);
      todoInput.value = "";
    }
  });

  fragment.append(todoHead, todoLists, addTodoInput);
  todoMainContent.appendChild(fragment);
  return todoMainContent;
};
export default getTodoMainContent;
