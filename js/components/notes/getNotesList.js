export const getNotesList = (note) => {
  const li = document.createElement("li");
  li.className = `flex items-center px-4 py-2 hover:bg-white rounded-lg gap-3 cursor-default relative text-sm whitespace-nowrap`;
  li.setAttribute("data-file-id", note.id);
  li.innerHTML = `
    ${
      note.folder
        ? `<i class="fa-solid fa-folder"></i>`
        : `<i class="fa-solid fa-file"></i>`
    }
    <p>${note.title}</p>
  `;
  return li;
};
