import {
  dialogBoxElem,
  getUpdatedUsers,
  getUsersFromLocalStorage,
  login,
  mainApp,
  profileElem,
  users,
} from "../main";
import { addDashboardElement } from "../pages/dashboard";
import { getAlertBox } from "./getAlertBox";
import { getConfirmPasswordInput } from "./getConfirmPasswordInput";
import { getLockPasswordInput } from "./getLockPasswordInput";
import { getLogoutPasswordInput } from "./getLogoutPassInput";
import { getUserEditPage } from "./getUserEditPage";
import { getUserMoreMenus } from "./getUserMoreMenus";
import { getUsersList } from "./getUsersList";

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

      const lockUser = (user) => {
        const lockUserPasswordPage = getLockPasswordInput();
        mainApp.append(lockUserPasswordPage);
        const lockForm = lockUserPasswordPage.querySelector("form");
        lockForm.onsubmit = (e) => {
          e.preventDefault();
          let updatedUser = {};
          const passInput = e.currentTarget[0];
          const confirmPassInput = e.currentTarget[1];
          const password = passInput.value;
          let confirmPassword = confirmPassInput.value;
          if (password === confirmPassword) {
            updatedUser.user_locked = true;
            updatedUser.user_lock_password = password;
          }
          // console.log(updatedUser);
          updatedUser = { ...user, ...updatedUser };
          const filteredUsers = users.filter(
            (filterUser) => filterUser.user_id !== user.user_id
          );
          // const insertIndex = user.id.split("_")[0] - 1;
          filteredUsers.push(updatedUser);
          localStorage.setItem("users", JSON.stringify(filteredUsers));
          lockUserPasswordPage.remove();
        };
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
            let updatedUsers = users;
            if (actionType === "delete-user") {
              confirm("Are you sure?");
              // filtered user if id is matched
              updatedUsers = users.filter(
                (deletionUser) => deletionUser.id !== user.id
              );
            } else if ("locked-user") {
              lockUser(user);
              return;
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

        // new updated user
        let newUpdatedUser = {};

        // change img
        const fileInputElem =
          editPageContainer.querySelector('input[type="file"]');
        const imgContainer = editPageContainer.querySelector(".img-container");
        fileInputElem.addEventListener("change", () => {
          const userImg = fileInputElem.files[0];
          const reader = new FileReader();
          reader.readAsDataURL(userImg);
          reader.onload = () => {
            const imgSrc = reader.result;
            imgContainer.innerHTML = ` <img src=${imgSrc} alt="user-img" class="w-full"/>`;
            newUpdatedUser.user_img = imgSrc;
          };
        });

        // edit buttons for name, id and password
        const editUserField = (editableElem) => {
          editableElem.removeAttribute("readonly");
          editableElem.select();
          const updateEditableElem = (userField) => {
            editableElem.setAttribute("readonly", "true");
            let updatedValue = editableElem.value;
            editableElem.classList.add("outline-none");
            if (userField === "user-id") {
              const isUserExist = users.find((u) => u.user_id === updatedValue);
              if (isUserExist) {
                editableElem.value = "";
                alert(
                  "You can't use this user id because it is already using someone"
                );
                return;
              }
              newUpdatedUser.user_id = updatedValue;
            } else {
              newUpdatedUser.user_password = updatedValue;
            }
          };
          editableElem.addEventListener("blur", (e) => {
            updateEditableElem(e.currentTarget.id);
          });
          editableElem.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
              updateEditableElem(e.currentTarget.id);
            }
          });
        };
        const editBtns = editPageContainer.querySelectorAll("button.edit-icon");
        editBtns.forEach((btn) => {
          btn.addEventListener("click", () => {
            if (btn.id === "edit-user-name") {
              let editableElem = btn.previousElementSibling;
              let value = editableElem.textContent;
              let inputClass = "border px-2 py-1 outline-none w-full";
              const input = document.createElement("input");
              input.className = inputClass;
              input.value = value;
              input.focus();
              editableElem.remove();
              btn.insertAdjacentElement("beforebegin", input);
              const updateUserNameField = () => {
                let updatedValue = input.value;
                const span = document.createElement("span");
                span.className = "text-3xl";
                span.textContent = updatedValue;
                input.remove();
                btn.insertAdjacentElement("beforebegin", span);
                btn.innerHTML = `<i class="fa-solid fa-pen text-sm"></i>`;
                newUpdatedUser.user_name = updatedValue;
              };
              input.addEventListener("blur", updateUserNameField);
              input.addEventListener("keydown", (e) => {
                if (e.key === "Enter") {
                  updateUserNameField();
                }
              });
            } else {
              let editableElem = btn.parentElement.nextElementSibling;
              editUserField(editableElem, btn.id);
            }
          });
        });

        // edit-ctrl-btns
        const editCtrlBtns = editPageContainer.querySelectorAll(
          ".edit-ctrl-btns button"
        );
        editCtrlBtns.forEach((btn) => {
          btn.addEventListener("click", () => {
            if (btn.id === "save-changes") {
              user = { ...user, ...newUpdatedUser };
              const filteredUsers = users.filter(
                (filteredUser) => filteredUser.id !== user.id
              );
              filteredUsers.push(user);
              localStorage.setItem("users", JSON.stringify(filteredUsers));
            }
          });
        });

        mainApp.append(editPageContainer);
      };

      // action according to btn id
      const actionAccordingToBtnId = (id) => {
        if (id === "logout") {
          openPasswordInputPage("logout-user");
        } else if (id === "hide-user") {
          hideUser();
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

      const checkUseLockPassword = (user) => {
        const confirmPassInput = getConfirmPasswordInput();
        mainApp.append(confirmPassInput);
        const form = confirmPassInput.querySelector("form");
        form.onsubmit = (e) => {
          e.preventDefault();
          const value = e.currentTarget[0].value;
          return value === user.user_lock_password;
        };
        return false;
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
            login(user, true);
          } else {
            alert("incorrect password");
            return;
          }
        };
      } else {
        login(user, true);
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
