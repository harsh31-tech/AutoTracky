export function generateBleId(): string {
  const bytes = new Uint8Array(4);

  crypto.getRandomValues(bytes);

  const suffix = Array.from(bytes)
    .map((byte) =>
      byte.toString(16).padStart(2, "0")
    )
    .join("")
    .toUpperCase();

  return `AL-PAX-${suffix}`;
}