function analyzeText() {
  const cipherText = document.getElementById("cipherText").value.toUpperCase();
  const frequency = new Map();

  // Hitung frekuensi setiap huruf
  for (const char of cipherText) {
    if (char.match(/[A-Z]/)) {
      frequency.set(char, (frequency.get(char) || 0) + 1);
    }
  }

  // Urutkan huruf berdasarkan frekuensi
  const sortedFrequency = Array.from(frequency.entries()).sort(
    (a, b) => b[1] - a[1]
  );

  // Tampilkan tabel frekuensi
  const frequencyTable = document.getElementById("frequencyTable");
  frequencyTable.innerHTML = "<h2>Frekuensi Huruf</h2>";

  const tableRow = document.createElement("div");
  tableRow.className = "table-row";

  sortedFrequency.forEach(([letter, count]) => {
    const tableItem = document.createElement("div");
    tableItem.className = "table-item";
    tableItem.innerHTML = `
            <span>${letter.toLowerCase()}</span>
            <div>${count}</div>
            <input type="text" maxlength="1" data-letter="${letter}" oninput="updatePreview()">
        `;
    tableRow.appendChild(tableItem);
  });

  frequencyTable.appendChild(tableRow);

  updatePreview();
}

function updatePreview() {
  const cipherText = document.getElementById("cipherText").value.toUpperCase();
  const inputs = document.querySelectorAll("#frequencyTable input");
  const replacements = {};

  // Kumpulkan pengganti dari input
  inputs.forEach((input) => {
    const letter = input.dataset.letter;
    const replacement = input.value.toUpperCase();
    if (replacement) {
      replacements[letter] = replacement;
    }
  });

  // Terapkan penggantian dan perbarui preview
  const previewText = cipherText
    .split("")
    .map((char) => {
      if (char in replacements) {
        return `<span class="replaced">${replacements[
          char
        ].toLowerCase()}</span>`;
      } else {
        return `<span>${char.toLowerCase()}</span>`;
      }
    })
    .join("");

  const preview = document.getElementById("preview");
  preview.innerHTML = previewText;
}
