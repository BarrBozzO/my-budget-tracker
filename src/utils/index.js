export const capitalize = string => {
  return typeof string === "string" && string.length >= 1
    ? string.charAt(0).toUpperCase() + string.slice(1)
    : null;
};

export const formatNumber = num => {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
};
