export function isValidDate(d) {
  const parsedDate = new Date(d);
  return parsedDate instanceof Date && !Number.isNaN(parsedDate);
}
