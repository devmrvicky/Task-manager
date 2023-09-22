// get time obj
const getTimeObj = () => {
  const dateObj = new Date();
  const year = dateObj.getFullYear();
  const month = ("0" + (dateObj.getMonth() + 1)).slice(-2);
  const day = ("0" + dateObj.getDay()).slice(-2);
  const date = ("0" + dateObj.getDate()).slice(-2);
  const hour = ("0" + dateObj.getHours()).slice(-2);
  const minute = ("0" + dateObj.getMinutes()).slice(-2);
  return { year, month, day, date, hour, minute };
};

export default getTimeObj;
