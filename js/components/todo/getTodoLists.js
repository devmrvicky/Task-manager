import { getUsersFromLocalStorage, users } from "../../main";
import { getLatestTodoLists } from "../../pages/todo";
import { getContextMenu } from "../common/getContextMenu";

const imagePath = import.meta.env.BASE_URL + "/write-note.png";

const getCheckboxLabel = (condition, elemName) => {
  const div = document.createElement("div");
  div.title = elemName;
  div.classList.add(elemName);
  const icon = document.createElement("i");
  icon.className = `fa-${condition ? "solid" : "regular"} ${
    elemName === "important-todo"
      ? "fa-star"
      : `fa-circle${condition ? "-check" : ""}`
  } text-[#fff]`;
  div.append(icon);
  return div;
};

const getIndividualTodo = ({ todo, isCompleted, isImportant }) => {
  const listElem = document.createElement("li");
  listElem.className = `todo-list w-full border flex items-center gap-3 px-4 py-2 bg-[#719191] rounded relative`;
  listElem.setAttribute("data-completed", false);
  const fragment = document.createDocumentFragment();
  const checkbox = getCheckboxLabel(isCompleted, "completed-todo");
  let importantLabel = null;
  let todoElem;
  if (isCompleted) {
    todoElem = document.createElement("s");
  } else {
    todoElem = document.createElement("div");
    importantLabel = getCheckboxLabel(isImportant, "important-todo");
  }
  todoElem.className = `todo-elem w-full flex-1 text-[#fff]`;
  todoElem.appendChild(document.createTextNode(todo));
  if (importantLabel) {
    fragment.append(checkbox, todoElem, importantLabel);
  } else {
    fragment.append(checkbox, todoElem);
  }
  listElem.appendChild(fragment);
  return listElem;
};

// update current user's todo list
const updateCurrentUserTodo = (updatedTodoLists) => {
  getUsersFromLocalStorage();
  localStorage.setItem(
    "users",
    JSON.stringify(
      users.map((user) =>
        user.current_user ? { ...user, user_todo: updatedTodoLists } : user
      )
    )
  );
};

const getTodoLists = (lists) => {
  const listsElem = document.createElement("ul");
  listsElem.className = `todo-lists flex-1 p-5 flex flex-col gap-2 overflow-auto`;
  if (!lists || lists.length === 0) {
    const imgContainer = document.createElement("li");
    imgContainer.className = `flex flex-col mx-auto items-center my-10`;
    const fragment = document.createDocumentFragment();
    const img = document.createElement("img");
    img.src = imagePath;
    const textMsg = document.createElement("div");
    textMsg.className = `w-full flex flex-col gap-2 items-center`;
    textMsg.innerHTML = `
      <p class="text-xl font-bold pt-4">Focus on your day</p>
      <span class="text-xs">You have not crate any todo yet</span>
    `;
    // imgContainer.append(img);
    fragment.append(img, textMsg);
    imgContainer.append(fragment);
    listsElem.append(imgContainer);
    return listsElem;
  }
  lists.forEach((list) => {
    const fragment = document.createDocumentFragment();
    const li = getIndividualTodo(list);

    // delete individual todo
    li.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      const contextmenu = getContextMenu(e);
      const deleteBtn = contextmenu.querySelector("ul li");
      deleteBtn.onclick = () => {
        const allTodo = getLatestTodoLists();
        let filteredTodoLists = allTodo.filter((li) => li.id !== list.id);
        updateCurrentUserTodo(filteredTodoLists);
        li.remove();
      };
      li.append(contextmenu);
  
    });

    // complete todo
    const importantBtn = li.querySelector(".important-todo");
    const completeCheckbox = li.querySelector(".completed-todo");
    const todoElem = li.querySelector(".todo-elem");
    completeCheckbox.addEventListener("click", () => {
      const checkedIcon = document.createElement("i");
      checkedIcon.classList.add("fa-solid", "fa-circle-check", "text-white");
      completeCheckbox.replaceChildren(checkedIcon);
      const strikethroughElem = document.createElement("s");
      strikethroughElem.classList.add(
        "text-zinc-100",
        "todo-elem",
        "w-full",
        "flex-1"
      );
      strikethroughElem.appendChild(document.createTextNode(list.todo));
      todoElem.replaceWith(strikethroughElem);
      const allTodo = getLatestTodoLists();
      let filteredTodoLists = allTodo.map((li) =>
        li.id === list.id ? { ...li, isCompleted: true } : li
      );
      updateCurrentUserTodo(filteredTodoLists);
      importantBtn.style.display = "none";
      
    });

    // make important todo
    importantBtn?.addEventListener("click", () => {
      const importantIcon = document.createElement("i");
      importantIcon.classList.add("fa-solid", "fa-star", "text-white");
      importantBtn.replaceChildren(importantIcon);
      const allTodo = getLatestTodoLists();
      let filteredTodoLists = allTodo.map((li) =>
        li.id === list.id ? { ...li, isImportant: true } : li
      );
      updateCurrentUserTodo(filteredTodoLists);
      
    });

    fragment.appendChild(li);
    listsElem.append(fragment);
  });
  return listsElem;
};

export default getTodoLists;
export { getIndividualTodo };
