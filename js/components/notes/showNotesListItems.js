import { getUsersFromLocalStorage, users } from "../../main";
import { getNotesList } from "./getNotesList";
import { getCurrentUser } from "../Text-editor/getTextEditor";
import { getContextMenu } from "../common/getContextMenu";

export const showNotesListItems = (recentTaskList) => {
  getUsersFromLocalStorage();
  const notes = getCurrentUser().user_notes || [];
  console.log(users);
  for (let note of notes) {
    const fragment = document.createDocumentFragment();
    let li = getNotesList(note);

    li.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      const contextMenu = getContextMenu(e);
      li.append(contextMenu);
      const deleteBtn = contextMenu.querySelector("li");
      deleteBtn?.addEventListener("click", (e) => {
        console.log(notes);
        // const remainingNotes = notes.filter(
        //   (n) => n.uniqueId !== note.uniqueId
        // );
        // console.log(remainingNotes);
      });
    });

    fragment.appendChild(li);
    recentTaskList.append(fragment);
  }
};
