export const getUserImgBox = (user) => {
  const label = document.createElement("label");
  label.className = `my-5 cursor-pointer bg-red-500 flex items-center justify-center rounded-full self-center`;
  label.setAttribute("for", "user-img");
  label.innerHTML = `
    <div class="w-[200px] h-[200px] bg-[#16A085] text-white p-1 rounded-full cursor-pointer group relative">
      <div class="img-container border w-full h-full rounded-full flex items-center justify-center overflow-hidden">
        ${
          user.user_img
            ? ` <img src=${user.user_img} alt="user-img" class="w-full"/>`
            : `<i class="fa-solid fa-user fa-6x"></i>`
        }
      </div>
      <button class="edit-icon edit-user-img text-black min-w-[40px] h-[40px] bg-white hidden items-center justify-center rounded-full border absolute right-[20px] bottom-0 group-hover:flex" id="edit-user-img">
        <i class="fa-solid fa-pen text-sm"></i>
      </button>
    </div>
    <input type="file" aria-hidden="true" id="user-img" class="hidden"/>
    `;
  return label;
};
