const fileOptList = () => {
  const optsContainer = document.createElement("div");
  optsContainer.className = `opts-container w-[200px] flex flex-col gap-2 bg-white shadow rounded absolute top-[32px] left-0 text-base scale-y-0 group-hover:scale-y-100 origin-top overflow-hidden invisible group-hover:visible p-2`;
  const saveOpt = document.createElement("div");
  saveOpt.className = `save-btn flex w-full flex-1 items-center gap-2 px-2 py-1 hover:bg-[#EAF1F1] rounded`;
  saveOpt.innerHTML = `
    <i class="fa-solid fa-floppy-disk"></i>
    <span>save</span>
    <span class="ml-auto text-zinc-500 text-sm">Ctrl + s</span>
  `;
  optsContainer.append(saveOpt);
  return optsContainer;
};

export const getTextEditorMoreOpt = () => {
  const editorHead = document.createElement("div");
  editorHead.className = "editor-top-head flex items-center gap-3 p-1 pl-16";
  const fragment = document.createDocumentFragment();
  const classes = `hover:bg-[#EAF1F1] rounded-[2px] text-sm px-2 p-1 relative group`;
  const fileOpt = document.createElement("div");
  fileOpt.appendChild(document.createTextNode("File"));
  fileOpt.className = `${classes} file`;
  fileOpt.insertAdjacentElement("beforeend", fileOptList());

  const insertOpt = document.createElement("div");
  insertOpt.appendChild(document.createTextNode("Insert"));
  insertOpt.className = `${classes} insert`;

  const viewOpt = document.createElement("div");
  viewOpt.appendChild(document.createTextNode("View"));
  viewOpt.className = `${classes} view`;

  const closeBtn = document.createElement("div");
  closeBtn.className = `close-editor ml-auto border rounded-full min-w-[40px] h-[40px] hover:bg-zinc-200 flex items-center justify-center text-xl cursor-pointer`;
  closeBtn.innerHTML = `<i class="fa-solid fa-xmark"></i>`;

  fragment.append(fileOpt, insertOpt, viewOpt, closeBtn);

  editorHead.appendChild(fragment);
  return editorHead;
};
