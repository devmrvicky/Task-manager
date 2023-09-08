export const getNotesWritingArea = () => {
  const container = document.createElement("div");
  container.className = `writing-area-container flex-1 w-full overflow-auto bg-[#F9FBFD] flex justify-center py-3`;
  const writingArea = document.createElement("div");
  let width = `700`;
  writingArea.className = `writing-area p-2 border bg-white w-[${width}px] h-[${
    1.414 * width
  }px] outline-none`;
  writingArea.setAttribute("contenteditable", "true");
  // writingArea.setAttribute("draggable", "true");
  writingArea.appendChild(
    document.createTextNode(`${width}px x ${1.414 * width}px`)
  );
  container.append(writingArea);
  return container;
};
