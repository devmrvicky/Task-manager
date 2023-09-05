import {
  allTaskList,
  noOfCompletedTask,
  allFolders,
  allTags,
} from "../main.js";

export const getRecentTaskSideBar = () => {
  const recentTaskSideBar = document.createElement("ul");
  recentTaskSideBar.className =
    "recent-task-sidebar-item p-3 bg-[#EAF1F1] w-3/12 rounded-xl text-[#719191] flex flex-col gap-3 border";
  let classes = `hover:bg-white cursor-default flex items-center gap-2 py-2 px-4 rounded-full sm:text-base text-xs`;
  recentTaskSideBar.innerHTML = `
  <li class="task-item active ${classes}" data-role="show-task" data-name="recent"><i class="fa-solid fa-clock"></i><span>Recent</span><span class="ml-auto">${allTaskList.length}</span></li>
  <li class="task-item ${classes}" data-role="show-task" data-name="completed"><i class="fa-solid fa-circle-check"></i><span>Completed</span><span class="ml-auto">${noOfCompletedTask}</span></li>
  <li class="task-item ${classes}" data-role="show-task" data-name="archived"><i class="fa-solid fa-box-archive"></i><span>Archived</span><span class="ml-auto"></span></li>
  <li class="task-item ${classes}" data-role="show-task" data-name="deleted"><i class="fa-solid fa-trash"></i><span>Deleted</span><span class="ml-auto"></span></li>

  <li class="task-item folder mt-10 overflow-hidden flex items-center flex-col gap-3  sm:text-base text-xs" data-name="folder">
    <div class="hover:bg-white cursor-default flex items-center gap-2 py-2 px-4 w-full rounded-full ">
      <i class="fa-solid fa-angle-down"></i><span>Folders</span><span class="ml-auto">${allFolders.length}</span>
    </div>
  </li>
  <li class="task-item tags cursor-default flex flex-col gap-3 items-center overflow-hidden  sm:text-base text-xs" data-name="tags">
    <div class="hover:bg-white cursor-default flex items-center gap-2 py-2 px-4 w-full rounded-full">
    <i class="fa-solid fa-angle-down"></i><span>Tags</span><span class="ml-auto">${allTags.length}</span>
    </div>
  </li>
`;
  return recentTaskSideBar;
};
