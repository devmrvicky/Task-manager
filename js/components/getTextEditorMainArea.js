let tags = [
  "Task Mgmt",
  "To-Do List",
  "Proj Mgmt",
  "Task Track",
  "Task Prior",
  "Task Auto",
  "Time Mgmt",
  "Productivity",
  "Note-Take",
  "Note Org",
  "Note Sync",
  "Meet Mgmt",
  "Meet Agenda",
  "Meet Min",
  "Virtual Mtgs",
  "Daily Rtn",
  "Work Sched",
  "Work-Life",
  "Time Track",
  "Task Delegate",
  "Task Due",
  "Task Collab",
  "Task Assign",
  "Task Comp",
  "Task Rem",
  "Task Prog",
  "Task Stat",
  "Task Vis",
  "Task Est",
  "Task Dep",
  "Task Cats",
  "Task Filter",
  "Task Labels",
  "Note Temp",
  "Note Tag",
  "Note Search",
  "Note Arch",
  "Note Ver",
  "Meet Sched",
  "Meet Follow",
  "Meet Facil",
  "Meet Prep",
  "Meet Rec",
  "Daily Goals",
  "Daily Reflect",
  "Daily Achieve",
  "Daily Plan",
  "Daily Stand",
  "Daily Review",
  "Daily Tasks",
  "Daily Routines",
  "Task Analysis",
  "Track Tools",
  "Mgmt Apps",
  "Note Apps",
  "Meet Soft",
  "Daily Plan",
  "Vis Tools",
  "Sync Apps",
  "Agenda Apps",
  "Sched Apps",
  "Collab Tools",
  "Virtual Plats",
  "Auto Tools",
  "Time Tech",
  "Org Strat",
  "Best Pract",
  "Work Eff",
  "Work Pri",
  "Workload",
  "Mgmt Methods",
  "Time Alloc",
  "Mgmt Tips",
  "Take Methods",
  "Prod Meet",
  "Meet Etiquette",
  "Optimize Rtn",
  "Life Integrate",
];

export const getTextEditorMainArea = () => {
  const editorMainArea = document.createElement("div");
  editorMainArea.className = "editor-main-area flex-1";
  editorMainArea.innerHTML = `
    <div class="text-editor-ctrl-menus md:px-[20px] flex items-center md:translate-x-0 translate-x-[60px] h-[50px]">Text editor control menus</div>
    <hr>
    <div class="p-4 w-full h-[93%]">
      <h4 class="folder-name-heading"></h4>
      <form class="editor-form flex flex-col h-full">
        <input type="text" placeholder="Enter your task" class="w-full py-2 px-3 outline-none border" required/>
        <div class="date flex flex-wrap gap-3 py-3 text-xs sm:text-md">
          <input type="date" id="date" class="flex-1 py-2 px-3 outline-none border min-w-[100px]"/>
          <div class="flex items-center gap-3 flex-wrap">
            <input type="time" id="init-time" class="w-full flex-1 py-2 px-3 outline-none border" value="09:10"/>
            <input type="time" id="end-time" class="w-full flex-1 py-2 px-3 outline-none border" value="13:00"/>
          </div>
        </div>
        <div class="selected-tags border w-full py-2 px-3 text-xs flex flex-wrap gap-1">
          <input type="text" placeholder="tag name" class="outline-none"/>
        </div>
        <div class="tags overflow-auto my-5 px-3 flex gap-1 flex-wrap">${tags
          .map(
            (tag) =>
              `<span class="tag text-xs border rounded-xl py-1 px-2 bg-white hover:bg-zinc-50 cursor-default" data-tag="${tag}">${tag}</span>`
          )
          .join("")}</div>
        <input type="submit" value="Add task" id="submit" class="w-full py-2 px-3 outline-none border mt-auto" />
      </form>
    </div>
  `;
  return editorMainArea;
};
