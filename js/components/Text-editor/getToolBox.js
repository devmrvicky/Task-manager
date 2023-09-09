const getToolBtn = (btnName, command) => {
  const btn = document.createElement("button");
  btn.className = `tool-btn p-1 rounded`;
  btn.title = btnName;
  btn.setAttribute("data-command", command);
  const iconWrapper = document.createElement("span");
  iconWrapper.className = `icon-wrapper`;
  let iconSvg;
  switch (btnName) {
    case "undo":
      iconSvg = `
        <svg width="24" height="24" focusable="false"><path d="M6.4 8H12c3.7 0 6.2 2 6.8 5.1.6 2.7-.4 5.6-2.3 6.8a1 1 0 0 1-1-1.8c1.1-.6 1.8-2.7 1.4-4.6-.5-2.1-2.1-3.5-4.9-3.5H6.4l3.3 3.3a1 1 0 1 1-1.4 1.4l-5-5a1 1 0 0 1 0-1.4l5-5a1 1 0 0 1 1.4 1.4L6.4 8Z" fill-rule="nonzero"></path></svg>
      `;
      break;
    case "redo":
      iconSvg = `
        <svg width="24" height="24" focusable="false"><path d="M17.6 10H12c-2.8 0-4.4 1.4-4.9 3.5-.4 2 .3 4 1.4 4.6a1 1 0 1 1-1 1.8c-2-1.2-2.9-4.1-2.3-6.8.6-3 3-5.1 6.8-5.1h5.6l-3.3-3.3a1 1 0 1 1 1.4-1.4l5 5a1 1 0 0 1 0 1.4l-5 5a1 1 0 0 1-1.4-1.4l3.3-3.3Z" fill-rule="nonzero"></path></svg>
      `;
      break;
    case "bold":
      iconSvg = `
        <svg width="24" height="24" focusable="false"><path d="M7.8 19c-.3 0-.5 0-.6-.2l-.2-.5V5.7c0-.2 0-.4.2-.5l.6-.2h5c1.5 0 2.7.3 3.5 1 .7.6 1.1 1.4 1.1 2.5a3 3 0 0 1-.6 1.9c-.4.6-1 1-1.6 1.2.4.1.9.3 1.3.6s.8.7 1 1.2c.4.4.5 1 .5 1.6 0 1.3-.4 2.3-1.3 3-.8.7-2.1 1-3.8 1H7.8Zm5-8.3c.6 0 1.2-.1 1.6-.5.4-.3.6-.7.6-1.3 0-1.1-.8-1.7-2.3-1.7H9.3v3.5h3.4Zm.5 6c.7 0 1.3-.1 1.7-.4.4-.4.6-.9.6-1.5s-.2-1-.7-1.4c-.4-.3-1-.4-2-.4H9.4v3.8h4Z" fill-rule="evenodd"></path></svg>
      `;
      break;
    case "italic":
      iconSvg = `
        <svg width="24" height="24" focusable="false"><path d="m16.7 4.7-.1.9h-.3c-.6 0-1 0-1.4.3-.3.3-.4.6-.5 1.1l-2.1 9.8v.6c0 .5.4.8 1.4.8h.2l-.2.8H8l.2-.8h.2c1.1 0 1.8-.5 2-1.5l2-9.8.1-.5c0-.6-.4-.8-1.4-.8h-.3l.2-.9h5.8Z" fill-rule="evenodd"></path></svg>
      `;
      break;
    case "underline":
      iconSvg = `
        <svg width="24" height="24" focusable="false"><path d="M16 5c.6 0 1 .4 1 1v5.5a4 4 0 0 1-.4 1.8l-1 1.4a5.3 5.3 0 0 1-5.5 1 5 5 0 0 1-1.6-1c-.5-.4-.8-.9-1.1-1.4a4 4 0 0 1-.4-1.8V6c0-.6.4-1 1-1s1 .4 1 1v5.5c0 .3 0 .6.2 1l.6.7a3.3 3.3 0 0 0 2.2.8 3.4 3.4 0 0 0 2.2-.8c.3-.2.4-.5.6-.8l.2-.9V6c0-.6.4-1 1-1ZM8 17h8c.6 0 1 .4 1 1s-.4 1-1 1H8a1 1 0 0 1 0-2Z" fill-rule="evenodd"></path></svg>
      `;
      break;
    case "strikethrough":
      iconSvg = `
        <svg width="24" height="24" focusable="false"><g fill-rule="evenodd"><path d="M15.6 8.5c-.5-.7-1-1.1-1.3-1.3-.6-.4-1.3-.6-2-.6-2.7 0-2.8 1.7-2.8 2.1 0 1.6 1.8 2 3.2 2.3 4.4.9 4.6 2.8 4.6 3.9 0 1.4-.7 4.1-5 4.1A6.2 6.2 0 0 1 7 16.4l1.5-1.1c.4.6 1.6 2 3.7 2 1.6 0 2.5-.4 3-1.2.4-.8.3-2-.8-2.6-.7-.4-1.6-.7-2.9-1-1-.2-3.9-.8-3.9-3.6C7.6 6 10.3 5 12.4 5c2.9 0 4.2 1.6 4.7 2.4l-1.5 1.1Z"></path><path d="M5 11h14a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" fill-rule="nonzero"></path></g></svg>
      `;
      break;
    case "align left":
      iconSvg = `
        <svg width="24" height="24" focusable="false"><path d="M5 5h14c.6 0 1 .4 1 1s-.4 1-1 1H5a1 1 0 1 1 0-2Zm0 4h8c.6 0 1 .4 1 1s-.4 1-1 1H5a1 1 0 1 1 0-2Zm0 8h8c.6 0 1 .4 1 1s-.4 1-1 1H5a1 1 0 0 1 0-2Zm0-4h14c.6 0 1 .4 1 1s-.4 1-1 1H5a1 1 0 0 1 0-2Z" fill-rule="evenodd"></path></svg>
      `;
      break;
    case "align center":
      iconSvg = `
        <svg width="24" height="24" focusable="false"><path d="M5 5h14c.6 0 1 .4 1 1s-.4 1-1 1H5a1 1 0 1 1 0-2Zm3 4h8c.6 0 1 .4 1 1s-.4 1-1 1H8a1 1 0 1 1 0-2Zm0 8h8c.6 0 1 .4 1 1s-.4 1-1 1H8a1 1 0 0 1 0-2Zm-3-4h14c.6 0 1 .4 1 1s-.4 1-1 1H5a1 1 0 0 1 0-2Z" fill-rule="evenodd"></path></svg>
      `;
      break;
    case "align right":
      iconSvg = `
        <svg width="24" height="24" focusable="false"><path d="M5 5h14c.6 0 1 .4 1 1s-.4 1-1 1H5a1 1 0 1 1 0-2Zm6 4h8c.6 0 1 .4 1 1s-.4 1-1 1h-8a1 1 0 0 1 0-2Zm0 8h8c.6 0 1 .4 1 1s-.4 1-1 1h-8a1 1 0 0 1 0-2Zm-6-4h14c.6 0 1 .4 1 1s-.4 1-1 1H5a1 1 0 0 1 0-2Z" fill-rule="evenodd"></path></svg>
      `;
      break;
    case "justify":
      iconSvg = `
        <svg width="24" height="24" focusable="false"><path d="M5 5h14c.6 0 1 .4 1 1s-.4 1-1 1H5a1 1 0 1 1 0-2Zm0 4h14c.6 0 1 .4 1 1s-.4 1-1 1H5a1 1 0 1 1 0-2Zm0 4h14c.6 0 1 .4 1 1s-.4 1-1 1H5a1 1 0 0 1 0-2Zm0 4h14c.6 0 1 .4 1 1s-.4 1-1 1H5a1 1 0 0 1 0-2Z" fill-rule="evenodd"></path></svg>
      `;
      break;
    case "decrease indent":
      iconSvg = `
        <svg width="24" height="24" focusable="false"><path d="M7 5h12c.6 0 1 .4 1 1s-.4 1-1 1H7a1 1 0 1 1 0-2Zm5 4h7c.6 0 1 .4 1 1s-.4 1-1 1h-7a1 1 0 0 1 0-2Zm0 4h7c.6 0 1 .4 1 1s-.4 1-1 1h-7a1 1 0 0 1 0-2Zm-5 4h12a1 1 0 0 1 0 2H7a1 1 0 0 1 0-2Zm1.6-3.8a1 1 0 0 1-1.2 1.6l-3-2a1 1 0 0 1 0-1.6l3-2a1 1 0 0 1 1.2 1.6L6.8 12l1.8 1.2Z" fill-rule="evenodd"></path></svg>
      `;
      break;
    case "increase indent":
      iconSvg = `
        <svg width="24" height="24" focusable="false"><path d="M7 5h12c.6 0 1 .4 1 1s-.4 1-1 1H7a1 1 0 1 1 0-2Zm5 4h7c.6 0 1 .4 1 1s-.4 1-1 1h-7a1 1 0 0 1 0-2Zm0 4h7c.6 0 1 .4 1 1s-.4 1-1 1h-7a1 1 0 0 1 0-2Zm-5 4h12a1 1 0 0 1 0 2H7a1 1 0 0 1 0-2Zm-2.6-3.8L6.2 12l-1.8-1.2a1 1 0 0 1 1.2-1.6l3 2a1 1 0 0 1 0 1.6l-3 2a1 1 0 1 1-1.2-1.6Z" fill-rule="evenodd"></path></svg>
      `;
      break;
    case "numbered list":
      iconSvg = `
        <svg width="24" height="24" focusable="false"><path d="M10 17h8c.6 0 1 .4 1 1s-.4 1-1 1h-8a1 1 0 0 1 0-2Zm0-6h8c.6 0 1 .4 1 1s-.4 1-1 1h-8a1 1 0 0 1 0-2Zm0-6h8c.6 0 1 .4 1 1s-.4 1-1 1h-8a1 1 0 1 1 0-2ZM6 4v3.5c0 .3-.2.5-.5.5a.5.5 0 0 1-.5-.5V5h-.5a.5.5 0 0 1 0-1H6Zm-1 8.8.2.2h1.3c.3 0 .5.2.5.5s-.2.5-.5.5H4.9a1 1 0 0 1-.9-1V13c0-.4.3-.8.6-1l1.2-.4.2-.3a.2.2 0 0 0-.2-.2H4.5a.5.5 0 0 1-.5-.5c0-.3.2-.5.5-.5h1.6c.5 0 .9.4.9 1v.1c0 .4-.3.8-.6 1l-1.2.4-.2.3ZM7 17v2c0 .6-.4 1-1 1H4.5a.5.5 0 0 1 0-1h1.2c.2 0 .3-.1.3-.3 0-.2-.1-.3-.3-.3H4.4a.4.4 0 1 1 0-.8h1.3c.2 0 .3-.1.3-.3 0-.2-.1-.3-.3-.3H4.5a.5.5 0 1 1 0-1H6c.6 0 1 .4 1 1Z" fill-rule="evenodd"></path></svg>
      `;
      break;
    case "bullet list":
      iconSvg = `
        <svg width="24" height="24" focusable="false"><path d="M11 5h8c.6 0 1 .4 1 1s-.4 1-1 1h-8a1 1 0 0 1 0-2Zm0 6h8c.6 0 1 .4 1 1s-.4 1-1 1h-8a1 1 0 0 1 0-2Zm0 6h8c.6 0 1 .4 1 1s-.4 1-1 1h-8a1 1 0 0 1 0-2ZM4.5 6c0-.4.1-.8.4-1 .3-.4.7-.5 1.1-.5.4 0 .8.1 1 .4.4.3.5.7.5 1.1 0 .4-.1.8-.4 1-.3.4-.7.5-1.1.5-.4 0-.8-.1-1-.4-.4-.3-.5-.7-.5-1.1Zm0 6c0-.4.1-.8.4-1 .3-.4.7-.5 1.1-.5.4 0 .8.1 1 .4.4.3.5.7.5 1.1 0 .4-.1.8-.4 1-.3.4-.7.5-1.1.5-.4 0-.8-.1-1-.4-.4-.3-.5-.7-.5-1.1Zm0 6c0-.4.1-.8.4-1 .3-.4.7-.5 1.1-.5.4 0 .8.1 1 .4.4.3.5.7.5 1.1 0 .4-.1.8-.4 1-.3.4-.7.5-1.1.5-.4 0-.8-.1-1-.4-.4-.3-.5-.7-.5-1.1Z" fill-rule="evenodd"></path></svg>
      `;
      break;
    case "checked list":
      iconSvg = `
        <svg width="24" height="24" focusable="false"><path d="M11 17h8c.6 0 1 .4 1 1s-.4 1-1 1h-8a1 1 0 0 1 0-2Zm0-6h8c.6 0 1 .4 1 1s-.4 1-1 1h-8a1 1 0 0 1 0-2Zm0-6h8a1 1 0 0 1 0 2h-8a1 1 0 0 1 0-2ZM7.2 16c.2-.4.6-.5.9-.3.3.2.4.6.2 1L6 20c-.2.3-.7.4-1 0l-1.3-1.3a.7.7 0 0 1 0-1c.3-.2.7-.2 1 0l.7.9 1.7-2.8Zm0-6c.2-.4.6-.5.9-.3.3.2.4.6.2 1L6 14c-.2.3-.7.4-1 0l-1.3-1.3a.7.7 0 0 1 0-1c.3-.2.7-.2 1 0l.7.9 1.7-2.8Zm0-6c.2-.4.6-.5.9-.3.3.2.4.6.2 1L6 8c-.2.3-.7.4-1 0L3.8 6.9a.7.7 0 0 1 0-1c.3-.2.7-.2 1 0l.7.9 1.7-2.8Z" fill-rule="evenodd"></path></svg>
      `;
      break;
    case "more tools...":
      iconSvg = `
        <svg width="24" height="24" focusable="false"><path d="M6 10a2 2 0 0 0-2 2c0 1.1.9 2 2 2a2 2 0 0 0 2-2 2 2 0 0 0-2-2Zm12 0a2 2 0 0 0-2 2c0 1.1.9 2 2 2a2 2 0 0 0 2-2 2 2 0 0 0-2-2Zm-6 0a2 2 0 0 0-2 2c0 1.1.9 2 2 2a2 2 0 0 0 2-2 2 2 0 0 0-2-2Z" fill-rule="nonzero"></path></svg>
      `;
      break;
    case "decrease font size":
      iconSvg = `
        <svg width="24" height="24" focusable="false"><path d="M19 11a1 1 0 0 1 .1 2H5a1 1 0 0 1-.1-2H19Z"></path></svg>
      `;
      break;
    case "increase font size":
      iconSvg = `
        <svg width="24" height="24" focusable="false"><path d="M12 4c.5 0 1 .4 1 .9V11h6a1 1 0 0 1 .1 2H13v6a1 1 0 0 1-2 .1V13H5a1 1 0 0 1-.1-2H11V5c0-.6.4-1 1-1Z"></path></svg>
      `;
      break;
  }
  iconWrapper.insertAdjacentHTML("afterbegin", iconSvg);
  btn.insertAdjacentElement("afterbegin", iconWrapper);
  return btn;
};

