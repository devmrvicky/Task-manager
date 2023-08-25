export const getLoginForm = () => {
  const formContainer = document.createElement("div");
  formContainer.className =
    "login-form-container w-full bg-zinc-500/50 backdrop-blur-[10px] h-screen absolute top-0 left-0 flex items-center justify-center";
  const form = document.createElement("form");
  form.className = "login-form p-5 border flex flex-col";
  form.innerHTML = `
    <label for="name">User Name</label>
    <input type="text" class="px-4 py-3 border mb-2 outline-none" placeholder="name" name="name" id="name" value="vicky k."/>
    <label for="id">User Id</label>
    <input type="text" class="px-4 py-3 border mb-2 outline-none" placeholder="id" name="id" id="id" value="devmrvicky"/>
    <label for="password">Password</label>
    <input type="password" class="px-4 py-3 border mb-2 outline-none" placeholder="password" name="password" id="password" autocomplete value="@(devmrvicky)_Login"/>
    <input type="submit" class="px-4 py-3 border mb-2 outline-none" value="Log in" />
  `;

  formContainer.append(form);
  return formContainer;
};
