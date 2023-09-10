export const getContextMenu = (e) => {
  let contextMenu = document.querySelector(".context-menu");
  contextMenu?.remove();
  const ul = document.createElement("ul");
  ul.className =
    "context-menu bg-white w-[100px] flex flex-col gap-2 p-1 border shadow absolute z-20";
  const li = document.createElement("li");
  li.className = "flex w-full gap-2 items-center p-2 hover:bg-zinc-50 text-sm";
  li.innerHTML = `
    <i class="fa-solid fa-trash-alt"></i>
    <span>Delete</span>
  `;

  let x = e.offsetX,
    y = e.offsetY;
  let xDistance = e.currentTarget.clientWidth - x >= 90;
  ul.style.left = (xDistance ? x : x - 90) + "px";
  ul.style.top = y + "px";

  ul.append(li);

  setTimeout(() => {
    ul.remove();
  }, 2000);

  return ul;
};
