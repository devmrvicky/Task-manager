export const getUsersList = (user) => {
  let li = document.createElement("li");
  li.className = `user-list px-3 py-2 rounded-lg hover:bg-zinc-50 flex gap-3 items-center cursor-default ${
    user.current_user ? "active order-first flex-col pt-3" : ""
  } mb-2 relative`;
  li.innerHTML = `
    <div class="bg-white border min-w-[50px] min-h-[50px] ${
      user.current_user ? "min-w-[60px] min-h-[60px]" : ""
    } rounded-full flex items-center justify-center">
      <i class="fa-solid fa-user ${
        user.current_user ? "text-3xl" : "text-2xl"
      }"></i>
    </div>
    <div class="flex flex-col py-2 ${user.current_user ? "items-center" : ""}">
      <p class=" ${user.current_user ? "text-xl" : "text-base"}">${
    user.user_name
  }</p>
      <span class=" text-zinc-500 ${
        user.current_user ? "text-sm" : "text-xs"
      }">${user.user_id}</span>
    </div>
    <button type="button" class="user-menu-btn min-w-[40px] min-h-[40px] rounded-full hover:bg-white flex items-center justify-center ml-auto ${
      user.current_user ? "absolute right-[10px]" : ""
    }">
      <i class="fa-solid fa-ellipsis-vertical"></i>
    </button>
  `;
  return li;
};
