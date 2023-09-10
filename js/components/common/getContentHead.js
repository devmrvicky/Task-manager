import allTasks, { allTags } from "../../main";
import { getCurrentUser } from "../Text-editor/getTextEditor";

export const getContentHead = (contentType) => {
  const contentHead = document.createElement("div");
  contentHead.className = `content-head ${contentType}-head w-full flex items-center gap-3 text-[#719191] relative`;
  contentHead.innerHTML = `
    <button type="button" class="content-side-menu ${contentType}-side-menu hidden min-w-[44px] h-11 border rounded-full bg-white items-center justify-center">
      <i class="fa-solid fa-bars sm:text-xl"></i>
    </button>
    <select class="tags rounded-full p-2 px-5 sm:text-base text-xs">
      <option value="all tag" disabled selected>All tags</option>
      ${allTags.map((tag) => `<option value="${tag}">${tag}</option>`).join("")}
    </select>
    <div class="more-opts ml-auto flex items-center gap-3">
    ${
      !(allTasks.recentTask.length || getCurrentUser().user_notes.length)
        ? ``
        : `<button type="button" id="clear-all-items" class="flex items-center justify-center gap-2">
            <i class="fa-regular fa-trash-can"></i>
            <span class="hidden text-xs">delete all</span>
          </button>`
    }
    <div class="layouts flex items-center gap-3">
      <button type="button" id="cell" class="border rounded p-1 flex items-center justify-center hover:bg-zinc-100">
        <i class="fa-solid fa-grip"></i>
      </button>
      <button type="button" id="horizontal" class="border rounded p-1 flex items-center justify-center hover:bg-zinc-100 active">
        <i class="fa-solid fa-bars"></i>
      </button>
      </div>
      <div class="flex items-center gap-4 cursor-default hover:bg-white/50 px-4 py-2 rounded-full sm:text-base text-xs">
        <span>Sort by</span>
        <i class="fa-solid fa-arrow-down-wide-short"></i>
      </div>
    </div>
    <button type="button" class="more-opt-btn ml-auto min-w-[40px] min-h-[40px] hover:bg-white rounded-full hidden items-center justify-center text-sm">
      <i class="fa-solid fa-ellipsis-vertical"></i>
    </button>
  `;
  return contentHead;
};
