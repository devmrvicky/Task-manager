import { getUsersFromLocalStorage, users } from "../../main";
import { getLatestTodoLists } from "../../pages/todo";
import { getContextMenu } from "../common/getContextMenu";

const imagePath = import.meta.env.BASE_URL + "/write-note.png";

const getCheckboxLabel = (condition, checkboxName) => {
  const label = document.createElement("label");
  label.id = checkboxName;
  const checkboxInput = document.createElement("input");
  checkboxInput.id = checkboxName;
  checkboxInput.checked = condition ? true : false;
  const icon = document.createElement("i");
  icon.className = `fa-${checkboxInput.checked ? "solid" : "regular"} ${
    checkboxName === "important-todo"
      ? "fa-star"
      : `fa-circle${checkboxInput.checked ? "-check" : ""}`
  } text-[#fff]`;
  checkboxInput.classList.add("hidden");
  label.append(icon, checkboxInput);
  return label;
};

const getIndividualTodo = ({ todo, isCompleted, isImportant }) => {
  const listElem = document.createElement("li");
  listElem.className = `todo-list w-full border flex items-center gap-3 px-4 py-2 bg-[#719191] rounded relative`;
  const fragment = document.createDocumentFragment();
  const checkbox = getCheckboxLabel(isCompleted, "completed-todo");
  const todoElem = document.createElement("div");
  todoElem.className = `w-full flex-1 text-[#fff]`;
  todoElem.appendChild(document.createTextNode(todo));
  const importantLabel = getCheckboxLabel(isImportant, "important-todo");
  fragment.append(checkbox, todoElem, importantLabel);
  listElem.appendChild(fragment);
  return listElem;
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

    li.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      const contextmenu = getContextMenu(e);
      const deleteBtn = contextmenu.querySelector("ul li");
      deleteBtn.onclick = () => {
        const allTodo = getLatestTodoLists();
        getUsersFromLocalStorage();
        let filteredTodoLists = allTodo.filter((li) => li.id !== list.id);
        localStorage.setItem(
          "users",
          JSON.stringify(
            users.map((user) =>
              user.current_user
                ? { ...user, user_todo: filteredTodoLists }
                : user
            )
          )
        );
        li.remove();
      };
      li.append(contextmenu);
    });

    fragment.appendChild(li);
    listsElem.append(fragment);
  });
  return listsElem;
};

export default getTodoLists;
export { getIndividualTodo };
