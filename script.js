const screenTitles = {
  'screen-home': 'Beranda',
  'screen-biodata': 'Biodata Guru BK',
  'screen-jadwal': 'Jadwal Konsultasi BK',
  'screen-konsul-pilih': 'Konsultasi',
  'screen-konsul-anon': 'Konsultasi Anonim',
  'screen-konsul-langsung': 'Konsultasi Langsung',
  'screen-helpdesk': 'Help & CP'
};

const navMap = {
  'screen-home': 'nav-home',
  'screen-biodata': 'nav-biodata',
  'screen-jadwal': 'nav-jadwal',
  'screen-konsul-pilih': 'nav-konsul',
  'screen-konsul-anon': 'nav-konsul',
  'screen-konsul-langsung': 'nav-konsul',
  'screen-helpdesk': 'nav-helpdesk'
};

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const targetScreen = document.getElementById(id);
  if (targetScreen) targetScreen.classList.add('active');
  
  const topBarTitle = document.getElementById('topbar-title');
  if (topBarTitle) topBarTitle.textContent = screenTitles[id] || '';
  
  document.querySelectorAll('.sidebar-nav .nav-item').forEach(el => el.classList.remove('active'));
  const navId = navMap[id];
  if (navId) {
    const activeNav = document.getElementById(navId);
    if (activeNav) activeNav.classList.add('active');
  }
  
  // Set tab active on mobile view
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  if (id === 'screen-home') {
    const activeTab = document.querySelector('.tab-btn');
    if (activeTab) activeTab.classList.add('active');
  }
}

function toggleChip(el) {
  el.parentElement.querySelectorAll('.masalah-chip').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
}

function kirimLangsungUnified() {
  const nama = document.getElementById('langsung-nama').value.trim();
  const kelas = document.getElementById('langsung-kelas').value;
  const noGuru = document.getElementById('langsung-guru').value;
  const selectedChip = document.querySelector('#masalah-langsung-container .selected');
  const kategori = selectedChip ? selectedChip.innerText : '-';
  
  if (!nama) { alert('Harap isi Nama Lengkap terlebih dahulu!'); return; }
  
  const teks = 'Halo Bapak/Ibu Guru BK, saya ingin berkonsultasi via SIBISA.\n\n*Identitas Siswa*:\n- Nama: ' + nama + '\n- Kelas: ' + kelas + '\n- Kategori Masalah: ' + kategori + '\n\nMohon arahan dan kesediaan waktunya, terima kasih.';
  window.open('https://wa.me/62' + noGuru.substring(1) + '?text=' + encodeURIComponent(teks), '_blank');
}

function kirimAnonimUnified() {
  const noGuru = document.getElementById('anon-guru-select').value;
  const selectedChip = document.querySelector('#masalah-anon-container .selected');
  const kategori = selectedChip ? selectedChip.innerText : '-';
  const keluhan = document.getElementById('anon-pesan-text').value.trim();
  const kode = '#SIBISA-' + Math.floor(1000 + Math.random() * 9000);
  
  let teks = '[KONSULTASI ANONIM SIBISA]\nKode Sesi: *' + kode + '*\nKategori Masalah: *' + kategori + '*';
  if (keluhan) teks += '\n\n*Keluhan Awal*:\n"' + keluhan + '"';
  teks += '\n\n_(Catatan: Pesan ini dikirim otomatis tanpa identitas siswa demi kenyamanan privasi)._';
  window.open('https://wa.me/62' + noGuru.substring(1) + '?text=' + encodeURIComponent(teks), '_blank');
}

function kontakLangsungDariProfil(no, nama) {
  const teks = 'Halo ' + nama + ', saya ingin berkonsultasi mengenai layanan bimbingan konseling di sekolah melalui SIBISA.';
  window.open('https://wa.me/62' + no.substring(1) + '?text=' + encodeURIComponent(teks), '_blank');
}