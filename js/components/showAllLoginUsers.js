import { dialogBoxElem, getUpdatedUsers, login, mainApp, users } from "../main";

export const showAllLoginUsers = () => {
  const preUsersListElem = dialogBoxElem.querySelector("ul");
  preUsersListElem?.remove();
  const ul = document.createElement("ul");
  ul.className = "users-list pb-5";
  for (let user of users) {
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

      const getLogoutPasswordInput = () => {
        const passContainer = document.createElement("div");
        passContainer.className =
          "logout-pass-container w-full h-screen fixed z-40 backdrop-blur-lg flex items-center justify-center rounded-lg";
        const passForm = document.createElement("form");
        passForm.className =
          "bg-white border p-3 flex flex-col gap-2 items-center";
        passForm.innerHTML = `
          <h3 class="pb-3">Enter User password</h3>
          <div class="flex gap-2 items-center">
            <i class="fa-solid fa-key"></i>
            <input type="password" autocomplete required autofocus placeholder="User password" class="outline-none border px-2 py-1"/>
          </div>
          <input type="submit" value="Log out" class="border text-sm outline-none px-3 py-1 rounded-lg mx-auto hover:bg-zinc-50 mt-3"/>
        `;
        passContainer.append(passForm);

        passContainer.onclick = (e) => {
          if (e.target.classList.contains("logout-pass-container")) {
            passContainer.remove();
          }
        };

        setTimeout(() => {
          passContainer.remove();
        }, 10000);
        return passContainer;
      };

      const logout = () => {
        if (user.current_user) {
          dialogBoxElem.close();
          const logoutPasswordElem = getLogoutPasswordInput();
          const form = logoutPasswordElem.querySelector("form");
          form.onsubmit = (e) => {
            e.preventDefault();
            const passInput = e.currentTarget[0];
            if (passInput.value !== user.user_password) {
              alert("Incorrect password");
              passInput.focus();
              passInput.value = "";
              return;
            }
            const updatedUsers = getUpdatedUsers(users);
            localStorage.setItem("users", JSON.stringify(updatedUsers));
            location.reload();
          };
          mainApp.append(logoutPasswordElem);
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
