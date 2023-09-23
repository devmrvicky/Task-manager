import { currentDate } from "../../pages/todo";

const getTodoHead = (sectionName = "Today") => {
  const todoHead = document.createElement("div");
  todoHead.className = `todo-head flex items-center w-full bg-[#EAF1F1] sticky top-0 z-20 border-b `;
  const fragment = document.createDocumentFragment();

  const sidebarToggleBtn = document.createElement("button");
  sidebarToggleBtn.className = `content-side-menu todo-side-menu hidden min-w-[35px] h-[35px] border rounded-full hover:bg-[#719191] text-black hover:text-white items-center justify-center`;
  const btnIcon = document.createElement("i");
  btnIcon.className = `fa-solid fa-bars`;
  sidebarToggleBtn.appendChild(btnIcon);

  sidebarToggleBtn.addEventListener("click", () => {
    const targetElem =
      sidebarToggleBtn.parentElement.parentElement.previousElementSibling;
    targetElem.classList.toggle("show-side-bar");
    sidebarToggleBtn.classList.toggle("translate-btn");
  });

  const headTitle = document.createElement("div");
  headTitle.className = `p-2 flex items-center gap-3 text-[1.2rem]`;
  headTitle.insertAdjacentHTML("afterbegin", sectionName);
  if (sectionName.includes("My day") || sectionName.includes("Completed")) {
    fragment.append(sidebarToggleBtn, headTitle);
    todoHead.append(fragment);
    return todoHead;
  }
  const toggleDateInputsBtn = document.createElement("button");
  toggleDateInputsBtn.className = `toggle-date-inputs-btn w-7 h-5 hover:bg-zinc-50 flex items-center justify-center text-sm rounded hidden`;
  const verticalMenuIcon = document.createElement("i");
  verticalMenuIcon.className = `fa-solid fa-ellipsis`;
  toggleDateInputsBtn.appendChild(verticalMenuIcon);

  const inputField = document.createElement("div");
  inputField.className = `input-field ml-auto flex items-center gap-3 rounded`;
  const inputClasses = `text-sm border border-[#719191] p-[3px] bg-[#EAF1F1] `;
  const dateInput = document.createElement("input");
  dateInput.className = `${inputClasses} mr-2`;
  dateInput.type = "date";
  dateInput.value = currentDate;
  const timeInput = document.createElement("input");
  timeInput.className = inputClasses;
  timeInput.type = "time";
  timeInput.value = "09:30";
  inputField.append(dateInput, timeInput);

  toggleDateInputsBtn.addEventListener("click", () => {
    inputField.classList.toggle("show-input-field");
  });

  fragment.append(sidebarToggleBtn, headTitle, toggleDateInputsBtn, inputField);
  todoHead.append(fragment);
  return todoHead;
};
export default getTodoHead;
