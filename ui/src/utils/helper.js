
const capitalise = (str) => {
  console.log(str);
  if(str === undefined) return "";
  return str[0]?.toUpperCase() + str?.slice(1)
}

export { capitalise }