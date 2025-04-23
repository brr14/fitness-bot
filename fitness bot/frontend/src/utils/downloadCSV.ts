export function downloadCSV(data: any[], filename = "data.csv") {
    if (!data || data.length === 0) {
        console.warn("No data to download");
        return;
    }

    const headers = Object.keys(data[0]);
    const csvRows = [
        headers.join(","), // Header row
        ...data.map(row => headers.map(field => JSON.stringify(row[field] ?? "")).join(","))
    ];

    const csvContent = csvRows.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
}
