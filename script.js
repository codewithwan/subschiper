function analyzeText() {
    const cipherText = document.getElementById('cipherText').value.toUpperCase();
    const frequency = {};
    
    // Hitung frekuensi setiap huruf
    for (const char of cipherText) {
        if (char.match(/[A-Z]/)) {
            frequency[char] = (frequency[char] || 0) + 1;
        }
    }
    
    // Urutkan huruf berdasarkan frekuensi
    const sortedFrequency = Object.entries(frequency).sort((a, b) => b[1] - a[1]);

    // Tampilkan tabel frekuensi
    const frequencyTable = document.getElementById('frequencyTable');
    frequencyTable.innerHTML = '<h2>Frekuensi Huruf</h2>';
    
    const tableRow = document.createElement('div');
    tableRow.className = 'table-row';

    sortedFrequency.forEach(([letter, count]) => {
        tableRow.innerHTML += `
            <div class="table-item">
                <span>${letter.toLowerCase()}</span>
                <div>${count}</div>
                <input type="text" maxlength="1" data-letter="${letter}" oninput="updatePreview()">
            </div>
        `;
    });

    frequencyTable.appendChild(tableRow);

    updatePreview();
}

function updatePreview() {
    const cipherText = document.getElementById('cipherText').value.toUpperCase();
    const inputs = document.querySelectorAll('#frequencyTable input');
    const replacements = {};

    // Kumpulkan pengganti dari input
    inputs.forEach(input => {
        const letter = input.dataset.letter;
        const replacement = input.value.toUpperCase();
        if (replacement) {
            replacements[letter] = replacement;
        }
    });

    // Terapkan penggantian dan perbarui preview
    let previewText = '';
    for (const char of cipherText) {
        if (char in replacements) {
            previewText += `<span class="replaced">${replacements[char].toLowerCase()}</span>`;
        } else {
            previewText += `<span>${char.toLowerCase()}</span>`;
        }
    }

    const preview = document.getElementById('preview');
    preview.innerHTML = previewText;
}
