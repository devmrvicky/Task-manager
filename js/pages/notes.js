import { updateNavigationList } from "../main";

export const getNotesPage = (isFromBackBtn) => {
  // update navigation icon
  updateNavigationList(isFromBackBtn, "notes");

  const notesPage = document.createElement("div");
  notesPage.innerHTML = `<h1>Notes page</h1>`;
  return notesPage;
};
