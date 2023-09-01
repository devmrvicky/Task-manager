export const getRecentTaskList = (
  task,
  isFromFolder = false,
  layout = "horizontal"
) => {
  let isLayoutCell = layout === "cell";
  const li = document.createElement("li");
  li.className = `flex gap-3 cursor-default flex-col relative ${
    isFromFolder ? "" : "main-li"
  }`;
  li.setAttribute("data-file-id", task.id);
  li.innerHTML = `
  <div class="w-full flex h-full ${
    isFromFolder ? "gap-0 sm:gap-3" : "gap-3"
  } group">
    <div class="bg-white items-center rounded-xl hover:bg-zinc-50 cursor-pointer checkbox ${
      isLayoutCell
        ? `absolute ${
            task.status === "completed" ? `flex` : `hidden`
          } group-hover:flex z-20 p-2 right-[-10px] top-[-10px]`
        : `p-4 flex `
    }">
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
      ${
        task.folder
          ? `<i class="fa fa-folder ${
              isLayoutCell ? `sm:text-[4rem] ` : `sm:text-4xl `
            }text-2xl"></i>`
          : ``
      }
     <div class="flex-1 ml-4">
      <div class="${isLayoutCell ? `block` : `flex`}">
        <div>
          <p class="group ${
            isLayoutCell ? `sm:text-xl pb-2` : `sm:text-base`
          } text-sm">${task.name}</p>
          <div class="text-[#719191] sm:text-xs text-[10px]"><i class="fa fa-calendar"></i> ${
            task.time.date
          } ${
    task.time.init && task.time.end
      ? `, ${task.time.init} - ${task.time.end}`
      : ""
  }</div>
        </div>
        <ul class="tags flex items-center ml-auto text-xs ${
          isLayoutCell
            ? `flex-wrap  gap-[1px] absolute bottom-0 left-0 overflow-auto p-2`
            : `gap-4`
        }">
          ${task.tags
            .map(
              (tag) =>
                `<li class="tag sm:text-xs text-[10px] border rounded-xl py-1 px-2 bg-white hover:bg-zinc-50 cursor-default ${
                  isLayoutCell ? `` : ``
                }">#${tag}</li>`
            )
            .join("")}
        </ul>
       </div>
      ${
        task.folder
          ? `<div class="progress-bar-container sm:text-xs text-[10px] flex items-center mt-2 gap-4 ${
              isLayoutCell
                ? `absolute left-[50%] translate-x-[-50%] w-full max-w-[300px] px-2`
                : ``
            }">
        <div class="flex-1 h-1 sm:h-1.5 bg-[#999]/10 rounded-full overflow-hidden"><div style="width: calc((${
          task.completedTask * 100
        }% / ${task.tasks.length}));
        " class="progress bg-[#719191] h-full"></div></div>
        <div>${task.completedTask} / ${task.tasks.length} ${
              isLayoutCell ? `` : `tasks completed`
            }</div>`
          : ""
      }
      </div>
     </div>
     ${
       task.folder && !isLayoutCell
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
