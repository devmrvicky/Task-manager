const getIndividualTodo = ({ todo, isCompleted, isImportant }) => {
  const fragment = document.createDocumentFragment();
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = "checkbox";
  checkbox.checked = isCompleted ? true : false;
  const todoElem = document.createElement("div");
  todoElem.className = `w-full flex-1 text-[#fff]`;
  todoElem.appendChild(document.createTextNode(todo));
  const importantLabel = document.createElement("label");
  importantLabel.id = "important-todo";
  const importantCheckbox = document.createElement("input");
  importantCheckbox.id = "important-todo";
  importantCheckbox.checked = isImportant ? true : false;
  const importantIcon = document.createElement("i");
  importantIcon.className = `fa-${
    importantCheckbox.checked ? "solid" : "regular"
  } fa-star text-[#fff]`;
  importantCheckbox.classList.add("hidden");
  importantLabel.append(importantIcon, importantCheckbox);
  fragment.append(checkbox, todoElem, importantLabel);
  return fragment;
};

const getTodoLists = (lists) => {
  const listsElem = document.createElement("ul");
  listsElem.className = `flex-1 p-5 flex flex-col gap-2`;
  if (!lists || lists.length === 0) {
    const imgContainer = document.createElement("li");
    imgContainer.className = `flex flex-col mx-auto items-center my-10`;
    const fragment = document.createDocumentFragment();
    const img = document.createElement("img");
    img.src = `../../../public/write-note.png`;
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
    // const { dueDate } = list;
    const listElem = document.createElement("li");
    listElem.className = `todo-list w-full border flex items-center gap-3 px-4 py-2 bg-[#719191] rounded`;
    // const dateElem = document.createElement("div");
    // listElem.appendChild(document.createTextNode(dueDate));
    const fragment = getIndividualTodo(list);
    listElem.appendChild(fragment);
    listsElem.append(listElem);
  });
  return listsElem;
};

export default getTodoLists;
