const createTodoSidebarItem = (itemName) => {
  let iconClass;
  switch (itemName) {
    case "My day":
      iconClass = "fa-solid fa-sun";
      break;
    case "Important":
      iconClass = "fa-regular fa-star";
      break;
    case "Completed":
      iconClass = "fa-regular fa-circle-check";
      break;
    case "All Todo":
      iconClass = "fa-solid fa-house";
      break;
    case "Add todo":
      iconClass = "fa-solid fa-plus";
      break;
  }

  const li = document.createElement("li");
  li.className = `${
    itemName === "Add todo"
      ? "border rounded border-[#719191]/50 hover:bg-slate-50 cursor-pointer mt-auto"
      : "hover:bg-white cursor-default rounded-full"
  } flex items-center gap-4 py-2 px-4 sm:text-base text-xs`;
  li.setAttribute("data-section-name", itemName);
  const fragment = document.createDocumentFragment();
  const icon = document.createElement("i");
  icon.className = iconClass;
  const sectionName = document.createElement("span");
  sectionName.appendChild(document.createTextNode(itemName));
  fragment.append(icon, sectionName);
  li.append(fragment);
  return li;
};

export const getTodoSidebar = () => {
  const todoSidebar = document.createElement("ul");
  todoSidebar.className = `content-sidebar-item todo-sidebar-item p-3 bg-[#EAF1F1] w-3/12 rounded-xl text-[#719191] flex flex-col gap-3 border`;

  const fragment = document.createDocumentFragment();
  // create to do sidebar item
  const myDay = createTodoSidebarItem("My day");
  const important = createTodoSidebarItem("Important");
  const completed = createTodoSidebarItem("Completed");
  const allTodo = createTodoSidebarItem("All Todo");
  const addTodo = createTodoSidebarItem("Add todo");
  fragment.append(myDay, important, completed, allTodo, addTodo);
  todoSidebar.append(fragment);
  return todoSidebar;
};
