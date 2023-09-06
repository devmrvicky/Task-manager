export const getInsertedItemOnSameIndex = (item, items) => {
  const indexToInsert = item.id.split("_").at(-1) - 1;
  let filteredItems;
  if (item.hasOwnProperty("user_id")) {
    filteredItems = items.filter(
      (filteredItem) => filteredItem.user_id !== item.user_id
    );
  } else {
    filteredItems = items.filter((filteredItem) => filteredItem.id !== item.id);
  }
  filteredItems.splice(indexToInsert, 0, item);
  return filteredItems;
};
