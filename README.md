# eClinic — Telemedicine Platform

> Platform telemedicine modern untuk konsultasi dokter, toko obat online, dan artikel kesehatan.

## 📋 Deskripsi Proyek

**eClinic** adalah aplikasi web telemedicine yang memungkinkan pengguna untuk:
- Berkonsultasi dengan dokter secara online
- Membeli obat dan produk kesehatan
- Membaca artikel kesehatan terpercaya
- Melakukan registrasi dan login akun

Proyek ini dikembangkan sebagai Final Project oleh tim **FE-11**.

---

## 🛠️ Tech Stack

| Teknologi | Versi | Kegunaan |
|-----------|-------|----------|
| [Vite](https://vitejs.dev/) | ^4.3 | Build tool & dev server |
| [React](https://react.dev/) | ^18.2 | UI framework |
| [React Router DOM](https://reactrouter.com/) | ^6.11 | Client-side routing |
| [Bootstrap](https://getbootstrap.com/) | ^5.2 | CSS grid & utilities |
| [React Bootstrap](https://react-bootstrap.github.io/) | ^2.7 | Bootstrap React components |
| [Framer Motion](https://www.framer.com/motion/) | ^10 | Animasi halaman |
| [React Icons](https://react-icons.github.io/react-icons/) | ^4.9 | Ikon komponen |
| [Axios](https://axios-http.com/) | ^1.4 | HTTP client |
| [Firebase](https://firebase.google.com/) | ^9.22 | Auth & database (configured) |
| [Socket.io-client](https://socket.io/) | ^4.6 | Chat real-time |

**Data API:** [MockAPI](https://mockapi.io/) digunakan untuk data dokter, produk, artikel, dan user.

---

## ✨ Fitur

### 🏥 Booking Dokter
- Daftar dokter dengan filter spesialis & harga
- Profil detail dokter (rating, jadwal, pendidikan)
- Pilih tipe konsultasi (Chat / Video)
- Pilih jadwal konsultasi
- Promo code diskon 40%

### 💊 Toko Obat
- Kategori obat berdasarkan jenis penyakit
- Pencarian produk
- Keranjang belanja dengan update kuantitas
- Checkout belanja langsung

### 📰 Artikel Kesehatan
- Daftar artikel kesehatan
- Halaman detail artikel

### 🔐 Autentikasi
- Register akun baru
- Login dengan username & password
- Logout dari header
- Proteksi rute untuk pemesanan dokter

---

## 🗂️ Struktur Folder

```
src/
├── assets/              # Gambar dan aset statis
│   ├── dokter/          # Foto dokter
│   └── penyakit/        # Ikon kategori penyakit
├── components/
│   ├── layout/          # Header wrapper, PageLayout
│   ├── ui/              # LoadingSpinner (komponen UI reusable)
│   ├── features/
│   │   ├── doctor/      # SpecialtyFilter (filter spesialis)
│   │   ├── store/       # (komponen toko)
│   │   └── article/     # (komponen artikel)
│   ├── Header.jsx       # Navigasi utama
│   ├── Footer.jsx       # Footer halaman
│   ├── dokter.jsx       # Daftar dokter + filter
│   ├── UserDetail.jsx   # Profil dokter & form booking
│   ├── Order-Dokter.jsx # Halaman pembayaran dokter
│   ├── cart.jsx         # Keranjang belanja
│   ├── artikel.jsx      # Preview artikel (homepage)
│   ├── artikelList.jsx  # Daftar semua artikel
│   ├── LoginPage.jsx    # Form login
│   ├── RegisterPage.jsx # Form registrasi
│   └── ...
├── context/
│   ├── AuthContext.jsx    # State autentikasi
│   ├── ProductContext.jsx # State keranjang & produk
│   ├── UserContext.jsx    # State data dokter & jadwal
│   └── OrderContext.jsx   # State data pemesanan
├── css/                 # File CSS per komponen
├── pages/               # Halaman-halaman utama
│   ├── home.jsx
│   ├── cariDokter.jsx
│   ├── Artikel.jsx
│   ├── toko.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   └── ProfilDokter.jsx
├── firebaseConfig/      # Konfigurasi Firebase
├── App.jsx              # Root komponen & routing
└── main.jsx             # Entry point
```

---

## 🚀 Cara Menjalankan Proyek

### Prasyarat
- Node.js >= 16
- npm >= 8

### Instalasi

```bash
# Clone repositori
git clone https://github.com/your-username/latihan-finalproject.git
cd latihan-finalproject

# Install dependensi frontend
npm install

# Install dependensi server (opsional, untuk fitur chat)
cd server
npm install
cd ..
```

### Menjalankan Development Server

```bash
npm run dev
```

Buka [http://localhost:5173](http://localhost:5173) di browser.

### Build Production

```bash
npm run build
```

---

## 🔐 Environment Variables

Untuk production, buat file `.env` di root proyek:

```env
# Firebase (isi dari Firebase Console)
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

> **⚠️ Catatan:** File `.env` TIDAK boleh di-commit ke repositori. Sudah ditambahkan di `.gitignore`.

---

## 🌐 Deployment

Proyek ini dikonfigurasi untuk deployment di **Netlify** menggunakan `netlify.toml`.

Konfigurasi sudah menyertakan redirect rule untuk React Router SPA (`/*` → `/index.html`).

---

## 👥 Anggota Tim FE-11

| Nama | GitHub |
|------|--------|
| Agus Kurniawan | — |
| Aryo Romadhon Vardhana | — |
| Hidayatul Nur Hanifah | — |
| Dzulfi Allaudin Hafidz | — |

---

## 📄 Lisensi

MIT License — silakan gunakan dan modifikasi sesuai kebutuhan.
