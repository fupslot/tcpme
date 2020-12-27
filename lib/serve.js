const tls = require('tls');
const fs = require('fs');
const path = require('path');

module.exports.serve = (options) => (argv) => {
  const CERT_PATH = path.resolve(__dirname, '..', 'cert');
  
  const options = {
    ca: [ fs.readFileSync(path.resolve(CERT_PATH, 'ca.crt')) ],
    cert: fs.readFileSync(path.resolve(CERT_PATH, 'server.crt')),
    key: fs.readFileSync(path.resolve(CERT_PATH, 'server.key')),
    requestCert: true
  };

  const server = tls.createServer(options, (socket) => {
    socket.on('data', (data) => {
      console.log(data.toString());
    });
  });

  console.log(argv.port, argv.host)

  server.listen(argv.port, 'localhost', () => {
    console.log(`Listening on port ${argv.port}`);
  });
};