export const getAlertBox = () => {
  const alertBoxContainer = document.createElement("div");
  alertBoxContainer.className =
    "alert-box-container w-full h-screen fixed z-40 backdrop-blur-lg flex items-center justify-center ";
  const alertBox = document.createElement("div");
  alertBox.className =
    "bg-white border p-10 flex flex-col gap-2 items-center rounded-lg";
  alertBox.innerHTML = `
    <p class="text-2xl">Do you want to delete?</p>
    <div class="flex justify-between items-center mt-10 w-full">
      <button type="button" class="border text-sm outline-none px-3 py-1 rounded-lg mx-auto hover:bg-red-700 bg-red-500 text-white" id="delete-user">Delete</button>
      <button type="button" class="border text-sm outline-none px-3 py-1 rounded-lg mx-auto hover:bg-zinc-50" id="cancel">Cancel</button>
    </div>
  `;
  alertBoxContainer.append(alertBox);

  alertBoxContainer.onclick = (e) => {
    if (e.target.classList.contains("alert-box-container")) {
      alertBoxContainer.remove();
    }
  };

  setTimeout(() => {
    alertBoxContainer.remove();
  }, 10000);
  return alertBoxContainer;
};
