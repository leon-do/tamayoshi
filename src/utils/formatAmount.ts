export default function formatAmount(amount: string) {
  // Convert the number to a string and pad it with leading zeros to ensure 12 digits
  const paddedNumber = amount.padStart(12, "0");

  // Insert spaces every 3 digits
  return paddedNumber.replace(/(\d{3})(?=\d)/g, "$1 ");
}
