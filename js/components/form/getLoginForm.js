export const getLoginForm = () => {
  const formContainer = document.createElement("div");
  formContainer.className =
    "login-form-container w-full bg-[#1ABC9C] backdrop-blur-[10px] h-screen absolute top-0 left-0 flex items-center justify-center z-40";
  const form = document.createElement("form");
  form.className =
    "login-form rounded-lg overflow-hidden flex flex-col w-[350px] bg-white";
  form.innerHTML = `
    <div class="form-heading bg-[#16A085] text-center py-5">
      <h1 class="text-4xl text-white " >Login form</h1>
    </div>
    <div class="input-fields flex flex-col gap-4 p-5">
      <div class="input-field flex items-center overflow-hidden rounded-lg border border-[#16A085]">
        <label for="id" aria-hidden="true" class="hidden">User Id</label>
        <div class="icon bg-[#16A085] text-white h-full py-2 px-4">
          <i class="fa-solid fa-user"></i>
        </div>
        <input type="text" class="px-3 outline-none w-full" placeholder="User Id" name="id" id="id" required/>
      </div>
      <div class="input-field flex items-center overflow-hidden rounded-lg border border-[#16A085]">
        <label for="password" aria-hidden="true" class="hidden">Password</label>
        <div class="icon bg-[#16A085] text-white h-full py-2 px-4">
          <i class="fa-solid fa-lock"></i>
        </div>
        <input type="password" class="px-3 outline-none w-full" placeholder="Password" required autocomplete/>
      </div>
      <input type="submit" class="px-4 py-2 rounded-md bg-[#16A085] text-white border mb-2 outline-none" value="Log in" />
    </div>
    <div class="flex justify-center pb-5 text-sm gap-1">
      <p>Not a member?</p><button class="hover:underline text-[#1ABC9C]" id="signup-btn">Signup now</button>
    </div>
  `;

  formContainer.append(form);
  return formContainer;
};
