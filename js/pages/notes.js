import { getContentPage } from "../components/common/getContentPage";
import allTasks, { openTextEditorBtn, updateNavigationList } from "../main";

const getNotesPage = (isFromBackBtn = false) => {
  // when getRecentTaskPage function will be call "recent task" push string will in navigation list
  updateNavigationList(isFromBackBtn, "notes");
  const notesPage = getContentPage("notes", allTasks.notes);
  // change open text editor btn
  openTextEditorBtn.title = "add notes";
  return notesPage;
};

export { getNotesPage };
