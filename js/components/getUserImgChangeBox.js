export const getUserImgChangeBox = (user) => {
  const imgBoxContainer = document.createElement("div");
  imgBoxContainer.className =
    "img-change-box-container w-full h-screen fixed z-40 bg-zinc-500/50 backdrop-blur flex justify-center pt-10";
  const imgBox = document.createElement("div");
  imgBox.className = `img-box max-w-[500px] w-[90%] h-[400px] border rounded-lg shadow bg-[#F9FAFA] flex flex-col relative`;
  imgBox.innerHTML = `
    <button class="close-img-box-btn p-2 self-end">
      <i class="fa-solid fa-xmark text-xl"></i>
    </button>
    <div class="w-full max-h-[300px] overflow-auto flex-1 self-center flex items-center justify-center border">
      <div class="changed-img-container max-w-[200px] w-full flex items-center justify-center">
      ${
        user.user_img
          ? ` <img src=${user.user_img} alt="user-img" class="w-full"/>`
          : `<i class="fa-solid fa-user-circle fa-6x"></i>`
      }
      </div>
    </div>
    <div class="img-box-btns flex gap-5 items-center self-end p-2">
      <label for="change-img">
        <i class="fa-solid fa-upload text-xl"></i>
      </label>
      <input type="file" id="change-img" aria-hidden="true" class="hidden"/>
      <button type="button" id="remove-img">
        <i class="fa-solid fa-circle text-xl"></i>
      </button>
      <button type="button" id="save-change-img">
        <i class="fa-solid fa-save text-xl"></i>
      </button>
    </div>
  `;

  imgBoxContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("img-change-box-container")) {
      imgBoxContainer.remove();
    }
  });
  const closePageBtn = imgBox.querySelector(".close-img-box-btn");
  closePageBtn.addEventListener("click", () => {
    imgBoxContainer.remove();
  });
  imgBoxContainer.append(imgBox);
  return imgBoxContainer;
};
