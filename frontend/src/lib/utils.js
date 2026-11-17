export const money = (value) =>
  `Rs. ${Number(value).toLocaleString("en-LK", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
export const dateLabel = (value) =>
  value
    ? new Date(`${value}T12:00:00`).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
    : "—";
export const initials = (name) =>
  name
    .replace(/^(Mr\.|Ms\.)\s*/, "")
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("");
export const grade = (value) =>
  value === "" || value == null
    ? "—"
    : value >= 96
      ? "A+"
      : value >= 75
        ? "A"
        : value >= 65
          ? "B"
          : value >= 55
            ? "C"
            : value >= 35
              ? "S"
              : "F";
export const match = (record, query) =>
  Object.values(record)
    .join(" ")
    .toLowerCase()
    .includes(query.trim().toLowerCase());
export function download(name, body, type = "text/plain") {
  const url = URL.createObjectURL(new Blob([body], { type }));
  const link = document.createElement("a");
  link.href = url;
  link.download = name;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
export function exportCSV(title, records) {
  const keys = Object.keys(records[0] || {});
  const cell = (v) =>
    '"' +
    String(v ?? "")
      .replace(/^[=+@-]/, "'$&")
      .replaceAll('"', '""') +
    '"';
  download(
    `${title}.csv`,
    "\uFEFF" +
    [keys, ...records.map((row) => keys.map((k) => row[k]))]
      .map((row) => row.map(cell).join(","))
      .join("\r\n"),
    "text/csv;charset=utf-8",
  );
}
// Small, dependency-free text PDF export for local demonstration receipts/reports.
export function exportPDF(title, lines) {
  const safe = (value) =>
    String(value)
      .replace(/[^\x20-\x7E]/g, "-")
      .replace(/[\\()]/g, "\\$&");
  const content = [
    title,
    "STSMS - Ziyora Institute - LOCAL DEMO / NOT AN OFFICIAL RECORD",
    "",
    ...lines,
  ].flatMap((line) => String(line).match(/.{1,92}/g) || [""]);
  const pages = Array.from(
    { length: Math.max(1, Math.ceil(content.length / 44)) },
    (_, i) => content.slice(i * 44, (i + 1) * 44),
  );
  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
  ];
  const pageIds = [];
  for (const lines of pages) {
    const pageId = objects.length + 1;
    pageIds.push(pageId);
    const stream = `BT /F1 11 Tf 45 790 Td 16 TL ${lines.map((line) => `(${safe(line)}) Tj T*`).join("\n")} ET`;
    objects.push(
      `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 3 0 R >> >> /Contents ${pageId + 1} 0 R >>`,
      `<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`,
    );
  }
  objects[1] = `<< /Type /Pages /Kids [${pageIds.map((id) => `${id} 0 R`).join(" ")}] /Count ${pages.length} >>`;
  let pdf = "%PDF-1.4\n";
  const offsets = [0];
  objects.forEach((obj, i) => {
    offsets.push(pdf.length);
    pdf += `${i + 1} 0 obj\n${obj}\nendobj\n`;
  });
  const xref = pdf.length;
  pdf +=
    `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n` +
    offsets
      .slice(1)
      .map((n) => `${String(n).padStart(10, "0")} 00000 n \n`)
      .join("");
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`;
  download(`${title}.pdf`, pdf, "application/pdf");
}
