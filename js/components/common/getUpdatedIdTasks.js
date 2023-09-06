export const getUpdatedIdTasks = (items, isNestedTask = false) => {
  let arr = [];
  for (let item of items) {
    item = {
      ...item,
      id: `${isNestedTask ? "nested_" : ""}task_${arr.length + 1}`,
    };
    arr.push(item);
  }
  return arr;
};
