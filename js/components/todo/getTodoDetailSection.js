import { currentDate, getLatestTodoLists } from "../../pages/todo";
import {
  deleteIndividualTodo,
  getIndividualTodo,
  updateCurrentUserTodo,
} from "./getTodoLists";
import { updateTodoListsDom } from "./getTodoMainContent";

const updateTodoFromSidebar = (todoElem, todoItem) => {
  const currentSectionName =
    document.querySelector(".todo-main-page").dataset.currentSection;
  todoElem.addEventListener("click", () => {
    const todoInput = document.createElement("input");
    todoInput.className = `todo-elem w-full bg-transparent outline-none text-white`;
    todoInput.value = todoElem.textContent;
    todoElem.replaceWith(todoInput);

    const replaceInputWithNewTodoElem = () => {
      const updatedTodoValue = todoInput.value;
      let newTodoElem;
      if (todoItem.isCompleted) {
        newTodoElem = document.createElement("s");
      } else {
        newTodoElem = document.createElement("p");
      }
      newTodoElem.className = `text-white w-full cursor-text`;
      newTodoElem.appendChild(document.createTextNode(updatedTodoValue));
      todoInput?.replaceWith(newTodoElem);
      updateTodoFromSidebar(newTodoElem, todoItem);
      return updatedTodoValue;
    };

    todoInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        const updatedTodoValue = replaceInputWithNewTodoElem();
        const allTodo = getLatestTodoLists();
        let updatedTodoObj = allTodo.map((li) =>
          li.id === todoItem.id ? { ...li, todo: updatedTodoValue } : li
        );
        updateCurrentUserTodo(updatedTodoObj);
        updateTodoListsDom(currentSectionName, {
          ...todoItem,
          todo: updatedTodoValue,
        });
      }
    });
  });
};

const getTodoDetailSection = (todoItem, li) => {
  const todoSidebar = document.createElement("div");
  todoSidebar.className = `todo-individual-section p-3 bg-[#EAF1F1] w-3/12 rounded-xl text-[#719191] flex flex-col gap-3 border min-w-[300px] relative`;
  todoSidebar.id = "todo-individual-section";
  todoSidebar.setAttribute("data-todo-name", todoItem.todo);
  const fragment = document.createDocumentFragment();
  const todoLists = document.createElement("ul");
  const individualTodo = getIndividualTodo(todoItem);

  const todoElem = individualTodo.querySelector(".todo-elem");
  todoElem.className += " cursor-text";
  updateTodoFromSidebar(todoElem, todoItem);

  todoLists.append(individualTodo);

  // individual todo sidebar footer
  const footer = document.createElement("div");
  footer.className = `w-full fixed bottom-0 left-0 border-t flex items-center gap-3 p-2 bg-[#EAF1F1]`;
  const footerFragment = document.createDocumentFragment();
  const collapseButton = document.createElement("button");
  collapseButton.className = `w-10 h-10 rounded-full hover:bg-zinc-200 flex items-center justify-center active:scale-75`;
  collapseButton.insertAdjacentHTML(
    "afterbegin",
    `<i class="fa-solid fa-arrow-right-from-bracket"></i>`
  );

  collapseButton.addEventListener("click", () => {
    todoSidebar.remove();
  });

  const createdDateElem = document.createElement("div");
  createdDateElem.className = `flex-1 text-center text-sm`;
  createdDateElem.appendChild(
    document.createTextNode(
      `Created on ${
        todoItem.createdDate ? todoItem.createdDate : "Not specified"
      }`
    )
  );
  const deleteBtn = document.createElement("button");
  deleteBtn.className = `w-10 h-10 rounded-full hover:bg-zinc-200 flex items-center justify-center active:scale-75`;
  deleteBtn.insertAdjacentHTML(
    "afterbegin",
    `<i class="fa-solid fa-trash-alt text-red-500"></i>`
  );

  deleteBtn.addEventListener("click", () => {
    deleteIndividualTodo(li, todoItem);
    todoSidebar.remove();
  });

  footerFragment.append(collapseButton, createdDateElem, deleteBtn);
  footer.appendChild(footerFragment);

  fragment.append(todoLists, footer);
  todoSidebar.append(fragment);
  return todoSidebar;
};

export default getTodoDetailSection;
