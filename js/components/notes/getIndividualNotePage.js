export const getIndividualNotePage = (note) => {
  const individualPageContainer = document.createElement("div");
  individualPageContainer.className = `individual-page w-full h-full absolute top-0 left-0 z-[-1]`;
  const fragment = document.createDocumentFragment();
  const noteTitle = document.createElement("div");
  noteTitle.className = `individual-note-title w-full p-5 text-center text-xl border-b`;
  noteTitle.appendChild(document.createTextNode(note.title));
  const noteContent = document.createElement("div");
  noteContent.className = `note-content p-5`;
  noteContent.insertAdjacentHTML("afterbegin", note.note_body);
  fragment.append(noteTitle, noteContent);
  individualPageContainer.append(fragment);
  return individualPageContainer;
};
