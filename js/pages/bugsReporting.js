import { updateNavigationList } from "../main";

const getBugReportingPage = (isFromBackBtn = false) => {
  updateNavigationList(isFromBackBtn, "bugs");
  const h1 = document.createElement("h1");
  h1.appendChild(document.createTextNode("Bug reporting page"));
  return h1;
};

export default getBugReportingPage;
