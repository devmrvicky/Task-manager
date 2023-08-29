import { dialogBoxElem, getUpdatedUsers, login, users } from "../main";

export const showAllLoginUsers = () => {
  const preUsersListElem = dialogBoxElem.querySelector("ul");
  preUsersListElem?.remove();
  const ul = document.createElement("ul");
  ul.className = "users-list pb-5";
  for (let user of users) {
    console.log(user);
    let li = document.createElement("li");
    li.className = `user-list px-3 py-2 rounded-lg hover:bg-zinc-50 flex gap-3 items-center cursor-default ${
      user.current_user ? "active" : ""
    } mb-2 relative`;
    li.innerHTML = `
      <i class="fa-solid fa-user fa-2x"></i>
      <div class="flex flex-col">
        <p class="text-base">${user.user_name}</p>
        <span class="text-xs text-zinc-500">${user.user_id}</span>
      </div>
      <button type="button" class="user-menu-btn min-w-[40px] min-h-[40px] rounded-full hover:bg-white flex items-center justify-center ml-auto">
        <i class="fa-solid fa-ellipsis-vertical"></i>
      </button>
    `;

    const userMoreMenuBtn = li.querySelector(".user-menu-btn");
    userMoreMenuBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      let userMoreMenusElem = ul.querySelector(".user-more-menus");
      if (userMoreMenusElem) {
        userMoreMenusElem.remove();
      }
      userMoreMenusElem = document.createElement("ul");
      userMoreMenusElem.className =
        "user-more-menus bg-white shadow border w-[100px] p-1 rounded-lg absolute right-[50px] bottom-[-23px] z-20";
      const userMenu = document.createElement("li");
      userMenu.className =
        "user-menu logout flex gap-3 items-center p-2 hover:bg-zinc-50 text-xs";
      userMenu.innerHTML = `
        <span>Log out</span>
      `;
      userMoreMenusElem.append(userMenu);
      li.append(userMoreMenusElem);

      const logout = () => {
        if (user.current_user) {
          const updatedUsers = getUpdatedUsers(users);
          console.log(updatedUsers);
          localStorage.setItem("users", JSON.stringify(updatedUsers));
          location.reload();
        }
      };

      // log out
      const logoutBtn = li.querySelector(".logout");
      logoutBtn?.addEventListener("click", (e) => {
        e.stopPropagation();
        logout();
      });

      setTimeout(() => {
        userMoreMenusElem.remove();
      }, 2000);
    });

    li.onclick = () => {
      login(user, true);
      dialogBoxElem.close();
    };

    ul.append(li);
  }
  const userList = ul.querySelectorAll(".user-list");
  userList.forEach((list) => {
    list.addEventListener("click", () => {
      for (let user of userList) {
        user.classList.remove("active");
      }
      list.classList.add("active");
    });
  });
  dialogBoxElem.insertAdjacentElement("afterbegin", ul);
};
