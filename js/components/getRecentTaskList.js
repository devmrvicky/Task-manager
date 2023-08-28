export const getRecentTaskList = (task, isFromFolder = false) => {
  const li = document.createElement("li");
  li.className = `flex gap-3 cursor-default flex-col ${
    isFromFolder ? "" : "main-li"
  }`;
  li.setAttribute("data-file-id", task.id);
  li.innerHTML = `
  <div class="w-full flex ${isFromFolder ? "gap-0 sm:gap-3" : "gap-3"}">
    <div class="bg-white p-4 flex items-center rounded-xl hover:bg-zinc-50 cursor-pointer checkbox">
      ${
        task.status === "completed"
          ? `<i class="fa-solid fa-square-check"></i>`
          : `<i class="fa-regular fa-square"></i>`
      }
    </div>
    ${
      isFromFolder
        ? `<div class="m-3 self-center w-5 sm:w-6"><img src="/task-management/curved-arrow.png"></div>`
        : ""
    }
    <div class="bg-white flex flex-1 gap-2 p-4 rounded-xl task-show-area relative overflow-hidden">
      ${task.folder ? `<i class="fa fa-folder sm:text-4xl text-2xl"></i>` : ``}
     <div class="flex-1 ml-4">
      <div class="flex">
        <div>
          <p class="group sm:text-base text-sm">${task.name}</p>
          <div class="text-[#719191] sm:text-xs text-[10px]"><i class="fa fa-calendar"></i> ${
            task.time.date
          } ${
    task.time.init && task.time.end
      ? `, ${task.time.init} - ${task.time.end}`
      : ""
  }</div>
        </div>
        <ul class="tags flex items-center gap-4 ml-auto text-xs">
          ${task.tags
            .map(
              (tag) =>
                `<li class="tag sm:text-xs text-[10px] border rounded-xl py-1 px-2 bg-white hover:bg-zinc-50 cursor-default">#${tag}</li>`
            )
            .join("")}
        </ul>
       </div>
      ${
        task.folder
          ? `<div class="progress-bar-container sm:text-xs text-[10px] flex items-center mt-2 gap-4">
        <div class="flex-1 h-1 sm:h-1.5 bg-[#999]/10 rounded-full overflow-hidden"><div style="width: calc((${
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
       <i class="fa-solid fa-angle-down sm:text-2xl"></i>
     </div>`
         : ""
     }
    </div>
    </div>
    `;
  return li;
};
