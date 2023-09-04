import { navigationList } from "../main.js";
import { addDashboardElement } from "../pages/dashboard.js";
import { appendNewPage } from "./appendNewPage.js";

const navigationBtn = document.querySelector(".nav-btn");
navigationBtn.style.display = "none";

navigationBtn?.addEventListener("click", () => {
  if (!navigationList.length) return;
  let lastVisitPage = navigationList.at(-2);
  if (!lastVisitPage) return;
  if (lastVisitPage === "dashboard") {
    addDashboardElement(true);
  } else {
    appendNewPage(lastVisitPage, true);
  }
  navigationList.pop();
  if (navigationList.length <= 1) {
    navigationBtn.style.display = "none";
  }
});

export { navigationBtn };
