import {
  dialogBoxElem,
  getUpdatedUsers,
  getUsersFromLocalStorage,
  mainApp,
  users,
} from "../main";
import { getAlertBox } from "./getAlertBox";
import { getLockPasswordInput } from "./getLockPasswordInput";
import { getLogoutPasswordInput } from "./getLogoutPassInput";

export const lockUser = (user) => {
  getUsersFromLocalStorage();
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

export const openPasswordInputPage = (actionType) => {
  getUsersFromLocalStorage();
  const user = users.find((user) => user.current_user);
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

export const hideUser = (user) => {
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
  location.reload();
};

export const openUserDeletePage = () => {
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
