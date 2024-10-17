let displayValue = ''; // Menyimpan input pengguna
let operator = '';     // Operator yang dipilih
let firstValue = '';   // Angka pertama
let secondValue = '';  // Angka kedua
let operatorPressed = false; // Menandakan apakah operator sudah ditekan

// Fungsi untuk menambahkan angka ke tampilan
function append(value) {
    // Jika operator sudah ditekan, kita mulai input baru untuk angka kedua
    if (operatorPressed) {
        displayValue = '';
        operatorPressed = false;
    }
    
    // Tambahkan angka ke display
    displayValue += value;
    document.getElementById('result').value = displayValue;
}

// Fungsi untuk operasi matematika
function operate(op) {
    if (displayValue === '') return; // Cegah penekanan operator tanpa angka

    if (!operatorPressed) {
        firstValue = displayValue; // Simpan nilai pertama
        operator = op;             // Simpan operator
        operatorPressed = true;    // Tandai bahwa operator sudah ditekan
    } else {
        // Jika operator sudah ditekan dan angka kedua sedang diinput,
        // kalkulasi hasil sementara
        calculate();
        operator = op; // Update operator
    }
}

// Fungsi untuk menghitung hasil
function calculate() {
    if (operator === '' || displayValue === '') return; // Cegah perhitungan tanpa input valid
    secondValue = displayValue;

    let result = '';

    switch (operator) {
        case '+':
            result = parseFloat(firstValue) + parseFloat(secondValue);
            break;
        case '-':
            result = parseFloat(firstValue) - parseFloat(secondValue);
            break;
        case '*':
            result = parseFloat(firstValue) * parseFloat(secondValue);
            break;
        case '/':
            result = parseFloat(firstValue) / parseFloat(secondValue);
            break;
        case '**':
            result = Math.pow(parseFloat(firstValue), parseFloat(secondValue));
            break;
        case '%':
            result = parseFloat(firstValue) % parseFloat(secondValue);
            break;
        default:
            return;
    }

    document.getElementById('result').value = result;
    displayValue = result.toString(); // Update nilai di layar dengan hasilnya
    firstValue = displayValue;        // Simpan hasil untuk kalkulasi berikutnya
    operator = '';                    // Reset operator
    secondValue = '';                 // Reset angka kedua
    operatorPressed = true;           // Siapkan untuk input baru
}

// Fungsi untuk membersihkan tampilan
function clearDisplay() {
    displayValue = '';
    operator = '';
    firstValue = '';
    secondValue = '';
    operatorPressed = false; // Reset flag operator
    document.getElementById('result').value = '';
}

// Fungsi untuk menghapus satu angka (Backspace)
function backspace() {
    displayValue = displayValue.slice(0, -1); // Hapus angka terakhir
    document.getElementById('result').value = displayValue;
}

// Fungsi untuk menangani input dari keyboard
window.addEventListener('keydown', function(event) {
    const key = event.key; // Mendapatkan tombol yang ditekan

    if (!isNaN(key) || key === '.') {
        // Jika tombol adalah angka atau titik desimal
        append(key);
    } else if (key === '+') {
        operate('+');
    } else if (key === '-') {
        operate('-');
    } else if (key === '*') {
        operate('*');
    } else if (key === '/') {
        operate('/');
    } else if (key === '%') {
        operate('%');
    } else if (key === 'Enter') {
        // Tombol 'Enter' untuk menghitung
        calculate();
    } else if (key === 'Escape' || key === 'Delete') {
        // Tombol 'Escape' atau 'Delete' untuk clear
        clearDisplay();
    } else if (key === 'Backspace') {
        // Fungsi Backspace untuk menghapus satu karakter
        backspace();
    }
});
