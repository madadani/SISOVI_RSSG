# SISOV-RSSG

**Sistem Informasi Skrining Online Vaksinasi Rumah Sakit Soeratno Gemolong**

Aplikasi web berbasis React dan Node.js yang ditujukan untuk melayani pendaftaran dan skrining online vaksinasi sesuai standar RSSG.

## Struktur Folder

- `/frontend`: React 18, Vite, Tailwind CSS (Mobile-first responsive design)
- `/backend`: Node.js, Express, Prisma ORM, MySQL

## Jalankan dengan Docker (Rekomendasi)

Konfigurasi Docker project ini sudah disiapkan untuk:

- Base image aplikasi: AlmaLinux 9
- Backend: `http://localhost:8002`
- Frontend: `http://localhost:3014`
- Database: MySQL eksternal (di luar `docker-compose`)

### 1. Build dan Jalankan Semua Service

```bash
docker compose up --build -d
```

### 2. Cek Log

```bash
docker compose logs -f
```

### 3. Hentikan Service

```bash
docker compose down
```

## Konfigurasi Environment

Service backend menggunakan environment berikut di `docker-compose.yaml`:

```env
DATABASE_URL="mysql://user:password@host-database:3306/sisovi_rssg"
PORT=8002
JWT_SECRET="secret_key_rssg"
```

`DATABASE_URL` diambil dari environment host saat menjalankan `docker compose`.
Contoh cepat:

```bash
DATABASE_URL="mysql://user:password@host-database:3306/sisovi_rssg" docker compose up --build -d
```

Saat container backend start, Prisma akan menjalankan `prisma db push` otomatis.

## Jalankan Tanpa Docker (Opsional)

**Persyaratan Sistem:**

- Node.js v18+
- MySQL
- Npm atau Yarn

### 1. Database & Backend

1. Masuk ke direktori `backend/`
2. Jalankan `npm install`
3. Salin/buat file `.env` dari konfigurasi default:
   ```env
   DATABASE_URL="mysql://user:password@localhost:3306/sisov_rssg"
   PORT=8002
   JWT_SECRET="secret_key_rssg"
   ```
4. Jalankan `npm run prisma:generate`
5. Jalankan `npm run prisma:push` untuk menyiapkan skema database
6. (Opsional) Jalankan `npm run seed` untuk seed demo user & data
7. Jalankan server backend: `npm run dev`

### 2. Frontend

1. Masuk ke direktori `frontend/`
2. Jalankan `npm install`
3. Jalankan `npm run dev` untuk server dev di `http://localhost:5173`.

## API Documentation

| Endpoint         | Method | Keterangan                       |
| ---------------- | ------ | -------------------------------- |
| `/api/locations` | GET    | List seluruh poli / lokasi aktif |
| `/api/vaccines`  | GET    | List vaksin yang tersedia        |
| `/api/questions` | GET    | Pertanyaan skrining yang aktif   |
| `/api/register`  | POST   | Pendaftaran pasien dan skrining  |

## Konvensi dan Catatan

- Theme color scheme berpusat di `tailwind.config.js` (`primary`, `secondary`, dll) yang diambil dari palet RSSG.
- Pastikan Port 8002 dan 3014 terbuka saat menjalankan via Docker.
- Fitur generate Sertifikat dapat dikembangkan lebih lanjut di handler Backend yang belum dilampirkan spesifik (misal di endpoint `/api/certificates`).
