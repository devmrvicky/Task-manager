export const getEditorFooter = () => {
  const footer = document.createElement("footer");
  footer.className = `editor-footer w-full px-3 py-1 border`;
  const footerPrimary = document.createElement("div");
  footerPrimary.className = `footer__primary flex flex gap-4 items-center`;
  const classes = `hover:bg-zinc-100 py-[2px] px-1 text-xs`;
  footerPrimary.innerHTML = `
    <div class="${classes}">
      div > p > span
    </div>
    <p class="${classes}">Total word: 30</p>
    <p class="${classes}">selected word: 12</p>
    <p class="${classes} ml-auto" title="page size">A4: 700 x 990</p>
    <button class="rounded-full ${classes} w-[20px] h-[20px] flex items-center justify-center">
      <i class="fa-solid fa-angle-down"></i>
    </button>
  `;
  footer.append(footerPrimary);
  return footer;
};
