# Movie API (Midterm Project)

REST API sederhana untuk mengelola data film, dibuat dengan Node.js dan Express 5. Data disimpan di array (tanpa database).

- **Nama:** Nabila Rosa
- **NIM:** 20250040062
- **Tema:** Movies

## Cara menjalankan
1. `npm install`
2. `npm run dev`
3. Buka `http://localhost:3000`

## Autentikasi
Route `DELETE` membutuhkan header berikut. Tanpa header ini server mengembalikan `401 Unauthorized`.

```
x-token: secret123
```

## Daftar route
| No | Method | Path | Fungsi | Status sukses |
|---|---|---|---|---|
| 1 | GET | / | Pesan welcome (nama dan tema) | 200 |
| 2 | GET | /movies | Semua film | 200 |
| 3 | GET | /movies/:id | Satu film (404 jika tidak ada) | 200 |
| 4 | POST | /movies | Tambah film (400 jika field kosong) | 201 |
| 5 | PUT | /movies/:id | Update film (404 jika tidak ada) | 200 |
| 6 | DELETE | /movies/:id | Hapus film, butuh header `x-token: secret123` (401 jika tanpa) | 200 |
| 7 | GET | /movies/genre{/:name} | Filter berdasarkan genre, tanpa nilai tampil semua | 200 |
| 8 | GET | /files/*path | Tampilkan path sebagai array | 200 |
| 9 | GET | URL lain | Ditangani handler 404 | 404 |
| Bonus | GET | /movies/search?title= | Cari berdasarkan judul | 200 |

## Contoh body POST / PUT
```json
{
  "title": "Interstellar",
  "genre": "Sci-Fi",
  "year": 2014,
  "rating": 8.7
}
```

## Struktur folder
```
midterm-20250040062-nabilarosa/
├── index.js
├── middleware.js
├── routes/
│   └── movies.js
├── screenshots/
├── package.json
└── README.md
```