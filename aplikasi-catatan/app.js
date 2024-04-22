const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const catatanFile = 'catatan.txt';

function tampilkanMenu() {
    console.log('\nMenu:');
    console.log('1. Tampilkan Catatan');
    console.log('2. Tambah Catatan');
    console.log('3. Hapus Catatan');
    console.log('4. Keluar\n');
}

function tampilkanCatatan() {
    fs.readFile(catatanFile, 'utf8', (err, data) => {
        if (err || data === undefined) {
            console.log('Belum ada catatan.');
        } else {
            console.log('Catatan:');
            console.log(data);
        }
        tampilkanMenu();
    });
}

function tambahCatatan() {
    rl.question('Masukkan catatan baru: ', (catatan) => {
        fs.appendFile(catatanFile, catatan + '\n', (err) => {
            if (err) throw err;
            console.log('Catatan berhasil ditambahkan.');
            tampilkanMenu();
        });
    });
}

function hapusCatatan() {
    rl.question('Masukkan nomor catatan yang ingin dihapus: ', (nomor) => {
        fs.readFile(catatanFile, 'utf8', (err, data) => {
            if (err) {
                console.log('Belum ada catatan.');
                tampilkanMenu();
            } else {
                const catatanArray = data.split('\n');
                if (nomor >= 1 && nomor <= catatanArray.length) {
                    catatanArray.splice(nomor - 1, 1);
                    const catatanBaru = catatanArray.join('\n');
                    fs.writeFile(catatanFile, catatanBaru, (err) => {
                        if (err) throw err;
                        console.log('Catatan berhasil dihapus.');
                        tampilkanMenu();
                    });
                } else {
                    console.log('Nomor catatan tidak valid.');
                    tampilkanMenu();
                }
            }
        });
    });
}

function main() {
    console.log('Selamat datang di Aplikasi Catatan!\n');
    tampilkanMenu();

    rl.on('line', (input) => {
        switch (input) {
            case '1':
                tampilkanCatatan();
                break;
            case '2':
                tambahCatatan();
                break;
            case '3':
                hapusCatatan();
                break;
            case '4':
                console.log('Terima kasih!');
                rl.close();
                break;
            default:
                console.log('Pilihan tidak valid, silakan coba lagi.');
                tampilkanMenu();
                break;
        }
    });
}

main();
