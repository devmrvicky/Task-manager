import { getContentPage } from "../components/common/getContentPage";
import allTasks, { updateNavigationList } from "../main";

const getNotesPage = (isFromBackBtn = false) => {
  // when getRecentTaskPage function will be call "recent task" push string will in navigation list
  updateNavigationList(isFromBackBtn, "notes");
  const notesPage = getContentPage("notes", allTasks.notes);
  return notesPage;
};

export { getNotesPage };
