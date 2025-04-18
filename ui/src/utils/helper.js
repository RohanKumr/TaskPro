
const capitalise = (str) => {
  if(str === undefined) return "";
  return str[0]?.toUpperCase() + str?.slice(1)
}

const formatDate = (dateString) => {
  const date = new Date(dateString);

  const day = date.getDate();
  const month = date.toLocaleString('en-US', { month: 'short' });
  const year = date.getFullYear();

  return `${month} ${day}, ${year}`;
}


export { capitalise, formatDate }