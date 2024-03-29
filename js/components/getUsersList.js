export const getUsersList = (user) => {
  let li = document.createElement("li");
  li.className = `user-list px-3 py-2 rounded-lg hover:bg-zinc-50 flex gap-3 items-center cursor-default ${
    user.current_user ? "active order-first flex-col pt-3" : ""
  } mb-2 relative ${user.user_locked ? `user-selector-none` : ``}`;
  li.innerHTML = `
    ${
      user.user_locked
        ? `
      <div class="lock-icon absolute ${
        user.current_user
          ? `bottom-[10px] right-[10px]`
          : `bottom-0 right-[5px]`
      } text-zinc-500">
        <i class="fa-solid fa-lock ${
          user.current_user ? `text-xl` : `text-xs`
        }"></i>
      </div>
    `
        : ``
    }
    <div class="bg-white border ${
      user.current_user ? "w-[100px] h-[100px]" : "w-[50px] h-[50px]"
    } rounded-full flex items-center justify-center overflow-hidden">
      ${
        user.user_img
          ? ` <img src=${user.user_img} alt="user-img" class="w-full"/>`
          : `<i class="fa-solid fa-user text-xl"></i>`
      }
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
