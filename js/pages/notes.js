import { getCurrentUser } from "../components/Text-editor/getTextEditor";
import { getContentPage } from "../components/common/getContentPage";
import { getIndividualNotePage } from "../components/notes/getIndividualNotePage";
import { openTextEditorBtn, updateNavigationList } from "../main";

const getNotesPage = (isFromBackBtn = false) => {
  // when getRecentTaskPage function will be call "recent task" push string will in navigation list
  updateNavigationList(isFromBackBtn, "notes");
  const notes = getCurrentUser().user_notes;
  const notesPage = getContentPage("notes", notes);
  // change open text editor btn
  openTextEditorBtn.title = "add notes";

  const notesHead = notesPage.querySelector(".content-head");
  const notesLists = notesPage.querySelector(".main-task-list");
  const noteItems = notesLists.querySelectorAll("li");
  noteItems.forEach((noteList) => {
    noteList.addEventListener("dblclick", () => {
      const noteId = noteList.dataset.fileId;
      const note = notes.find((note) => note.id === noteId);
      const individualNotePage = getIndividualNotePage(note);
      notesLists.replaceWith(individualNotePage);
      // add class to notes head to hide unwanted things
      notesHead.classList.add("hide-unwanted-things");
    });
  });

  return notesPage;
};

export { getNotesPage };