// create option
const createOptions = (type, optionValues) => {
  const select = document.createElement("select");
  select.className = `${type} bg-[#F7F7FA] p-1 text-sm`;
  for (let opt of optionValues) {
    let option = document.createElement("option");
    option.appendChild(document.createTextNode(opt));
    select.insertAdjacentElement("beforeend", option);
  }
  return select;
};

const getFontList = () => {
  const fonts = [
    "poppins",
    "Arial, sans-serif",
    "Times New Roman, serif",
    "Helvetica, sans-serif",
    "Courier New, monospace",
    "Georgia, serif",
    "Verdana, sans-serif",
    "Comic Sans MS, cursive",
    "Palatino Linotype, serif",
    "Trebuchet MS, sans-serif",
    "Brush Script MT, cursive",
    "Roboto, sans-serif", // Modern and clean
    "Open Sans, sans-serif", // Easy to read
    "Lato, sans-serif", // Elegant and versatile
    "Montserrat, sans-serif", // Stylish and professional
    "Raleway, sans-serif", // Sleek and minimal
    "Ubuntu, sans-serif", // Humanist and friendly
    "Cabin, sans-serif", // Geometric and legible
    "Nunito, sans-serif", // Rounded and warm
    "Oswald, sans-serif", // Bold and condensed
    "Crimson Text, serif", // Traditional and elegant
  ];
  return createOptions("font-names", fonts);
};

