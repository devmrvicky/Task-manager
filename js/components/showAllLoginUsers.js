import {
  dialogBoxElem,
  getUsersFromLocalStorage,
  loginOrSignupUser,
  mainApp,
  profileElem,
  users,
} from "../main";
import { getConfirmPasswordInput } from "./password-input/getConfirmPasswordInput";
import { getUserMoreMenus } from "./getUserMoreMenus";
import { getUsersList } from "./getUsersList";
import { openUserEditPage } from "./edit-user/openUserEditPage";
import {
  hideUser,
  openPasswordInputPage,
  openUserDeletePage,
} from "./userActions";

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
      let x = e.offsetX + "px";
      let y = e.offsetY + "px";
      let userMoreMenusElem = ul.querySelector(".user-more-menus");
      if (userMoreMenusElem) {
        userMoreMenusElem.remove();
      }
      userMoreMenusElem = getUserMoreMenus(x, y, user);
      li.append(userMoreMenusElem);

      // action according to btn id
      const actionAccordingToBtnId = (id) => {
        if (id === "logout") {
          openPasswordInputPage("logout-user");
        } else if (id === "hide-user") {
          hideUser(user);
        } else if (id === "lock-user") {
          openPasswordInputPage("locked-user");
        } else if (id === "unlock-user") {
          let updatedUser = {
            ...user,
            user_locked: false,
            user_lock_password: "",
          };
          const filteredUsers = users.filter(
            (filterUser) => filterUser.user_id !== user.user_id
          );
          // const insertIndex = user.id.split("_")[0] - 1;
          filteredUsers.push(updatedUser);
          localStorage.setItem("users", JSON.stringify(filteredUsers));
        } else if (id === "delete-user") {
          openUserDeletePage();
        } else if (id === "edit-user") {
          openUserEditPage();
        }
      };

      // log out
      const logoutBtns = li.querySelectorAll(".user-menu");
      logoutBtns.forEach((btn) => {
        btn.addEventListener("click", (e) => {
          e.stopPropagation();
          if (user.user_locked) {
            dialogBoxElem.close();
            const confirmPassInput = getConfirmPasswordInput();
            mainApp.append(confirmPassInput);
            const form = confirmPassInput.querySelector("form");
            form.onsubmit = (e) => {
              e.preventDefault();
              const value = e.currentTarget[0].value;
              if (user.user_lock_password === value) {
                confirmPassInput.remove();
                actionAccordingToBtnId(btn.id);
              } else {
                alert("incorrect password");
                return;
              }
            };
          } else {
            actionAccordingToBtnId(btn.id);
          }
        });
      });

      setTimeout(() => {
        userMoreMenusElem.remove();
      }, 2000);
    });

    li.onclick = () => {
      if (user.current_user) return;
      if (user.user_locked) {
        const confirmPassInput = getConfirmPasswordInput();
        mainApp.append(confirmPassInput);
        const form = confirmPassInput.querySelector("form");
        form.onsubmit = (e) => {
          e.preventDefault();
          const value = e.currentTarget[0].value;
          if (user.user_lock_password === value) {
            confirmPassInput.remove();
            loginOrSignupUser(user, true);
          } else {
            alert("incorrect password");
            return;
          }
        };
      } else {
        loginOrSignupUser(user, true);
      }
      dialogBoxElem.close();

      // change user img on click on user
      const imgElem = profileElem.querySelector(".user-img");
      if (user.user_img) {
        imgElem.innerHTML = `
          <img src=${user.user_img} alt="user img" class="w-full"/>
        `;
      } else {
        imgElem.innerHTML = `
          <i class="fa-solid fa-user text-xl md:text-2xl"></i>
        `;
      }
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
