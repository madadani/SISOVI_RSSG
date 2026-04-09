# SISOV-RSSG
**Sistem Informasi Skrining Online Vaksinasi Rumah Sakit Soeratno Gemolong**

Aplikasi web berbasis React dan Node.js yang ditujukan untuk melayani pendaftaran dan skrining online vaksinasi sesuai standar RSSG. 

## Struktur Folder

- `/frontend`: React 18, Vite, Tailwind CSS (Mobile-first responsive design)
- `/backend`: Node.js, Express, Prisma ORM, PostgreSQL

## Instalasi dan Menjalankan Proyek

**Persyaratan Sistem:**
- Node.js v18+
- PostgreSQL
- Npm atau Yarn

### 1. Database & Backend
1. Masuk ke direktori `backend/`
2. Jalankan `npm install`
3. Salin/buat file `.env` dari konfigurasi default:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/sisov_rssg?schema=public"
   PORT=5000
   JWT_SECRET="secret_key_rssg"
   ```
4. Jalankan `npx prisma migrate dev --name init` untuk menyiapkan skema database
5. Jalankan `npm run prisma:seed` (atau script npm yg setara: `npx ts-node prisma/seed.ts`) untuk seed demo user & data (Admin: admin@rssg.co.id / admin123)
6. Jalankan server backend: `npm run dev`

### 2. Frontend
1. Masuk ke direktori `frontend/`
2. Jalankan `npm install`
3. Konfigurasi `src/index.css` atau warna di `tailwind.config.js` sudah siap.
4. Jalankan `npm run dev` untuk server dev di `http://localhost:5173`.

## API Documentation
| Endpoint | Method | Keterangan |
|----------|--------|------------|
| `/api/locations` | GET | List seluruh poli / lokasi aktif |
| `/api/vaccines` | GET | List vaksin yang tersedia |
| `/api/questions`| GET | Pertanyaan skrining yang aktif |
| `/api/register` | POST | Pendaftaran pasien dan skrining |

## Konvensi dan Catatan
- Theme color scheme berpusat di `tailwind.config.js` (`primary`, `secondary`, dll) yang diambil dari palet RSSG.
- Pastikan Port 5000 dan 5173 terbuka.
- Fitur generate Sertifikat dapat dikembangkan lebih lanjut di handler Backend yang belum dilampirkan spesifik (misal di endpoint `/api/certificates`).
