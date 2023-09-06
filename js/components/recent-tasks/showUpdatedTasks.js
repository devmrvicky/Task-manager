import allTasks from "../../main";
import { updateUsersTasksList } from "../Text-editor/getTextEditor";
import { getParentFolder } from "../common/getParentFolder";
import { getInsertedItemOnSameIndex } from "../getInsertedItemOnSameIndex";
import { getUpdatedTaskStatus } from "./getUpdatedTaskStatus";

export const showUpdatedTasks = (task, tasks, isNestedTask, li) => {
  let updatedTask = {};
  if (task.status === "completed") {
    updatedTask = {
      ...getUpdatedTaskStatus(task, "uncompleted", isNestedTask),
    };
  } else {
    updatedTask = {
      ...getUpdatedTaskStatus(task, "completed", isNestedTask),
    };
  }
  task = { ...updatedTask };
  let filteredTasks = getInsertedItemOnSameIndex(task, tasks);
  let updatedTasks = filteredTasks;
  if (isNestedTask) {
    const parentFolder = getParentFolder(li);
    parentFolder.tasks = [...updatedTasks];
    parentFolder.completedTask =
      task.status === "completed"
        ? parseInt(parentFolder.completedTask) + 1
        : parseInt(parentFolder.completedTask) - 1;
    let filteredTasks = getInsertedItemOnSameIndex(
      parentFolder,
      allTasks.recentTask
    );
    allTasks.recentTask = filteredTasks;
    updateUsersTasksList(filteredTasks);
  } else {
    allTasks.recentTask = updatedTasks;
    updateUsersTasksList(updatedTasks);
  }
  // render whole recent task page after update user task
  // taskManagerContent.innerHTML = "";
  // const recentTaskPage = getRecentTaskPage();
  // taskManagerContent.append(recentTaskPage);
};
