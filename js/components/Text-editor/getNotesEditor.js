import { getEditorFooter } from "./getEditorFooter";
import { getNotesWritingArea } from "./getNotesWritingArea";
import { getTextEditorSideBar } from "./getTextEditorSideBar";
import { getToolBox } from "./getToolBox";

const executeCommand = (command, defaultUi, value) => {
  document.execCommand(command, defaultUi, value);
};

const highlighter = (btns, clickedBtn) => {
  for (let btn of btns) {
    if (btn.classList.contains("active")) {
      continue;
    }
    btn.classList.remove("active");
  }
  clickedBtn.classList.toggle("active");
};

export const getNotesEditor = () => {
  const notesEditor = document.createElement("div");
  notesEditor.className = `text-editor bg-white border w-full flex flex-col`;
  const fragment = document.createDocumentFragment();

  const editorSideBar = getTextEditorSideBar("notes-editor");
  editorSideBar.className = `text-editor-side-bar absolute top-0 left-0 bg-white w-full max-w-[250px] h-full shadow translate-x-[-100%]`;
  fragment.appendChild(editorSideBar);

  const toggleBtn = editorSideBar.querySelector(".editor-side-bar-btn");
  toggleBtn.addEventListener("click", () => {
    editorSideBar.classList.toggle("toggle-side-bar");
    setTimeout(() => {
      editorSideBarContainer.style.display = "none";
    }, 1000);
  });

  const toolBox = getToolBox();
  fragment.appendChild(toolBox);
  const noteWritingArea = getNotesWritingArea();
  fragment.appendChild(noteWritingArea);
  const footer = getEditorFooter();
  fragment.appendChild(footer);
  notesEditor.appendChild(fragment);

  // get tool buttons
  const fontStyleBtns = toolBox.querySelectorAll(".font-styles button");
  fontStyleBtns.forEach((btn) => {
    noteWritingArea.querySelector(".writing-area").focus();
    btn.addEventListener("click", () => {
      const command = btn.dataset.command;
      executeCommand(command, false, null);
      highlighter(fontStyleBtns, btn);
    });
  });
  const alignBtns = toolBox.querySelectorAll(".font-alignment button");
  alignBtns.forEach((btn) => {
    noteWritingArea.querySelector(".writing-area").focus();
    btn.addEventListener("click", () => {
      const command = btn.dataset.command;
      executeCommand(command, false, null);
      highlighter(fontStyleBtns, btn);
    });
  });

  return notesEditor;
};
