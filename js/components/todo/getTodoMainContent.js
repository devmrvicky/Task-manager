import getAddTodoInput from "./getAddTodoInput";
import getTodoHead from "./getTodoHead";
import getTodoLists from "./getTodoLists";

/*
const todo = {
  "20march2024":[
    {

    }
  ]
}
*/

const getTodoMainContent = (todo, sectionName) => {
  const todoMainContent = document.createElement("div");
  todoMainContent.className =
    "todo-main-content flex flex-col border flex-1 bg-[#EAF1F1] p-3 rounded-xl overflow-auto";
  const fragment = document.createDocumentFragment();
  const todoHead = getTodoHead(sectionName);
  const todoLists = getTodoLists(todo);
  const addTodoInput = getAddTodoInput();

  const todoInput = addTodoInput.querySelector("input");
  todoInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      console.log(todoInput.value);
    }
  });

  fragment.append(todoHead, todoLists, addTodoInput);
  todoMainContent.appendChild(fragment);
  return todoMainContent;
};
export default getTodoMainContent;