const getHeadings = () => {
  const headingLists = [
    "Paragraph",
    "Heading 1",
    "Heading 2",
    "Heading 3",
    "Heading 4",
    "Heading 5",
    "Heading 6",
  ];
  return createOptions("headings", headingLists);
};

const getFontSizeLists = () => {
  const fontWrapper = document.createElement("div");
  fontWrapper.className = `font-wrapper flex bg-[#F7F7FA]`;
  const decreaseFontSizeBtn = getToolBtn("decrease font size");
  const increaseFontSizeBtn = getToolBtn("increase font size");
  const fontInput = document.createElement("input");
  fontInput.className =
    "font-input max-w-[50px] text-center text-sm bg-transparent";
  fontInput.value = `16px`;
  fontWrapper.append(decreaseFontSizeBtn, fontInput, increaseFontSizeBtn);
  return fontWrapper;
};

export const getToolBox = () => {
  const toolBoxWrapper = document.createElement("div");
  toolBoxWrapper.className = `tool-box__wrapper w-full px-3 pl-16 py-2 border`;
  const toolBoxPrimary = document.createElement("div");
  toolBoxPrimary.className = `tool-box__primary flex flex gap-4 items-center overflow-auto`;

  const fragment = document.createDocumentFragment();

  // tools btn group
  let btnsGroupClass = "tool-btn__group flex items-center gap-2";
  const redoUndoBtns = document.createElement("div");
  redoUndoBtns.className = btnsGroupClass + " undo-redo";
  const undoBtn = getToolBtn("undo", "undo");
  const redoBtn = getToolBtn("redo", "redo");
  redoUndoBtns.append(undoBtn, redoBtn);
  fragment.appendChild(redoUndoBtns);

  const fontStyleBtns = document.createElement("div");
  fontStyleBtns.className = btnsGroupClass + " font-styles";
  const boldBtn = getToolBtn("bold", "bold");
  const italicBtn = getToolBtn("italic", "italic");
  const underlineBtn = getToolBtn("underline", "underline");
  const strikethroughBtn = getToolBtn("strikethrough", "strikethrough");
  fontStyleBtns.append(boldBtn, italicBtn, underlineBtn, strikethroughBtn);
  fragment.appendChild(fontStyleBtns);

  const fontsOptions = getFontList();
  const fontSizeList = getFontSizeLists();
  const headingLists = getHeadings();
  fragment.append(fontsOptions, fontSizeList, headingLists);

  const fontAlignment = document.createElement("div");
  fontAlignment.className = btnsGroupClass + " font-alignment";
  const alignLeftBtn = getToolBtn("align left", "justifyLeft");
  const alignRightBtn = getToolBtn("align right", "justifyRight");
  const alignCenterBtn = getToolBtn("align center", "justifyCenter");
  const justifyBtn = getToolBtn("justify", "justifyFull");
  fontAlignment.append(alignLeftBtn, alignCenterBtn, alignRightBtn, justifyBtn);
  fragment.appendChild(fontAlignment);

  const fontIndent = document.createElement("div");
  fontIndent.className = btnsGroupClass + " font-indent";
  const decreaseIndentBtn = getToolBtn("decrease indent", "outdent");
  const increaseIndentBtn = getToolBtn("increase indent", "indent");
  fontIndent.append(decreaseIndentBtn, increaseIndentBtn);
  fragment.appendChild(fontIndent);

  const fontList = document.createElement("div");
  fontList.className = btnsGroupClass + " list";
  const numberedListBtn = getToolBtn("numbered list", "insertOrderedList");
  const bulletListBtn = getToolBtn("bullet list", "insertUnorderedList");
  const checkedListBtn = getToolBtn("checked list");
  fontList.append(numberedListBtn, bulletListBtn, checkedListBtn);
  fragment.appendChild(fontList);

  const moreTools = getToolBtn("more tools...");
  toolBoxPrimary.append(fragment, moreTools);
  toolBoxWrapper.append(toolBoxPrimary);
  return toolBoxWrapper;
};
