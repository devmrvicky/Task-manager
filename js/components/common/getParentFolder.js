import allTasks from "../../main";

// get parent folder
export const getParentFolder = (li) => {
  const parentElement = li.parentElement.parentElement;
  const id = parentElement.dataset.fileId;
  const parentFolder = allTasks.recentTask.find(
    (recentTask) => recentTask.id === id
  );
  return parentFolder;
};
