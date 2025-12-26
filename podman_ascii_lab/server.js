// server.js
const http = require('http');
const fs = require('fs');

const PORT = process.env.APP_PORT || 3000;
const MSG = process.env.WELCOME_MSG || "Hello World";

const server = http.createServer((req, res) => {
  // Simulating checking for a 'certificate' file created in the build stage
  let certStatus = "Not Found";
  if (fs.existsSync('./certs/dummy.crt')) {
    certStatus = "Loaded (Secure-ish)";
  }

  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end(`
    ========================================
    |  ${MSG}  |
    ========================================
    Status: Running
    Port: ${PORT}
    Certificates: ${certStatus}
    User ID: ${process.getuid()}
  `);
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});