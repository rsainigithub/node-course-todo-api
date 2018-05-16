const {SHA256}  = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = '123abc!';

// bcrypt.genSalt(10, (err, salt)=>{
//     bcrypt.hash(password, salt, (err, hash)=>{
//         console.log(hash);
//     })
// });

// var hashedPwd = '$2a$10$Wn9kg4ip7JXeObq6F.4K3epRfp8p2t4054dM7QeFBs96Cza1jAfaW';

// bcrypt.compare(password, hashedPwd, (err, res)=>{
//     console.log(res);
// });

var data = {
    id: 10
}

var token = jwt.sign(data, '123abc');
console.log(token);

console.log('**************');
var token1 = jwt.sign(data, '123abc');
console.log(token1);

console.log('**************');
var decoded = jwt.verify(token, '123abc');
console.log('decoded', decoded);

// var message = 'I am user number 1';
// var hash = SHA256(message).toString();

// console.log(`Message: ${message}`);
// console.log(`Hashing: ${hash}`);

// var data = {
//     id: 4
// };

// var token = {
//     data: data,
//     hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// }

// var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();

// if (resultHash === token.hash) {
//     console.log('Data was not changed');
// } else {
//     console.log('Data was changed. Do not trust');   
// }

