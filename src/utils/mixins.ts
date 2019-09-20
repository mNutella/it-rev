export const delay = async (ms: number = 1000) => new Promise(r => setTimeout(r, ms));
export const parseFullDate = (date: Date) => {
  return date.getDate() +
    "-" +
    (date.getMonth() + 1) +
    "-" +
    date.getFullYear();
}
export const reverseFullDate = (date: Date) => {
  return date.toISOString().substr(0, 10);
}
export const parseDay = (date: Date, reg: string) => {
  return date.toLocaleString(reg, { weekday: "long" });
}