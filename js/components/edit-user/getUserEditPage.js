import { getUserImgBox } from "./getUserImgBox";

export const getUserEditPage = (user) => {
  const editPageContainer = document.createElement("div");
  editPageContainer.className =
    "edit-page-container w-full h-screen fixed z-40 backdrop-blur-lg flex items-center justify-center";
  const editPage = document.createElement("div");
  editPage.className =
    "max-w-[700px] w-[90%] h-[90vh] p-3 border rounded-lg shadow bg-[#F9FAFA] flex flex-col items-center relative";
  const imgBox = getUserImgBox(user);
  editPage.append(imgBox);
  editPage.innerHTML += `
    <button type="button" class="close-edit-page text-sm outline-none px-3 py-1 hover:border hover:shadow hover:bg-zinc-100 absolute top-[5px] right-[5px]">
      <i class="fa-solid fa-xmark text-xl"></i>
    </button>
    <h2 class="flex items-center gap-1 relative">
      <span class="text-3xl user-name">${user.user_name}</span>
      <button class="edit-icon min-w-[30px] h-[30px] hover:bg-white flex items-center justify-center rounded-full hover:border absolute bottom-0 right-[-30px]" id="edit-user-name">
        <i class="fa-solid fa-pen text-xs"></i>
      </button>
    </h2>
    <div class="input-field flex flex-col gap-1 max-w-[350px] w-full mb-3 mt-5 ">
      <label for="user-id" class="flex items-center gap-1 relative">
          <span>User id</span>
          <button class="edit-icon min-w-[30px] h-[30px] hover:bg-white flex items-center justify-center rounded-full hover:border" id="edit-user-id">
            <i class="fa-solid fa-pen text-xs"></i>
          </button>
      </label>
      <input type="text" value=${user.user_id} id="user-id" class="w-full border px-2 py-1" readonly/>
      
    </div>
    <div class="input-field flex flex-col gap-1 max-w-[350px] w-full mt-3 ">
      <label for="user-password" class="flex items-center gap-1 relative">
      <span>User password</span>
        <button class="edit-icon min-w-[30px] h-[30px] hover:bg-white flex items-center justify-center rounded-full hover:border" id="edit-user-password">
          <i class="fa-solid fa-pen text-xs"></i>
        </button>
      </label>
      <input type="password" value=${user.user_password} id="user-password" class="w-full border px-2 py-1" readonly/>
      
    </div>
    <div class="edit-ctrl-btns flex items-center gap-3 justify-end w-full mt-auto translate-x-[100%]">
      <button type="button" class="min-w-[40px] min-h-[40px] border border-zinc-500 hover:bg-zinc-500 hover:text-white rounded-full" id="restore-changes">
        <i class="fa-solid fa-rotate"></i>
      </button>
      <button type="button" class="min-w-[40px] min-h-[40px] border border-green-500 hover:bg-green-700 hover:text-white text-green-500 rounded-full relative" id="save-changes">
        <i class="fa-solid fa-save"></i>
        <span class="hidden w-[10px] h-[10px] bg-zinc-500 rounded-full absolute top-[-5px] right-[-5px]"></span>
      </button>
    </div>
  `;

  editPageContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("edit-page-container")) {
      editPageContainer.remove();
    }
  });
  const closePageBtn = editPage.querySelector(".close-edit-page");
  closePageBtn.addEventListener("click", () => {
    editPageContainer.remove();
  });
  editPageContainer.append(editPage);
  return editPageContainer;
};
