# FE Favers Profile

Frontend repository untuk proyek Favers Profile, dibangun menggunakan **React Router v7 (Remix)**, **Tailwind CSS v4**, dan dikelola sepenuhnya menggunakan **Bun**. Aplikasi ini dirancang agar ringan, _type-safe_, dan siap di-deploy ke Vercel.

## 🚀 Tech Stack

- **Framework**: React Router v7 (sebelumnya Remix)
- **Styling**: Tailwind CSS v4
- **Language**: TypeScript
- **Package Manager**: Bun
- **Deployment Target**: Vercel

---

## 🛠️ Tutorial Setup & Instalasi

Ikuti langkah-langkah di bawah ini untuk menjalankan proyek ini di _local machine_ Anda.

### 1. Prasyarat (Prerequisites)

Pastikan Anda sudah menginstal **Bun**. Jika belum, instal dengan menjalankan perintah berikut di terminal:

```bash
# Untuk Linux, macOS, WSL
curl -fsSL https://bun.sh/install | bash
```

_(Untuk Windows, pastikan Anda menggunakan WSL)._

### 2. Instalasi Dependensi

Masuk ke direktori frontend dan instal seluruh _package_ yang dibutuhkan:

```bash
cd fe-favers-profile
bun install
```

### 3. Menjalankan Server Development

Setelah dependensi terinstal, jalankan _dev server_ dengan fitur _Hot Module Replacement_ (HMR):

```bash
bun run dev
```

Aplikasi akan langsung dapat diakses melalui browser di: `http://localhost:5173`

### 4. Konfigurasi Backend & Autentikasi (Penting)

Proyek ini menggunakan **Better Auth** dengan **Google OAuth** dan **PostgreSQL**. Setiap developer wajib menyiapkan file `.env` lokal:

1. **Salin Template Environment:**
   ```bash
   cp .env.example .env
   ```

2. **Isi Variabel Wajib di `.env`:**
   - `DATABASE_URL`: Connection string PostgreSQL (bisa gunakan [Neon.tech](https://neon.tech)).
   - `BETTER_AUTH_SECRET`: Generate menggunakan perintah `npx better-auth secret`.
   - `BETTER_AUTH_URL`: Set ke `http://localhost:5173`.
   - `GOOGLE_CLIENT_ID` & `GOOGLE_CLIENT_SECRET`: Dapatkan dari [Google Cloud Console](https://console.cloud.google.com/).
     - *Authorized Redirect URI:* `http://localhost:5173/api/auth/callback/google`

3. **Jalankan Migrasi Database:**
   Setelah `.env` terkonfigurasi, sinkronkan struktur tabel database:
   ```bash
   npx @better-auth/cli migrate
   ```

---

## 💻 Panduan Pengembangan (Development)

### Pengecekan Tipe Data (Typecheck)

Sangat disarankan untuk selalu mengecek tipe TypeScript sebelum melakukan _commit_ untuk menghindari _error_ tak terduga.

```bash
bun run typecheck
```

### Membangun untuk Production (Build)

Jika Anda ingin mengetes proses _build_ di lokal sebelum di-deploy:

```bash
bun run build
```

Hasil _build_ akan masuk ke dalam folder `build/`.

### Struktur Folder Utama

Arsitektur proyek ini menggunakan pendekatan _Modular_ agar _scalable_ dan mudah dikelola:

```text
fe-favers-profile/
├── app/
│   ├── routes/
│   │   └── Home/       # Pengaturan URL Routing, Loader, dan Action
│   └── root.tsx        # Entry point utama aplikasi
├── src/
│   └── modules/
│       └── HomeModule/ # Komponen UI, logic statis, dan struktur tampilan utama
└── public/             # Asset statis seperti gambar atau favicon
```


Built with ❤️ for Favers Profile.
