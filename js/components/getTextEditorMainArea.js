export const getTextEditorMainArea = () => {
  const editorMainArea = document.createElement("div");
  editorMainArea.className = "editor-main-area flex-1";
  editorMainArea.innerHTML = `
    <div class="text-editor-ctrl-menus px-4 py-2">Text editor control menus</div>
    <hr>
    <div class="p-4 w-full">
      <h4 class="folder-name-heading"></h4>
      <form class="editor-form">
        <input type="text" placeholder="Enter your task" class="w-full py-2 px-3 outline-none border"/>
      </form>
    </div>
  `;
  return editorMainArea;
};
