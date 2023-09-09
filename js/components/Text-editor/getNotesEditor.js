import { getEditorFooter } from "./getEditorFooter";
import { getNotesWritingArea } from "./getNotesWritingArea";
import { getTextEditorMoreOpt } from "./getTextEditorMoreOpt";
import { getTextEditorSideBar } from "./getTextEditorSideBar";
import { getToolBox } from "./getToolBox";

const executeCommand = (command, defaultUi, value) => {
  document.execCommand(command, defaultUi, value);
};

const highlighter = (btns, clickedBtn, isRemoval) => {
  for (let btn of btns) {
    if (btn.classList.contains("active") && !isRemoval) {
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
  editorSideBar.className = `text-editor-side-bar absolute top-0 left-0 bg-white w-full max-w-[250px] h-full shadow translate-x-[-100%] z-40`;
  fragment.appendChild(editorSideBar);

  const toggleBtn = editorSideBar.querySelector(".editor-side-bar-btn");
  toggleBtn.addEventListener("click", () => {
    editorSideBar.classList.toggle("toggle-side-bar");
  });

  const editorTopHead = getTextEditorMoreOpt();
  fragment.appendChild(editorTopHead);
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
      highlighter(alignBtns, btn, true);
    });
  });
  const fontIndentation = toolBox.querySelectorAll(".font-indent button");
  fontIndentation.forEach((btn) => {
    btn.addEventListener("click", () => {
      const command = btn.dataset.command;
      executeCommand(command, false, null);
    });
  });
  const undoRedo = toolBox.querySelectorAll(".undo-redo button");
  undoRedo.forEach((btn) => {
    btn.addEventListener("click", () => {
      const command = btn.dataset.command;
      executeCommand(command, false, null);
    });
  });
  const fontList = toolBox.querySelectorAll(".list button");
  fontList.forEach((btn) => {
    btn.addEventListener("click", () => {
      const command = btn.dataset.command;
      executeCommand(command, false, null);
      highlighter(fontList, btn, true);
    });
  });
  const fontNames = toolBox.querySelector("select.font-names");
  fontNames.addEventListener("change", (e) => {
    const selectedFontFamily = e.currentTarget.value;
    executeCommand("fontName", false, selectedFontFamily);
  });
  const headings = toolBox.querySelector("select.headings");
  headings.addEventListener("change", (e) => {
    let value = e.currentTarget.value;
    let tag;
    if (value === "Paragraph") {
      tag = "P";
    } else {
      tag = value.replace("eading ", "");
    }
    executeCommand("formatBlock", false, tag);
  });

  return notesEditor;
};
