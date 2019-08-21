export const getSafeArr = <T extends unknown>(arr: T[]) => {
  return Array.isArray(arr) ? arr : [];
};
export const deleteByIndex = <T extends unknown>(arr: T[], index: number) => {
  const newValArr = getSafeArr(arr).slice();
  newValArr.splice(index, 1);
  return newValArr;
};
export const swapByIndex = <T extends unknown>(arr: T[], aIndex: number, bIndex: number) => {
  const newValArr = getSafeArr(arr).slice();
  const a = newValArr[aIndex];
  newValArr[aIndex] = newValArr[bIndex];
  newValArr[bIndex] = a;
  return newValArr;
};
export const replaceByIndex = <T extends unknown>(arr: T[], index: number, value: T) => {
  const newValArr = getSafeArr(arr).slice();
  newValArr[index] = value;
  return newValArr;
};
