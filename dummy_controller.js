// let request = require('request');
// async function    download(url, dest) {
//     const file = fs.createWriteStream(dest);
//     await new Promise((resolve, reject) => {
//       request({uri: url, gzip: true,}).pipe(file).on('finish', async () => {
//         console.log(`The file is finished downloading.`);
//         resolve();
//     })
//     .on('error', (error) => {
//         reject(error);
//     });
// })
//     .catch((error) => {
//         console.log(`Something happened: ${error}`);
//     });
// }


// (async (records)=>{
//     console.log("aijajkhan", records)
//     records.forEach(element => {
//         download(element.Image_URL, 'images', {filename:  element.ID + ".jpg"});
//     });
//     console.log('done')
// })(records); 




// // csv file read
// const csvreadfile=()=>{
//     var parser = parse({columns: true}, function (err, records) {
//         // console.log(records);

//     });
//     fs.createReadStream('./uploads/images.csv').pipe(parser);
// }

// // csvreadfile()


