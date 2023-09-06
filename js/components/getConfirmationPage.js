export const getConfirmationPage = () => {
  const container = document.createElement("div");
  container.className =
    "container w-screen h-full fixed top-0 right-0 bg-black/20 z-40 flex justify-center items-center";
  const box = document.createElement("div");
  box.className =
    "confirmation-box max-w-[400px] h-[200px] border bg-white flex items-center flex-col gap-10 p-10 rounded-lg";
  box.innerHTML = `
    <h1>Do you want to delete your all tasks?</h1>
    <div class="w-full flex justify-center gap-10">
      <button class="border px-3 py-2 bg-red-400 rounded hover:bg-red-500 text-white" id="delete-items">
        delete
      </button>
      <button class="border px-3 py-2 rounded hover:bg-zinc-100" id="cancel">
        cancel
      </button>
    </div>
  `;
  container.append(box);
  container.addEventListener("click", (e) => {
    if (e.target.classList.contains("container")) {
      container.remove();
    }
  });
  return container;
};
