Berikut adalah README yang mendetail untuk membantu pemula memahami dan menggunakan bot Discord ini. Saya juga menambahkan langkah-langkah sederhana agar mudah diikuti.

---

# GeminiAI Discord Bot

**GeminiAI** adalah bot Discord yang menggunakan **Google Gemini API** untuk menjawab pertanyaan pengguna dan merespon saat ditandai. Bot ini juga memiliki perintah `/ask` untuk bertanya langsung ke bot. Bot dapat beroperasi secara otomatis di channel tertentu dan merespons mention atau reply di server Discord.

## Fitur Utama:
- **Respon Otomatis**: Merespon pesan secara otomatis di channel tertentu.
- **Respon Mention**: Merespon ketika pengguna mention bot atau reply pesan bot.
- **Slash Command `/ask`**: Tanya bot menggunakan perintah `/ask` di server Discord.
- **Ditenagai Google Gemini API**: Bot memberikan jawaban berdasarkan model Gemini AI.

---

## Persyaratan

Sebelum memulai, pastikan Anda memiliki:
1. **Node.js** v16.x atau lebih baru.
2. **NPM** (biasanya sudah termasuk dengan Node.js).
3. **Akun Google Cloud** dengan akses ke **Google Gemini API**.
4. **Bot Token** dari **Discord Developer Portal**.

---

## Instalasi

Ikuti langkah-langkah di bawah ini untuk menginstal dan menjalankan bot:

### 1. Clone Repositori

```bash
git clone https://github.com/username/GeminiAI.git
cd GeminiAI
```

### 2. Instal Dependensi

```bash
npm install
```

Dependensi yang digunakan:
- `discord.js`: Library utama untuk berinteraksi dengan API Discord.
- `@google/generative-ai`: Digunakan untuk memanggil Google Gemini API.

### 3. Buat dan Siapkan `.env` File

Buat file `.env` di direktori utama project Anda, lalu tambahkan variabel berikut:

```env
DISCORD_TOKEN=YOUR_DISCORD_BOT_TOKEN
GOOGLE_API_KEY=YOUR_GOOGLE_API_KEY
```

- **DISCORD_TOKEN**: Token bot Discord Anda, didapatkan dari [Discord Developer Portal](https://discord.com/developers/applications).
- **GOOGLE_API_KEY**: Kunci API Google untuk mengakses Gemini AI, didapatkan dari [Google Cloud Console](https://console.cloud.google.com/).

### 4. Konfigurasi Channel

Di file `index.js`, sesuaikan channel ID yang diizinkan untuk respons otomatis. Anda dapat menambahkan ID channel Discord yang diizinkan di bagian konfigurasi.

```javascript
const config = {
  channels: {
    allowed: ['CHANNEL_ID1', 'CHANNEL_ID2'],  // Ganti dengan channel ID yang diizinkan
  }
};
```

- **CHANNEL_ID1, CHANNEL_ID2**: Ganti dengan ID channel di mana bot dapat merespons secara otomatis tanpa mention.

---

## Cara Menjalankan Bot

Untuk menjalankan bot di server Discord Anda:

### 1. Jalankan Bot

```bash
node index.js
```

Setelah bot berjalan, Anda akan melihat pesan seperti ini di terminal:
```bash
✅ | Login Sebagai GeminiAI#1234
Memulai proses load (dan refresh) slash commands...
Slash commands berhasil di-load!
```

Bot akan secara otomatis memuat slash command `/ask` dan siap digunakan.

---

## Cara Menggunakan

### 1. Slash Command `/ask`

Di server Discord Anda, gunakan perintah `/ask` untuk bertanya kepada bot:

```
/ask question: [pertanyaan kamu]
```

Bot akan merespons dengan jawaban dari Google Gemini API.

### 2. Mention Bot atau Reply di Channel

Jika Anda mention bot atau reply ke pesan bot di channel yang diizinkan, bot akan otomatis membalas dengan jawaban dari Google Gemini API.

---

## Debugging dan Troubleshooting

Jika bot tidak berjalan dengan benar, berikut beberapa langkah troubleshooting:

1. **Pastikan Token dan API Key Benar**:
   - Cek apakah **DISCORD_TOKEN** dan **GOOGLE_API_KEY** di `.env` sudah benar.

2. **Periksa Error di Terminal**:
   - Jika ada pesan error di terminal, ikuti instruksi atau pesan error untuk mengetahui penyebab masalah.

3. **Cek Izin Bot di Server**:
   - Pastikan bot memiliki izin yang cukup di server Discord, terutama izin untuk membaca pesan dan mengirim pesan.

---

## Sumber dan Referensi

- [Discord.js Documentation](https://discord.js.org/#/)
- [Google Gemini API Documentation](https://ai.google.dev/gemini-api/docs/)

---
Dengan mengikuti langkah-langkah ini, Anda akan dapat mengatur bot GeminiAI dan menjalankannya di server Discord Anda dengan cepat dan mudah!
---

Semoga bot ini membantu Anda di server Discord! 🎉