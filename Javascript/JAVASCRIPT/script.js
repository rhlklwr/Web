const fs = require('fs');

fs.readFile('./temp.txt', (err, data) => {
    if(err){
        console.log(err);
    }else{
    console.log('Aync', data.toString('utf-8'));
}
})

const file = fs.readFileSync('./temp.txt');
console.log('Sync', file.toString())

// fs.appendFile('./temp.txt', ' This is append!', err =>{
//     if(err){
//         console.log(err)
//     }
// })

// fs.writeFile('./temp1.txt', 'Now I am writing!', err=>{
//     if(err){
//         console.log(err);
//     }
// })

// fs.unlink('./temp1.txt', err=>{
//     if(err){
//         console.log(err);
//     }
// })