import {
  dialogBoxElem,
  getUsersFromLocalStorage,
  mainApp,
  users,
} from "../main";
import { getUserEditPage } from "./getUserEditPage";
import { getUserImgChangeBox } from "./getUserImgChangeBox";

export const openUserEditPage = () => {
  dialogBoxElem.close();
  getUsersFromLocalStorage();
  let user = users.find((user) => user.current_user);

  const editPageContainer = getUserEditPage(user);

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

  // change img
  const fileInputElem = editPageContainer.querySelector("#user-img");
  const imgContainer = editPageContainer.querySelector(".img-container");
  fileInputElem.addEventListener("change", () => {
    uploadImg(fileInputElem, imgContainer);
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
      } else if (btn.id === "edit-user-img") {
        openImgChangeBox();
      } else {
        let editableElem = btn.parentElement.nextElementSibling;
        editUserField(editableElem, btn.id);
      }
    });
  });

  function saveChanges() {
    user = { ...user, ...newUpdatedUser };
    const filteredUsers = users.filter(
      (filteredUser) => filteredUser.id !== user.id
    );
    filteredUsers.push(user);
    localStorage.setItem("users", JSON.stringify(filteredUsers));
  }

  // edit-ctrl-btns
  const editCtrlBtns = editPageContainer.querySelectorAll(
    ".edit-ctrl-btns button"
  );
  editCtrlBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.id === "save-changes") {
        saveChanges();
      }
    });
  });

  mainApp.append(editPageContainer);
};
