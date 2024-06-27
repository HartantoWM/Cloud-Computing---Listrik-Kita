function hitungPemakaian() {
    const namaDevice = document.getElementById('namaDevice').value;
    const dayaWatt = parseFloat(document.getElementById('dayaWatt').value);
    const durasiPemakaian = parseFloat(document.getElementById('durasiPemakaian').value);
    const jumlahPerangkat = parseFloat(document.getElementById('jumlahPerangkat').value);

    const pemakaianHarian = (dayaWatt * durasiPemakaian * jumlahPerangkat) / 1000;
    const pemakaianBulanan = pemakaianHarian * 30;

    // Asumsikan tarif listrik Rp 1.500 per kWh
    const biayaBulanan = pemakaianBulanan * 1500;

    document.getElementById('pemakaianHarian').innerHTML = `Pemakaian Harian: ${pemakaianHarian.toFixed(2)} kWh`;
    document.getElementById('pemakaianBulanan').innerHTML = `Pemakaian Bulanan: ${pemakaianBulanan.toFixed(2)} kWh`;
    document.getElementById('biayaBulanan').innerHTML = `Biaya Bulanan: Rp ${biayaBulanan.toFixed(2)}`;
}
