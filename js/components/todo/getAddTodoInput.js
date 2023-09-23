const getAddTodoInput = (sectionName) => {
  const inputField = document.createElement("div");
  inputField.className = `w-full bg-[#719191]/80 focus-within:bg-[#719191] text-white flex items-center gap-2 p-2 px-4 mt-auto rounded sticky bottom-0 z-20`;
  const fragment = document.createDocumentFragment();
  const inputIcon = document.createElement("i");
  inputIcon.className = `fa-solid fa-plus`;
  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Add todo";
  input.id = "todo-input";
  input.className = `w-full outline-none bg-transparent p-1 px-2 text-white placeholder:text-white`;
  input.addEventListener("click", () => {
    inputIcon.className = `fa-regular fa-circle`;
    input.placeholder = "Add a todo in My day";
  });
  input.addEventListener("blur", () => {
    inputIcon.className = `fa-regular fa-plus`;
    input.placeholder = "Add todo";
  });
  fragment.append(inputIcon, input);
  inputField.appendChild(fragment);
  return inputField;
};
export default getAddTodoInput;
