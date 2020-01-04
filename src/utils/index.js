export const capitalize = string => {
  return typeof string === "string" && string.length >= 1
    ? string.charAt(0).toUpperCase() + string.slice(1)
    : null;
};
