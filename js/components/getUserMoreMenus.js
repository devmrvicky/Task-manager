export const getUserMoreMenus = (x, y, user) => {
  const userMoreMenusElem = document.createElement("ul");
  userMoreMenusElem.className = `user-more-menus bg-white shadow border w-auto p-1 rounded-lg absolute right-[${x}] bottom-[${y}] z-30 flex flex-col gap-2`;
  userMoreMenusElem.innerHTML = `
        ${
          user.current_user
            ? `
            <li
              class="user-menu rounded flex gap-3 items-center p-2 hover:bg-zinc-50 text-xs"
              id="edit-user"
            >
              <i class="fa-solid fa-user-pen"></i>
              <span>User edit</span>
            </li>
            <li
              class="user-menu rounded flex gap-3 items-center p-2 hover:bg-zinc-50 text-xs"
              id="${user.user_locked ? `unlock-user` : `lock-user`}"
            >
              <i class="fa-solid fa-user-lock"></i>
              <span>${user.user_locked ? `Unlock` : `Lock`} user</span>
            </li>
            <li
              class="user-menu rounded flex gap-3 items-center p-2 hover:bg-zinc-50 text-xs"
              id="logout"
            >
              <i class="fa-solid fa-right-from-bracket"></i>
              <span>Log out</span>
            </li>
            <li class="user-menu rounded flex gap-3 items-center p-2 hover:bg-red-500 bg-red-300 text-white text-xs order-last" id="delete-user">
              <i class="fa-solid fa-trash-alt"></i>
              <span span>delete</span>
            </li>`
            : `<li class="user-menu rounded flex gap-3 items-center p-2 hover:bg-zinc-50 text-xs" id="hide-user">
                <i class="fa-solid fa-eye-slash"></i>
                <span>Hide</span>
              </li>`
        }
        
      `;
  return userMoreMenusElem;
};
