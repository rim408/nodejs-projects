/* 
import module inquirer untuk prompt interaktif
import qr-image untuk mengenerate gambar qr
import file system untuk membaca file
*/
import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";

// Menanyakan URL kepada pengguna menggunakan prompt interaktif
inquirer
  .prompt([
    {
        message: "Type your URL: ", // pesan yang akan ditampilkan kepada user
        name: "URL", // nama properti untuk menyimpan jawaban user
    },
  ])
  .then((answers) => {
    // Menangani jawaban pengguna setelah prompt selesai
    const url = answers.URL; // mendapatkan URL dari jawaban pengguna
    const qr_svg = qr.image(url); // membuat gambar qr code dari url
    qr_svg.pipe(fs.createWriteStream("qr-image.png")); // menulis qr code ke file qr-image.png

    //membaca file URL.txt
    fs.readFileSync("URL.txt", url, (err) => {
        //menangani jika terdapat error
        if(err) throw err;
        console.log("The file has been saved!"); //menampilkan tulisan di console jika proses berhasil
    });
  })
  .catch((error) => {
    if (error.isTtyError) {
      
    } else {
      
    }
  });

