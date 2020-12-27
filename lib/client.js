const tls = require('tls');
const fs = require('fs');
const path = require('path');

module.exports.client = (options) => (argv) => {
  const CERT_PATH = path.resolve(__dirname, '..', 'cert');
  
  const options = {
    ca: [ fs.readFileSync(path.resolve(CERT_PATH, 'ca.crt')) ],
    
    cert: fs.readFileSync(path.resolve(CERT_PATH, 'client.crt')),
    
    key: fs.readFileSync(path.resolve(CERT_PATH, 'client.key')),

    host: argv.host,

    port: argv.port
  };

  const socket = tls.connect(options, () => {
    process.stdin.pipe(socket);
    process.stdin.resume();
  });

  socket.setEncoding('utf-8');
  socket.on('data', (data) => {
    console.log(data.toString());
  });
  
  
  socket.on('end', () => {
    console.log('server ends connection');
  });
}