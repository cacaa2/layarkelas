function showTime() {
	document.getElementById('currentTime').innerHTML = new Date().toUTCString();
}
showTime();
setInterval(function () {
	showTime();
}, 1000); 
// ===== SE 1: perhitungan dasar =====
function formatRupiah(angka) {
  return "Rp" + angka.toLocaleString("id-ID");
}

function hitungBiaya() {
  var harga = parseInt(document.getElementById("paket").value);
  var jumlah = parseInt(document.getElementById("jumlah").value);
  var kode = document.getElementById("promo").value.trim().toUpperCase();
  var hasil = document.getElementById("hasil");

  if (isNaN(jumlah) || jumlah < 1) {
    hasil.innerHTML = '<p class="error">Masukkan jumlah bulan minimal 1.</p>';
    return;
  }

  var hargaAwal = harga * jumlah;

  // ===== SE 2: logika diskon (if / else) =====
  var diskon = 0;
  var keterangan = "Tidak ada diskon";

  if (kode === "BISDIG") {
    diskon = hargaAwal * 0.10;
    keterangan = "Diskon kode BISDIG (10%)";
  } else if (jumlah >= 3) {
    diskon = hargaAwal * 0.10;
    keterangan = "Diskon akses 3 bulan atau lebih (10%)";
  } else if (kode !== "") {
    keterangan = "Kode promo tidak berlaku";
  }

  var total = hargaAwal - diskon;

  hasil.innerHTML =
    '<div class="rincian">' +
      '<div class="baris"><span>Harga awal</span><span>' + formatRupiah(hargaAwal) + '</span></div>' +
      '<div class="baris"><span>' + keterangan + '</span><span>- ' + formatRupiah(diskon) + '</span></div>' +
      '<div class="baris total"><span>Total bayar</span><span>' + formatRupiah(total) + '</span></div>' +
    '</div>';
}

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("btn-hitung").addEventListener("click", hitungBiaya);
});
