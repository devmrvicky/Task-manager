import {
  dialogBoxElem,
  getUpdatedUsers,
  getUsersFromLocalStorage,
  login,
  mainApp,
  users,
} from "../main";
import { getUserEditPage } from "./getUserEditPage";
import { getUsersList } from "./getUsersList";
// import { addDashboardElement } from "../pages/dashboard";

export const showAllLoginUsers = () => {
  const preUsersListElem = dialogBoxElem.querySelector("ul");
  preUsersListElem?.remove();
  const ul = document.createElement("ul");
  ul.className = "users-list py-5 flex flex-col";
  getUsersFromLocalStorage();
  for (let user of users) {
    if (user.user_hide) continue;
    let li = getUsersList(user);

    const userMoreMenuBtn = li.querySelector(".user-menu-btn");
    userMoreMenuBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      let userMoreMenusElem = ul.querySelector(".user-more-menus");
      if (userMoreMenusElem) {
        userMoreMenusElem.remove();
      }
      userMoreMenusElem = document.createElement("ul");
      userMoreMenusElem.className =
        "user-more-menus bg-white shadow border w-auto p-1 rounded-lg absolute right-[50px] bottom-[-23px] z-30 flex flex-col gap-2";
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
      li.append(userMoreMenusElem);

      const getLogoutPasswordInput = () => {
        const passContainer = document.createElement("div");
        passContainer.className =
          "logout-pass-container w-full h-screen fixed z-40 backdrop-blur-lg flex items-center justify-center ";
        const passForm = document.createElement("form");
        passForm.className =
          "bg-white border p-3 flex flex-col gap-2 items-center rounded-lg";
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

      const openPasswordInputPage = (actionType) => {
        if (user.current_user) {
          dialogBoxElem.close();
          const logoutPasswordElem = getLogoutPasswordInput();
          const form = logoutPasswordElem.querySelector("form");
          const submitBtn = form.querySelector('input[type="submit"]');
          submitBtn.value = actionType.replace("-", " ");
          if (actionType === "delete-user") {
            submitBtn.className =
              "border text-sm outline-none px-3 py-1 rounded-lg mx-auto text-white hover:bg-red-700 bg-red-400 mt-3";
          }
          form.onsubmit = (e) => {
            e.preventDefault();
            const passInput = e.currentTarget[0];
            if (passInput.value !== user.user_password) {
              alert("Incorrect password");
              passInput.focus();
              passInput.value = "";
              return;
            }
            let updatedUsers;
            if (actionType === "delete-user") {
              confirm("Are you sure?");
              updatedUsers = users.filter(
                (deletionUser) => deletionUser.id !== user.id
              );
            } else {
              updatedUsers = getUpdatedUsers(users);
            }
            localStorage.setItem("users", JSON.stringify(updatedUsers));
            location.reload();
          };
          mainApp.append(logoutPasswordElem);
        }
      };

      const hideUser = () => {
        user = { ...user, user_hide: true };
        let remainingUsers = users.filter(
          (remainingUser) => remainingUser.id !== user.id
        );
        let updatedRemainingUsers = [...remainingUsers, user];
        localStorage.setItem("users", JSON.stringify(updatedRemainingUsers));
        li.remove();
        setTimeout(() => {
          dialogBoxElem.close();
        }, 1000);
        // location.reload();
      };

      const getAlertBox = () => {
        const alertBoxContainer = document.createElement("div");
        alertBoxContainer.className =
          "alert-box-container w-full h-screen fixed z-40 backdrop-blur-lg flex items-center justify-center ";
        const alertBox = document.createElement("div");
        alertBox.className =
          "bg-white border p-10 flex flex-col gap-2 items-center rounded-lg";
        alertBox.innerHTML = `
          <p class="text-2xl">Do you want to delete?</p>
          <div class="flex justify-between items-center mt-10 w-full">
            <button type="button" class="border text-sm outline-none px-3 py-1 rounded-lg mx-auto hover:bg-red-700 bg-red-500 text-white" id="delete-user">Delete</button>
            <button type="button" class="border text-sm outline-none px-3 py-1 rounded-lg mx-auto hover:bg-zinc-50" id="cancel">Cancel</button>
          </div>
        `;
        alertBoxContainer.append(alertBox);

        alertBoxContainer.onclick = (e) => {
          if (e.target.classList.contains("alert-box-container")) {
            alertBoxContainer.remove();
          }
        };

        setTimeout(() => {
          alertBoxContainer.remove();
        }, 10000);
        return alertBoxContainer;
      };

      const openUserDeletePage = () => {
        dialogBoxElem.close();
        const alertBox = getAlertBox();
        const alertBoxBtns = alertBox.querySelectorAll("button");
        alertBoxBtns.forEach((btn) => {
          btn.addEventListener("click", () => {
            alertBox.remove();
            if (btn.id === "delete-user") {
              openPasswordInputPage("delete-user");
            }
          });
        });
        mainApp.append(alertBox);
      };

      // open user edit page
      const openUserEditPage = () => {
        dialogBoxElem.close();
        const editPageContainer = getUserEditPage(user);
        mainApp.append(editPageContainer);
      };

      // log out
      const logoutBtns = li.querySelectorAll(".user-menu");
      logoutBtns.forEach((btn) => {
        btn.addEventListener("click", (e) => {
          e.stopPropagation();
          if (btn.id === "logout") {
            openPasswordInputPage("logout-user");
          } else if (btn.id === "hide-user") {
            hideUser();
          } else if (btn.id === "delete-user") {
            openUserDeletePage();
          } else if (btn.id === "edit-user") {
            openUserEditPage();
          }
        });
      });

      setTimeout(() => {
        userMoreMenusElem.remove();
      }, 2000);
    });

    li.onclick = () => {
      login(user, true);
      dialogBoxElem.close();
    };

    // append user if user's user_hide property false
    if (!user.user_hide) {
      ul.append(li);
    }
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
