import { taskManagerContent, updateNavigationList } from "../main";

export const getConstructionPage = (isFromBackBtn) => {
  updateNavigationList(isFromBackBtn, "construction-page");
  const pageContainer = document.createElement("div");
  pageContainer.className = `w-full h-full`;
  pageContainer.innerHTML = `
    <div>
      <h1 class="text-2xl text-center pb-4">This page is under construction</h1>
      <p class="text-sm text-zinc-500 p-5">We're currently hard at work behind the scenes to bring you an even better and more exciting experience on this page. Please bear with us as we put the finishing touches on our improvements. We can't wait to share what we have in store for you! Stay tuned for the grand unveiling, and in the meantime, feel free to explore the rest of our website to discover more about our offerings and services. Thank you for your patience and continued support; we're eager to provide you with an enhanced experience soon.</p>
    </div>
    <div class="img-container max-w-[500px] mx-auto">
      <img src="https://i.gifer.com/6M8G.gif" alt="construction-img" class="w-full"/>
    </div>
  `;
  return pageContainer;
};
