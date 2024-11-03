export const dateBetweenFilterFn = (row, columnId, value) => {
  const date = new Date(row.getValue(columnId));
  const [start, end] = value; // value => two date input values

  date.setHours(0, 0, 0, 0);

  if ((start || end) && isNaN(date)) {
    return false;
  }
  if (start && !end) {
    return date.getTime() >= start.getTime();
  } else if (!start && end) {
    return date.getTime() <= end.getTime();
  } else if (start && end) {
    return date.getTime() >= start.getTime() && date.getTime() <= end.getTime();
  } else return true;
};

dateBetweenFilterFn.autoRemove;

export default dateBetweenFilterFn;
