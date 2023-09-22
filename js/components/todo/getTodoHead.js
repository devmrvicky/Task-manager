const getTodoHead = (sectionName = "Today") => {
  const todoHead = document.createElement("div");
  todoHead.className = `todo-head flex items-center w-full justify-between`;
  const fragment = document.createDocumentFragment();
  const headTitle = document.createElement("div");
  headTitle.className = `p-2 flex items-center gap-3`;
  headTitle.insertAdjacentHTML("afterbegin", sectionName);
  fragment.append(headTitle);
  todoHead.append(fragment);
  return todoHead;
};
export default getTodoHead;
