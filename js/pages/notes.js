import { getCurrentUser } from "../components/Text-editor/getTextEditor";
import { getContentPage } from "../components/common/getContentPage";
import { openTextEditorBtn, updateNavigationList } from "../main";

const getNotesPage = (isFromBackBtn = false) => {
  // when getRecentTaskPage function will be call "recent task" push string will in navigation list
  updateNavigationList(isFromBackBtn, "notes");
  const notesPage = getContentPage("notes", getCurrentUser().user_notes);
  // change open text editor btn
  openTextEditorBtn.title = "add notes";
  return notesPage;
};

export { getNotesPage };
