import getInputField from "./getInputField";

export const getLoginForm = () => {
  const formContainer = document.createElement("div");
  formContainer.className =
    "login-form-container w-full bg-[#1ABC9C] backdrop-blur-[10px] h-screen absolute top-0 left-0 flex items-center justify-center z-40";
  const form = document.createElement("form");
  form.className =
    "login-form rounded-lg overflow-hidden flex flex-col w-[350px] bg-white";
  const fragment = document.createDocumentFragment();

  // form heading
  const formHeading = document.createElement("div");
  formHeading.className = `form-heading bg-[#16A085] text-center py-5`;
  const heading = document.createElement("h1");
  heading.className = `text-4xl text-white`;
  heading.appendChild(document.createTextNode("Login form"));
  formHeading.appendChild(heading);

  // input fields
  const inputFieldsFragment = document.createDocumentFragment();
  const inputFields = document.createElement("div");
  inputFields.className = `input-fields flex flex-col gap-4 p-5`;
  const idInput = getInputField("id");
  const passwordInput = getInputField("password");
  const submitInput = document.createElement("input");
  submitInput.className = `px-4 py-2 rounded-md bg-[#16A085] text-white border mb-2 outline-none`;
  submitInput.type = "submit";
  submitInput.value = "Log in";
  const formBottom = document.createElement("div");
  formBottom.className = `flex justify-center pb-5 text-sm gap-1`;
  formBottom.insertAdjacentHTML(
    "afterbegin",
    `<p>Not a member?</p><button class="hover:underline text-[#1ABC9C]" id="signup-btn">Signup now</button>`
  );
  inputFieldsFragment.append(idInput, passwordInput, submitInput, formBottom);
  inputFields.append(inputFieldsFragment);

  fragment.append(formHeading, inputFields);
  form.append(fragment);
  formContainer.append(form);
  return formContainer;
};
