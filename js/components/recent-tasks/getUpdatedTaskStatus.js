import { getUsersFromLocalStorage, users } from "../../main";

// get updated tasks list
export const getUpdatedTaskStatus = (status, isNestedTask = false) => {
  getUsersFromLocalStorage();
  let task = users.find((user) => user.current_user);
  let updatedTaskObj = {};
  if (isNestedTask) {
    updatedTaskObj = { ...task, status };
    return updatedTaskObj;
  }
  let updatedNestedTasks = [];
  if (task.folder) {
    for (let nestedTask of task.tasks) {
      nestedTask = { ...nestedTask, status };
      updatedNestedTasks.push(nestedTask);
    }
    updatedTaskObj.completedTask = `${
      status === "completed" ? task.tasks.length : 0
    }`;
  }
  updatedTaskObj = {
    ...task,
    ...updatedTaskObj,
    status,
    tasks: updatedNestedTasks,
  };
  return updatedTaskObj;
};
