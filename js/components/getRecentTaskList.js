export const getRecentTaskList = (task, isFromFolder = false) => {
  const li = document.createElement("li");
  li.className = `flex gap-3 cursor-default flex-col ${
    isFromFolder ? "" : "main-li"
  }`;
  li.innerHTML = `
  <div class="w-full flex gap-3">
    <div class="bg-white p-4 flex items-center rounded-xl">
      ${
        task.status === "completed"
          ? `<i class="fa-solid fa-square-check"></i>`
          : `<i class="fa-regular fa-square"></i>`
      }
    </div>
    ${
      isFromFolder
        ? `<div class="m-3 self-center w-6"><img src="/curved-arrow.png"></div>`
        : ""
    }
    <div class="bg-white flex flex-1 gap-2 p-4 rounded-xl">
      ${task.folder ? `<i class="fa fa-folder text-4xl"></i>` : ""}
     <div class="flex-1 ml-4">
      <div class="flex">
        <div>
          <p class="group">${task.name} ${
    task.folder
      ? ""
      : `<span class="ml-2 text-xs text-[#999]/0 group-hover:text-[#999]/50">from ${task.name}</span>`
  }</p>
          <div class="text-[#719191] text-xs"><i class="fa fa-calendar"></i> ${
            task.time.date
          } ${
    task.time.init && task.time.end
      ? `, ${task.time.init} - ${task.time.end}`
      : ""
  }</div>
        </div>
        <ul class="tags flex items-center gap-4 ml-auto text-xs">
          ${task.tags.map((tag) => `<li>${tag}</li>`).join("")}
        </ul>
       </div>
      ${
        task.folder
          ? `<div class="text-xs flex items-center mt-2 gap-4">
        <div class="flex-1 h-1.5 bg-[#999]/10 rounded-full overflow-hidden"><div style="width: calc((${
          task.completedTask * 100
        }% / ${task.tasks.length}));
        " class="progress bg-[#719191] h-full"></div></div>
        <div>${task.completedTask} / ${task.tasks.length} tasks completed</div>`
          : ""
      }
      </div>
     </div>
     ${
       task.folder
         ? `<div class="self-center ml-4">
       <i class="fa-solid fa-angle-down text-2xl"></i>
     </div>`
         : ""
     }
    </div>
    </div>
    `;
  return li;
};
