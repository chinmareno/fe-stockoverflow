function toRupiahFormat(number: number) {
  const numberHehe = String(number);
  const formattedNumber = numberHehe.replace(/\D/g, ""); // Remove all non-digit characters
  const parts = [];
  for (let i = formattedNumber.length - 1; i >= 0; i -= 3) {
    parts.unshift(formattedNumber.slice(Math.max(i - 2, 0), i + 1));
  }
  return parts.join(".");
}
export default toRupiahFormat;
