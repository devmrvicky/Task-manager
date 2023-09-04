import {
  dialogBoxElem,
  getUsersFromLocalStorage,
  mainApp,
  users,
} from "../main";
import { getUserEditPage } from "./getUserEditPage";
import { getUserImgChangeBox } from "./getUserImgChangeBox";

// new updated user
let newUpdatedUser = {};

const uploadImg = (imgSrc, appendElem) => {
  const userImg = imgSrc.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(userImg);
  reader.onload = () => {
    const imgSrc = reader.result;
    appendElem.innerHTML = ` <img src=${imgSrc} alt="user-img" class="w-full"/>`;
    newUpdatedUser.user_img = imgSrc;
  };
};

export const openUserEditPage = () => {
  dialogBoxElem.close();
  getUsersFromLocalStorage();
  let user = users.find((user) => user.current_user);

  const editPageContainer = getUserEditPage(user);
  // edit-ctrl-btns
  const ctrlBtnsContainer = editPageContainer.querySelector(".edit-ctrl-btns");
  const editCtrlBtns = editPageContainer.querySelectorAll(
    ".edit-ctrl-btns button"
  );

  // change img
  const fileInputElem = editPageContainer.querySelector("#user-img");
  const imgContainer = editPageContainer.querySelector(".img-container");
  fileInputElem?.addEventListener("change", () => {
    uploadImg(fileInputElem, imgContainer);
  });

  // trace icon
  const getTraceIcon = (message) => {
    const div = document.createElement("div");
    div.className = `trace-icon absolute bottom-[3px] left-[-20px] cursor-pointer`;
    div.title = message;
    div.innerHTML = `
        <i class="fa-solid fa-circle text-xs text-zinc-300"></i>
      `;
    return div;
  };

  // trace changes
  const traceChanges = (updatedValue, compareField, element) => {
    getUsersFromLocalStorage();
    const user = users.find((user) => user.current_user);
    let traceMessage;
    if (compareField === "user-id" && updatedValue !== user.user_id) {
      traceMessage = `You have changed your user id ${user.user_id} to ${updatedValue}`;
    } else if (
      compareField === "user-password" &&
      updatedValue !== user.user_password
    ) {
      traceMessage = `You have changed your user password ${user.user_password} to ${updatedValue}`;
    } else if (
      compareField === "user-name" &&
      updatedValue !== user.user_name
    ) {
      traceMessage = `You have changed your name ${user.user_name} to ${updatedValue}`;
    }

    if (traceMessage) {
      const traceIcon = getTraceIcon(traceMessage);
      element.insertAdjacentElement("afterbegin", traceIcon);
      ctrlBtnsContainer.classList.remove("translate-x-[100%]");
    } else {
      ctrlBtnsContainer.classList.add("translate-x-[100%]");
      const traceIconElem = element.children[0];
      if (traceIconElem.classList.contains("trace-icon")) {
        traceIconElem.remove();
      }
    }
    return;
  };

  // edit buttons for name, id and password
  const editUserField = (editableElem) => {
    editableElem.removeAttribute("readonly");
    editableElem.select();

    const updateEditableElem = (userField) => {
      editableElem.setAttribute("readonly", "true");
      let updatedValue = editableElem.value;
      editableElem.classList.add("outline-none");
      if (userField === "user-id") {
        const otherLoginUsers = users.filter(
          (otherLoginUser) => !otherLoginUser.current_user
        );
        const isUserExist = otherLoginUsers.find(
          (u) => u.user_id === updatedValue
        );
        if (isUserExist) {
          editableElem.value = "";
          alert(
            "You can't use this user id because it is already using someone"
          );
          return;
        }
        newUpdatedUser.user_id = updatedValue;
        traceChanges(
          updatedValue,
          userField,
          editableElem.previousElementSibling
        );
      } else {
        newUpdatedUser.user_password = updatedValue;
        traceChanges(
          updatedValue,
          userField,
          editableElem.previousElementSibling
        );
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

  const openImgChangeBox = () => {
    const changeImgBox = getUserImgChangeBox(user);
    mainApp.append(changeImgBox);

    const changeImgInput = changeImgBox.querySelector("#change-img");
    const changeImgContainer = changeImgBox.querySelector(
      ".changed-img-container"
    );
    changeImgInput.addEventListener("change", () => {
      uploadImg(changeImgInput, changeImgContainer);
    });

    const removeImg = changeImgBox.querySelector("#remove-img");
    removeImg.addEventListener("click", () => {
      newUpdatedUser.user_img = "";
      changeImgContainer.innerHTML = `<i class="fa-solid fa-user-circle fa-8x"></i>`;
    });

    const saveChangeImg = changeImgBox.querySelector("#save-change-img");
    saveChangeImg.addEventListener("click", () => {
      saveChanges();
      changeImgBox.remove();
      imgContainer.innerHTML = ` ${
        newUpdatedUser.user_img
          ? `<img src=${newUpdatedUser.user_img} alt="user-img" class="w-full"/>`
          : `<i class="fa-solid fa-user fa-6x"></i>`
      }`;
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
          span.className = "text-3xl user-name";
          span.textContent = updatedValue;
          input?.remove();
          btn.insertAdjacentElement("beforebegin", span);
          btn.innerHTML = `<i class="fa-solid fa-pen text-sm"></i>`;
          newUpdatedUser.user_name = updatedValue;
          traceChanges(updatedValue, "user-name", btn.parentElement);
        };
        input.addEventListener("blur", updateUserNameField);
        input.addEventListener("keydown", (e) => {
          if (e.key === "Enter") {
            updateUserNameField();
          }
        });
      } else if (btn.id === "edit-user-img") {
        openImgChangeBox();
      } else {
        let editableElem = btn.parentElement.nextElementSibling;
        editUserField(editableElem, btn.id);
      }
    });
  });

  const removeAllTraceChangesIcon = () => {
    const allTraceChangesIcons =
      editPageContainer.querySelectorAll(".trace-icon");
    allTraceChangesIcons.forEach((icon) => {
      icon.remove();
    });
  };

  // restore all unsaved changes
  const restoreChanges = () => {
    getUsersFromLocalStorage();
    const user = users.find((user) => user.current_user);
    const inputs = editPageContainer.querySelectorAll("input");
    inputs.forEach((input) => {
      if (input.id === "user-id") {
        input.value = user.user_id;
      } else if (input.id === "user-password") {
        input.value = user.user_password;
      }
    });
    const userNameElem = editPageContainer.querySelector(".user-name");
    userNameElem.textContent = user.user_name;
    imgContainer.innerHTML = ` ${
      user.user_img
        ? `<img src=${user.user_img} alt="user-img" class="w-full"/>`
        : `<i class="fa-solid fa-user fa-6x"></i>`
    }`;
    ctrlBtnsContainer.classList.add("translate-x-[100%]");
    newUpdatedUser = { ...user };
    removeAllTraceChangesIcon();
  };

  function saveChanges() {
    removeAllTraceChangesIcon();
    console.log(newUpdatedUser);
    user = { ...user, ...newUpdatedUser };
    const filteredUsers = users.filter(
      (filteredUser) => filteredUser.id !== user.id
    );
    filteredUsers.push(user);
    localStorage.setItem("users", JSON.stringify(filteredUsers));
  }

  editCtrlBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.id === "save-changes") {
        saveChanges();
        editPageContainer.remove();
      } else if (btn.id === "restore-changes") {
        restoreChanges();
      }
    });
  });

  mainApp.append(editPageContainer);
};

export { uploadImg };
