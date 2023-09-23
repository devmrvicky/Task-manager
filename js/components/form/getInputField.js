const getInputField = (inputName) => {
  let inputText, type, iconClass;
  switch (inputName) {
    case "id":
      inputText = "User Id";
      type = "text";
      iconClass = "user";
      break;
    case "password":
      inputText = "Password";
      type = "password";
      iconClass = "lock";
      break;
  }
  const inputField = document.createElement("div");
  inputField.className = `input-field flex items-center overflow-hidden rounded-lg border border-[#16A085]`;
  const fragment = document.createDocumentFragment();
  const label = document.createElement("label");
  label.className = "hidden";
  label.setAttribute("for", inputName);
  label.setAttribute("aria-hidden", true);
  label.appendChild(document.createTextNode(inputText));

  // icon
  const icon = document.createElement("div");
  icon.className = `icon bg-[#16A085] text-white h-full py-2 px-4`;
  icon.insertAdjacentHTML(
    "afterbegin",
    `<i class="fa-solid fa-${iconClass}"></i>`
  );

  // input
  const input = document.createElement("input");
  input.className = `px-3 outline-none w-full`;
  input.type = type;
  input.placeholder = inputText;
  input.name = inputName;
  input.id = inputName;
  input.required = true;
  if (inputName === "password") {
    input.autocomplete = true;
  }

  fragment.append(label, icon, input);
  inputField.appendChild(fragment);
  return inputField;
};
export default getInputField;
