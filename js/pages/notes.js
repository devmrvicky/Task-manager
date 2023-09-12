import { getCurrentUser } from "../components/Text-editor/getTextEditor";
import { getContentPage } from "../components/common/getContentPage";
import { getIndividualNotePage } from "../components/notes/getIndividualNotePage";
import { showNotesListItems } from "../components/notes/showNotesListItems";
import { openTextEditorBtn, updateNavigationList } from "../main";

const getNotesPage = (isFromBackBtn = false) => {
  // when getRecentTaskPage function will be call "recent task" push string will in navigation list
  updateNavigationList(isFromBackBtn, "notes");
  const notes = getCurrentUser().user_notes;
  const notesPage = getContentPage("notes", notes);
  // change open text editor btn
  openTextEditorBtn.title = "add notes";

  const notesSidebar = notesPage.querySelector(".content-sidebar-item");
  const notesHead = notesPage.querySelector(".content-head");
  const notesLists = notesPage.querySelector(".main-task-list");
  const noteItems = notesLists.querySelectorAll("li");

  const replaceWithIndividualNote = (noteList, replacerElem) => {
    const noteId = noteList.dataset.fileId;
    const note = notes.find((note) => note.id === noteId);
    const individualNotePage = getIndividualNotePage(note);
    replacerElem.replaceWith(individualNotePage);
  };

  noteItems.forEach((noteList) => {
    noteList.addEventListener("dblclick", () => {
      replaceWithIndividualNote(noteList, notesLists);
      // add class to notes head to hide unwanted things
      notesSidebar.innerHTML = `<h1 class="text-xl text-center py-3">All notes</h1>`;
      notesHead.classList.add("hide-unwanted-things");
      showNotesListItems(notesSidebar);
      const sideNoteItems = notesSidebar.querySelectorAll("li");
      sideNoteItems.forEach((noteItem) => {
        noteItem.classList.add("individual-note-item");
        noteItem.onclick = () => {
          for (let item of sideNoteItems) {
            item.classList.remove("active");
          }
          noteItem.classList.add("active");
          const individualPage = notesPage.querySelector(".individual-page");
          replaceWithIndividualNote(noteItem, individualPage);
        };
      });
    });
  });

  return notesPage;
};

export { getNotesPage };
