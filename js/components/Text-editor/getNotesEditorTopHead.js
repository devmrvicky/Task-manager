import { getTraceIcon } from "../edit-user/openUserEditPage";
import { getTitle } from "./getNotesEditor";

const fileOptList = () => {
  const optsContainer = document.createElement("div");
  optsContainer.className = `opts-container w-[200px] flex flex-col gap-2 bg-white shadow rounded absolute top-[32px] left-0 z-40 text-base scale-y-0 group-hover:scale-y-100 origin-top overflow-hidden invisible group-hover:visible p-2 border`;
  const fragment = document.createDocumentFragment();
  const classes = ` flex w-full flex-1 items-center gap-2 px-2 py-1 hover:bg-[#EAF1F1] rounded text-sm`;
  const newPage = document.createElement("div");
  newPage.className = `create-new-page ${classes}`;
  newPage.innerHTML = `
    <i class="fa-solid fa-file-circle-plus"></i>
    <span>new page</span>
    <span class="ml-auto text-zinc-500 text-xs">Ctrl + n</span>
  `;
  const saveOpt = document.createElement("div");
  saveOpt.className = `save-btn ${classes}`;
  saveOpt.innerHTML = `
    <i class="fa-solid fa-floppy-disk"></i>
    <span>save</span>
    <span class="ml-auto text-zinc-500 text-xs">Ctrl + s</span>
  `;
  fragment.append(newPage, saveOpt);
  optsContainer.append(fragment);
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

  const traceIcon = getTraceIcon("new document");
  titleHeadingElem.insertAdjacentElement("afterbegin", traceIcon);

  return titleHeadingElem;
};

export const getNotesEditorTopHead = () => {
  const editorTopHead = document.createElement("div");
  editorTopHead.className = `editor-top-head flex items-center justify-between p-1 relative`;
  const fragment = document.createDocumentFragment();
  const closeBtn = document.createElement("div");
  const btnClasses = `border rounded-full min-w-[40px] h-[40px] hover:bg-zinc-200 flex items-center justify-center text-xl cursor-pointer`;
  closeBtn.className = `close-editor ml-auto ${btnClasses}`;
  closeBtn.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
  const moreOptsToggleBtn = document.createElement("button");
  moreOptsToggleBtn.className = `more-opts-toggle-btn hidden ${btnClasses}`;
  moreOptsToggleBtn.innerHTML = `<i class="fa-solid fa-angle-down"></i>`;
  moreOptsToggleBtn.addEventListener("click", () => {
    editorTopHead.classList.toggle("toggle-more-opts");
  });
  fragment.append(
    getTextEditorMoreOpt(),
    getNoteTitleHeading(),
    moreOptsToggleBtn,
    closeBtn
  );
  editorTopHead.append(fragment);
  return editorTopHead;
};
