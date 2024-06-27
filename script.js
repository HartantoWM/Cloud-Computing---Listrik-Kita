let riwayatPerhitungan = [];

function hitungPemakaian() {
    const namaDevice = document.getElementById('namaDevice').value;
    const dayaWatt = parseFloat(document.getElementById('dayaWatt').value);
    const durasiPemakaian = parseFloat(document.getElementById('durasiPemakaian').value);
    const jumlahPerangkat = parseFloat(document.getElementById('jumlahPerangkat').value);

    if (!namaDevice) {
        alert("Mohon pilih perangkat terlebih dahulu.");
        return;
    }

    if (isNaN(dayaWatt) || isNaN(durasiPemakaian) || isNaN(jumlahPerangkat)) {
        alert("Mohon masukkan nilai yang valid untuk semua input.");
        return;
    }

    if (dayaWatt > 2200) {
        alert("Daya tidak boleh melebihi 2200 watt.");
        return;
    }

    if (durasiPemakaian > 48) {
        alert("Durasi pemakaian tidak boleh melebihi 48 jam.");
        return;
    }

    if (jumlahPerangkat > 100) {
        alert("Jumlah perangkat tidak boleh melebihi 100.");
        return;
    }

    const pemakaianHarian = (dayaWatt * durasiPemakaian * jumlahPerangkat) / 1000;
    const pemakaianBulanan = pemakaianHarian * 30;
    const biayaBulanan = pemakaianBulanan * 1500;

    document.getElementById('pemakaianHarian').innerHTML = `Pemakaian Harian: ${pemakaianHarian.toFixed(2)} kWh`;
    document.getElementById('pemakaianBulanan').innerHTML = `Pemakaian Bulanan: ${pemakaianBulanan.toFixed(2)} kWh`;
    document.getElementById('biayaBulanan').innerHTML = `Biaya Bulanan: Rp ${biayaBulanan.toFixed(0)}`;

    document.getElementById('hasil').classList.add('tampil');
    document.getElementById('riwayat').classList.remove('tampil');

    const hasilPerhitungan = {
        namaDevice,
        dayaWatt,
        durasiPemakaian,
        jumlahPerangkat,
        pemakaianHarian: pemakaianHarian.toFixed(2),
        pemakaianBulanan: pemakaianBulanan.toFixed(2),
        biayaBulanan: biayaBulanan.toFixed(0)
    };

    riwayatPerhitungan.push(hasilPerhitungan);

    tampilkanRiwayatPerhitungan();
}

function resetForm() {
    document.getElementById('kalkulator').reset();
    document.getElementById('hasil').classList.remove('tampil');
    document.getElementById('riwayat').classList.remove('tampil');

    // Menghapus riwayat perhitungan
    riwayatPerhitungan = [];
}

function tampilkanRiwayatPerhitungan() {
    const riwayatElement = document.getElementById('riwayat');
    riwayatElement.innerHTML = '';

    riwayatPerhitungan.forEach((item, index) => {
        const card = document.createElement('div');
        card.classList.add('riwayat-card');
        card.innerHTML = `
            <div class="crud-buttons">
                <button onclick="editPerhitungan(${index})">Edit</button>
                <button onclick="hapusPerhitungan(${index})">Hapus</button>
            </div>
            <input type="checkbox" id="checkbox${index}" onchange="updateTotal()">
            <label for="checkbox${index}">
                <h3>Perhitungan ${index + 1}</h3>
                <p><strong>Nama Perangkat:</strong> ${item.namaDevice}</p>
                <p><strong>Daya (Watt):</strong> ${item.dayaWatt}</p>
                <p><strong>Durasi Pemakaian per Hari (Jam):</strong> ${item.durasiPemakaian}</p>
                <p><strong>Jumlah Perangkat:</strong> ${item.jumlahPerangkat}</p>
                <p><strong>Pemakaian Harian:</strong> ${item.pemakaianHarian} kWh</p>
                <p><strong>Pemakaian Bulanan:</strong> ${item.pemakaianBulanan} kWh</p>
                <p><strong>Biaya Bulanan:</strong> Rp ${item.biayaBulanan}</p>
            </label>
        `;
        riwayatElement.appendChild(card);
    });

    if (riwayatPerhitungan.length > 0) {
        document.getElementById('riwayat').classList.add('tampil');
    }
}

function editPerhitungan(index) {
    const item = riwayatPerhitungan[index];

    // Mengisi kembali form dengan nilai dari riwayat yang dipilih
    document.getElementById('namaDevice').value = item.namaDevice;
    document.getElementById('dayaWatt').value = item.dayaWatt;
    document.getElementById('durasiPemakaian').value = item.durasiPemakaian;
    document.getElementById('jumlahPerangkat').value = item.jumlahPerangkat;

    // Menghapus item dari riwayat
    hapusPerhitungan(index);

    // Fokus ke bagian kalkulator setelah edit
    document.getElementById('kalkulator').scrollIntoView({ behavior: 'smooth' });
}

function hapusPerhitungan(index) {
    riwayatPerhitungan.splice(index, 1);
    tampilkanRiwayatPerhitungan();
}

function updateTotal() {
    let totalPemakaianHarian = 0;
    let totalPemakaianBulanan = 0;
    let totalBiayaBulanan = 0;

    riwayatPerhitungan.forEach((item, index) => {
        const checkbox = document.getElementById(`checkbox${index}`);
        if (checkbox.checked) {
            totalPemakaianHarian += parseFloat(item.pemakaianHarian);
            totalPemakaianBulanan += parseFloat(item.pemakaianBulanan);
            totalBiayaBulanan += parseFloat(item.biayaBulanan);
        }
    });

    // Tampilkan hasil jumlahkan
    document.getElementById('pemakaianHarian').innerHTML = `Total Pemakaian Harian: ${totalPemakaianHarian.toFixed(2)} kWh`;
    document.getElementById('pemakaianBulanan').innerHTML = `Total Pemakaian Bulanan: ${totalPemakaianBulanan.toFixed(2)} kWh`;
    document.getElementById('biayaBulanan').innerHTML = `Total Biaya Bulanan: Rp ${totalBiayaBulanan.toFixed(0)}`;
}

document.addEventListener('DOMContentLoaded', () => {
    tampilkanRiwayatPerhitungan();
});