export const getConfirmPasswordInput = (isUserLocked) => {
  const passContainer = document.createElement("div");
  passContainer.className =
    "logout-pass-container w-full h-screen fixed z-50 backdrop-blur-lg flex items-center justify-center ";
  const passForm = document.createElement("form");
  passForm.className =
    "bg-white border p-3 flex flex-col gap-2 items-center rounded-lg";
  passForm.innerHTML = `
    <h3 class="pb-3">Enter confirmation password to unlock user</h3>
    <div class="gap-2 items-center flex">
      <i class="fa-solid fa-key"></i>
      <input type="password" autocomplete required placeholder="Enter lock password" class="outline-none border px-2 py-1" name="password"/>
    </div>
    <input type="submit" value="Lock user" class="border text-sm outline-none px-3 py-1 rounded-lg mx-auto hover:bg-zinc-50 mt-3"/>
  `;
  passContainer.append(passForm);

  passContainer.onclick = (e) => {
    if (e.target.classList.contains("logout-pass-container")) {
      passContainer.remove();
    }
  };

  setTimeout(() => {
    passContainer.remove();
  }, 50000);
  return passContainer;
};
