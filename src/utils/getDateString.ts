export default function getDateString(date: Date): string {
  return `${date.toISOString().split('T')[0]} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}