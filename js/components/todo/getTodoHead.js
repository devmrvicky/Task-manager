const getTodoHead = (sectionName = "Today") => {
  const todoHead = document.createElement("div");
  todoHead.className = `todo-head flex items-center w-full justify-between bg-[#EAF1F1] sticky top-0 z-20`;
  const fragment = document.createDocumentFragment();

  const sidebarToggleBtn = document.createElement("button");
  sidebarToggleBtn.className = `content-side-menu todo-side-menu hidden min-w-[44px] h-11 border rounded-full bg-white items-center justify-center`;
  const btnIcon = document.createElement("i");
  btnIcon.className = `fa-solid fa-bars sm:text-xl`;
  sidebarToggleBtn.appendChild(btnIcon);

  const headTitle = document.createElement("div");
  headTitle.className = `p-2 flex items-center gap-3 text-[1.5rem]`;
  headTitle.insertAdjacentHTML("afterbegin", sectionName);
  if (sectionName.includes("Add todo")) {
    const inputClasses = `text-sm border border-[#719191] p-[3px] bg-[#EAF1F1] `;
    const dateInput = document.createElement("input");
    dateInput.className = `ml-auto ${inputClasses} mr-2`;
    dateInput.type = "date";
    dateInput.value = "2023-09-22";
    const timeInput = document.createElement("input");
    timeInput.className = inputClasses;
    timeInput.type = "time";
    timeInput.value = "09:30";
    fragment.append(sidebarToggleBtn, headTitle, dateInput, timeInput);
    todoHead.append(fragment);
    return todoHead;
  }
  fragment.append(sidebarToggleBtn, headTitle);
  todoHead.append(fragment);
  return todoHead;
};
export default getTodoHead;
