export const getSignupForm = () => {
  const formContainer = document.createElement("div");
  formContainer.className =
    "login-form-container w-full bg-[#1ABC9C] backdrop-blur-[10px] h-screen absolute top-0 left-0 flex items-center justify-center z-20";
  const form = document.createElement("form");
  form.className =
    "login-form rounded-lg overflow-hidden flex flex-col w-[350px] bg-white";
  form.innerHTML = `
    <div class="form-heading bg-[#16A085] text-center py-5">
      <h1 class="text-4xl text-white " >Signup form</h1>
    </div>
    <div class="input-fields flex flex-col gap-4 p-5">
      <div class="input-field flex items-center overflow-hidden rounded-lg border border-[#16A085]">
        <label for="user-name" aria-hidden="true" class="hidden">User name</label>
        <div class="icon bg-[#16A085] text-white h-full py-2 px-4">
          <i class="fa-solid fa-user"></i>
        </div>
        <input type="text" class="px-3 outline-none w-full" placeholder="User name" name="user name" id="user-name" required/>
      </div>
      <div class="input-field flex items-center overflow-hidden rounded-lg border border-[#16A085]">
        <label for="user-id" aria-hidden="true" class="hidden">User Id</label>
        <div class="icon bg-[#16A085] text-white h-full py-2 px-4">
          <i class="fa-solid fa-user"></i>
        </div>
        <input type="text" class="px-3 outline-none w-full" placeholder="User Id" name="user-id" id="user-id" required/>
      </div>
      <div class="input-field flex items-center overflow-hidden rounded-lg border border-[#16A085]">
        <label for="user-password" aria-hidden="true" class="hidden">user Password</label>
        <div class="icon bg-[#16A085] text-white h-full py-2 px-4">
          <i class="fa-solid fa-lock"></i>
        </div>
        <input type="password" class="px-3 outline-none w-full" placeholder="Password" required autocomplete/>
      </div>
      <input type="submit" class="px-4 py-2 rounded-md bg-[#16A085] text-white border mb-2 outline-none" value="Signup" />
    </div>
    <div class="flex justify-center pb-5 text-sm gap-1">
      <p>I am already member.</p><button class="hover:underline text-[#1ABC9C]" id="login-btn">Login</button>
    </div>
  `;

  formContainer.append(form);
  return formContainer;
};
