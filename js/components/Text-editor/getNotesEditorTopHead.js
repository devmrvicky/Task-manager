import { getTitle } from "./getNotesEditor";

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

const getTextEditorMoreOpt = () => {
  const editorMoreOpts = document.createElement("div");
  editorMoreOpts.className =
    "editor-more-opts flex items-center gap-3 p-1 pl-16";
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

  fragment.append(fileOpt, insertOpt, viewOpt);

  editorMoreOpts.appendChild(fragment);
  return editorMoreOpts;
};

export const getNoteTitleHeading = (titleHeading) => {
  if (!titleHeading) {
    titleHeading = getTitle();
  }
  const titleHeadingElem = document.createElement("div");
  titleHeadingElem.className = `title-heading flex items-center border-b outline-none bg-white absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]`;
  titleHeadingElem.setAttribute("contenteditable", "true");
  titleHeadingElem.appendChild(document.createTextNode(titleHeading));
  return titleHeadingElem;
};

export const getNotesEditorTopHead = () => {
  const editorTopHead = document.createElement("div");
  editorTopHead.className = `editor-top-head flex items-center justify-between p-1 relative`;
  const fragment = document.createDocumentFragment();
  const closeBtn = document.createElement("div");
  closeBtn.className = `close-editor ml-auto border rounded-full min-w-[40px] h-[40px] hover:bg-zinc-200 flex items-center justify-center text-xl cursor-pointer`;
  closeBtn.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
  fragment.append(getTextEditorMoreOpt(), getNoteTitleHeading(), closeBtn);
  editorTopHead.append(fragment);
  return editorTopHead;
};
