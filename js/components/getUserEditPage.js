export const getUserEditPage = (user) => {
  const editPageContainer = document.createElement("div");
  editPageContainer.className =
    "edit-page-container w-full h-screen fixed z-40 backdrop-blur-lg flex items-center justify-center";
  const editPage = document.createElement("div");
  editPage.className =
    "max-w-[700px] w-[90%] h-[90vh] p-3 border rounded-lg shadow bg-[#F9FAFA] flex flex-col items-center relative";
  editPage.innerHTML = `
    <button type="button" class="close-edit-page text-sm outline-none px-3 py-1 hover:border hover:shadow hover:bg-zinc-100 absolute top-[5px] right-[5px]">
      <i class="fa-solid fa-xmark text-xl"></i>
    </button>
    <div class="my-5">
      <div class="w-[200px] h-[200px] border p-1 rounded-full cursor-pointer group relative">
        ${
          user.user_img
            ? `
          <div class="img-container w-full h-full rounded-full border">
            <img src=${user.user_img} alt="user-img" class="w-full"/>
          </div>
        `
            : `
            <div class="bg-white border w-full h-full rounded-full flex items-center justify-center">
              <i class="fa-solid fa-user fa-6x"></i>
            </div>
        `
        }
        <div class="edit-icon w-[40px] h-[40px] bg-white hidden items-center justify-center rounded-full border absolute right-[20px] bottom-0 group-hover:flex">
          <i class="fa-solid fa-pen text-sm"></i>
        </div>
      </div>
    </div>
    <h2>
      <span class="text-3xl">${user.user_name}</span>
      <i class="fa-solid fa-pen text-sm"></i>
    </h2>
    <div class="input-field flex flex-col gap-1 max-w-[350px] w-full mb-3 mt-5">
      <label for="user-id">User Id<i class="fa-solid fa-pen ml-2 text-sm"></i></label>
      <input type="text" value=${
        user.user_id
      } id="user-id" class="w-full outline-none border px-2 py-1" readonly/>
      
    </div>
    <div class="input-field flex flex-col gap-1 max-w-[350px] w-full mt-3">
      <label for="user-password">User Password<i class="fa-solid fa-pen ml-2 text-sm"></i></label>
      <input type="password" value=${
        user.user_password
      } id="user-password" class="w-full outline-none border px-2 py-1" readonly/>
      
    </div>
    <div class="edit-ctrl-btns flex items-center gap-3 justify-end w-full mt-auto">
      <button type="button" class="min-w-[40px] min-h-[40px] border border-zinc-500 hover:bg-zinc-500 hover:text-white rounded-full">
        <i class="fa-solid fa-rotate"></i>
      </button>
      <button type="button" class="min-w-[40px] min-h-[40px] border border-red-500 hover:bg-red-700 hover:text-white text-red-500 rounded-full">
        <i class="fa-solid fa-xmark"></i>
      </button>
      <button type="button" class="min-w-[40px] min-h-[40px] border border-green-500 hover:bg-green-700 hover:text-white text-green-500 rounded-full">
        <i class="fa-solid fa-save"></i>
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
