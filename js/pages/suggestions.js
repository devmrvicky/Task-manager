import { updateNavigationList } from "../main";

const getSuggestionPage = (isFromBackBtn = false) => {
  // update navigation lists
  updateNavigationList(isFromBackBtn, "suggestion");
  const h1 = document.createElement("h1");
  h1.appendChild(document.createTextNode("Suggestions page"));
  return h1;
};

export default getSuggestionPage;
