import { users } from "../../main";
import { getInsertedItemOnSameIndex } from "../getInsertedItemOnSameIndex";
import { getEditorFooter } from "./getEditorFooter";
import { getNotesWritingArea } from "./getNotesWritingArea";
import { getCurrentUser, reRenderPages } from "./getTextEditor";
import {
  getNoteTitleHeading,
  getNotesEditorTopHead,
} from "./getNotesEditorTopHead";
import { getTextEditorSideBar } from "./getTextEditorSideBar";
import { getToolBox } from "./getToolBox";
import {
  getTraceIcon,
  removeAllTraceChangesIcon,
} from "../edit-user/openUserEditPage";
import getTimeObj from "../getTimeObj";

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

const getNotesId = () => {
  const currentUser = getCurrentUser();
  let existingNotes = [];
  if (currentUser.user_notes) {
    existingNotes = currentUser.user_notes;
  }
  return existingNotes.length;
};

const getTitle = () => {
  const makeTitle = `untitled_note_${getNotesId() + 1}`;
  return makeTitle;
};

export const getNotesEditor = () => {
  const notesEditor = document.createElement("div");
  notesEditor.className = `text-editor notes-text-editor bg-white border w-full flex flex-col`;
  notesEditor.id = "notes-editor";
  const fragment = document.createDocumentFragment();

  const editorSideBar = getTextEditorSideBar("notes-editor");
  editorSideBar.className = `text-editor-side-bar absolute top-0 left-0 bg-white w-full max-w-[250px] h-full shadow translate-x-[-100%] z-40`;
  fragment.appendChild(editorSideBar);

  const toggleBtn = editorSideBar.querySelector(".editor-side-bar-btn");
  toggleBtn.addEventListener("click", () => {
    editorSideBar.classList.toggle("toggle-side-bar");
  });

  const editorTopHead = getNotesEditorTopHead();
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

  const titleHeadingElem = editorTopHead.querySelector(".title-heading");
  let isSaved = false;
  // trace changes check if saved or unsaved
  const traceIsSaved = (isSaved, titleElem) => {
    if (isSaved) {
      const traceIcon = getTraceIcon("You have changed in note");
      if (titleElem.children.length) return;
      titleElem.insertAdjacentElement("afterbegin", traceIcon);
    } else {
      removeAllTraceChangesIcon(titleElem);
    }
  };

  const notesElem = noteWritingArea.querySelector(".writing-area");
  let notesListItems = editorSideBar.querySelectorAll(".task-lists li");
  notesListItems.forEach((list) => {
    list.className =
      "text-sm hover:bg-zinc-100 flex items-center gap-3 p-2 pl-6";
    list.addEventListener("click", (e) => {
      editorSideBar.classList.remove("toggle-side-bar");
      const id = e.currentTarget.dataset.fileId;
      const notes = getCurrentUser().user_notes;
      const note = notes.find((n) => n.id === id);
      notesElem.innerHTML = note.note_body;
      notesElem.setAttribute("data-note-title", note.title);
      // replace title on head
      const titleElem = getNoteTitleHeading(note.title);
      editorTopHead.querySelector(".title-heading").replaceWith(titleElem);
      // remove trace icon if exist
      removeAllTraceChangesIcon(titleElem);

      // trace change in writing area
      notesElem.addEventListener("input", () => {
        isSaved = notesElem.innerHTML !== note.note_body;
        traceIsSaved(isSaved, titleElem);
      });
      // trace changed in title heading
      titleElem.addEventListener("input", () => {
        isSaved = titleElem.textContent !== note.title;
        traceIsSaved(isSaved, titleElem);
      });
    });
  });

  const updateNotes = (note) => {
    const currentUser = getCurrentUser();
    let updatedNotesList = currentUser.user_notes || [];
    updatedNotesList = [note, ...updatedNotesList];
    currentUser.user_notes = updatedNotesList;
    let filteredUsers = users.filter((user) => user.id !== currentUser.id);
    const updatedUsers = getInsertedItemOnSameIndex(currentUser, filteredUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    reRenderPages(notesEditor);
  };

  const saveNotes = () => {
    // removeAllTraceChangesIcon(notesEditor);
    const titleElem = editorTopHead.querySelector(".title-heading");
    const currentUser = getCurrentUser();
    const exitingTitle = notesElem.dataset.noteTitle;
    if (exitingTitle) {
      let note = currentUser.user_notes.find(
        (note) => note.title === exitingTitle
      );
      note.note_body = notesElem.innerHTML;
      note.title = titleElem.textContent;
      let filteredNotes = currentUser.user_notes.filter(
        (n) => n.id !== note.id
      );
      currentUser.user_notes = [note, ...filteredNotes];
      let filteredUsers = users.filter((user) => user.id !== currentUser.id);
      const updatedUsers = getInsertedItemOnSameIndex(
        currentUser,
        filteredUsers
      );
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      notesElem.setAttribute("data-note-title", note.title);
      // trace change in writing area
      notesElem.addEventListener("input", () => {
        isSaved = notesElem.innerHTML !== note.note_body;
        traceIsSaved(isSaved, titleElem);
      });
      // trace changed in title heading
      titleElem.addEventListener("input", () => {
        isSaved = titleElem.textContent !== note.title;
        traceIsSaved(isSaved, titleElem);
      });
      isSaved = true;
      removeAllTraceChangesIcon(titleElem);
      // reRenderPages(notesEditor);
      return;
    }
    const title = titleElem.textContent || getTitle();
    const notesId = "note_" + (getNotesId() + 1);
    const timeObj = getTimeObj();
    const history = {
      date: `${timeObj.date}-${timeObj.month}-${timeObj.year}`,
      time: `${timeObj.hour}:${timeObj.minute}`,
    };
    const tags = [];
    const newNotes = new GetNewNote(
      notesId,
      title,
      notesElem.innerHTML,
      false,
      history,
      tags
    );
    notesElem.setAttribute("data-note-title", title);
    updateNotes(newNotes);
    // trace change in writing area
    notesElem.addEventListener("input", () => {
      console.log(newNotes);
      // isSaved = notesElem.innerHTML !== note.note_body;
      // traceIsSaved(isSaved, titleElem);
    });
    // trace changed in title heading
    titleElem.addEventListener("input", () => {
      isSaved = titleElem.textContent !== note.title;
      traceIsSaved(isSaved, titleElem);
    });
    isSaved = true;
    removeAllTraceChangesIcon(titleElem);
  };

  const saveNoteBtns = notesEditor.querySelectorAll(".save-btn");
  saveNoteBtns.forEach((saveNoteBtn) => {
    saveNoteBtn.addEventListener("click", () => {
      saveNotes();
    });
  });

  return notesEditor;
};

class GetNewNote {
  constructor(noteId, title, noteBody, isFolder, history, tags) {
    this.uniqueId = Symbol();
    this.id = noteId;
    this.title = title;
    this.note_body = noteBody;
    this.folder = isFolder;
    this.history = history;
    this.tags = tags;
  }
}

export { getTitle };
