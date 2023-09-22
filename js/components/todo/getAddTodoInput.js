const getAddTodoInput = () => {
  const inputField = document.createElement("div");
  inputField.className = `w-full bg-[#719191]/80 focus-within:bg-[#719191] text-white flex items-center gap-2 p-2 px-4 mt-auto rounded`;
  const fragment = document.createDocumentFragment();
  const inputIcon = document.createElement("i");
  inputIcon.className = `text-[1.2rem] fa-solid fa-plus`;
  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "My to do";
  input.id = "todo-input";
  input.className = `w-full outline-none bg-transparent p-1 px-2 text-white placeholder:text-white`;
  fragment.append(inputIcon, input);
  inputField.appendChild(fragment);
  return inputField;
};
export default getAddTodoInput;
