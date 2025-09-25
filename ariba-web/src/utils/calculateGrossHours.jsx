export function calculateGrossHours(start, end) {
  // Parse start & end as Date objects using today's date
  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
  const startDate = new Date(`${today} ${start}`);
  const endDate = new Date(`${today} ${end}`);

  // If end is earlier than start (e.g. crossing midnight), add 1 day
  if (endDate < startDate) {
    endDate.setDate(endDate.getDate() + 1);
  }

  // Calculate difference in milliseconds
  const diffMs = endDate - startDate;

  // Convert to hours, minutes, seconds
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

  return `${hours}h ${minutes}m ${seconds}s`;
}
