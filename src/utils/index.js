export const removeEle = (arr, e) => {
  let newArr = [...arr]
  let index = newArr.indexOf(e)
  if (index === -1) return arr
  newArr.splice(index, index + 1)
  return newArr
}