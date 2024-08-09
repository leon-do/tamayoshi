// convert seconds to 000D 24H 60M 60S with 0 padding
export default function formatTime(seconds: bigint): string {
  const days = seconds / BigInt(24 * 60 * 60);
  const hours = (seconds % BigInt(24 * 60 * 60)) / BigInt(60 * 60);
  const minutes = (seconds % BigInt(60 * 60)) / BigInt(60);
  const secs = seconds % BigInt(60);

  // Pad each value with leading zeros to ensure 3 digits for days and 2 digits for hours, minutes, and seconds
  const paddedDays = String(days).padStart(2, "0");
  const paddedHours = String(hours).padStart(2, "0");
  const paddedMinutes = String(minutes).padStart(2, "0");
  const paddedSeconds = String(secs).padStart(2, "0");

  return `${paddedDays}D ${paddedHours}H ${paddedMinutes}M ${paddedSeconds}S`;
}
